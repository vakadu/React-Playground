"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";

/** SSR-safe window size hook with rAF-throttled resize */
function useWindowSize() {
  const get = () => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1024,
    h: typeof window !== "undefined" ? window.innerHeight : 768,
  });
  const [{ w, h }, set] = useState(get);

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => set(get()));
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return [w, h];
}

export default function Comp({
  path,
  totalFrames = 20800,
  fps = 60,
  padLength = 4, // adjust if your filenames have different padding
}) {
  const [frameIndex, setFrameIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const listRef = useRef(null);
  const [width, height] = useWindowSize();

  // --- derived + helpers
  const padded = String(frameIndex).padStart(padLength, "0");
  const src = `${path}/frame_${padded}.jpg`;

  const thumbSize = useMemo(() => {
    if (width < 420) return 64;
    if (width < 768) return 76;
    return 92;
  }, [width]);

  const stripHeight = 78;

  const scrollToFrame = useCallback((index, align = "auto") => {
    listRef.current?.scrollToItem(Math.max(0, index - 1), align);
  }, []);

  // --- rAF playback loop
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const accRef = useRef(0);
  const frameDuration = 1000 / fps;

  const advanceOne = useCallback(() => {
    setFrameIndex((prev) => {
      const next = prev >= totalFrames ? 1 : prev + 1;
      scrollToFrame(next);
      return next;
    });
  }, [scrollToFrame, totalFrames]);

  const loop = useCallback(
    (t) => {
      if (!isPlaying) return;
      if (!lastTimeRef.current) lastTimeRef.current = t;
      const delta = t - lastTimeRef.current;
      lastTimeRef.current = t;
      accRef.current += delta;

      while (accRef.current >= frameDuration) {
        advanceOne();
        accRef.current -= frameDuration;
      }
      rafRef.current = requestAnimationFrame(loop);
    },
    [isPlaying, advanceOne, frameDuration]
  );

  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(loop);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      };
    }
    lastTimeRef.current = 0;
    accRef.current = 0;
  }, [isPlaying, loop]);

  // Pause when tab is hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setIsPlaying(false);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // keyboard controls (desktop)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
      if (e.key === "ArrowRight") {
        setIsPlaying(false);
        setFrameIndex((p) => {
          const next = Math.min(p + 1, totalFrames);
          scrollToFrame(next, "center");
          return next;
        });
      }
      if (e.key === "ArrowLeft") {
        setIsPlaying(false);
        setFrameIndex((p) => {
          const prev = Math.max(p - 1, 1);
          scrollToFrame(prev, "center");
          return prev;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollToFrame, totalFrames]);

  // touch drag to scrub on the main viewer (mobile)
  const dragRef = useRef({ active: false, startX: 0, startFrame: 1 });
  const pxPerFrame = 4;

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { active: true, startX: e.clientX, startFrame: frameIndex };
    setIsPlaying(false);
  };
  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const deltaFrames = Math.round(dx / pxPerFrame);
    const next = Math.min(
      totalFrames,
      Math.max(1, dragRef.current.startFrame + deltaFrames)
    );
    if (next !== frameIndex) {
      setFrameIndex(next);
      scrollToFrame(next);
    }
  };
  const onPointerUp = (e) => {
    dragRef.current.active = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleSeek = (index) => {
    setIsPlaying(false);
    setFrameIndex(index);
    scrollToFrame(index, "center");
  };

  // small look-ahead prefetch to reduce flicker
  const prefetchNext = useMemo(() => {
    const out = [];
    for (let i = 1; i <= 3; i++) {
      const n = frameIndex + i > totalFrames ? frameIndex + i - totalFrames : frameIndex + i;
      out.push(`${path}/frame_${String(n).padStart(padLength, "0")}.jpg`);
    }
    return out;
  }, [frameIndex, totalFrames, path, padLength]);

  // react-window item renderer
  const Thumbnail = useCallback(
    ({ index, style }) => {
      const frameNum = index + 1;
      const frameName = String(frameNum).padStart(padLength, "0");
      const isActive = frameNum === frameIndex;

      return (
        <div
          style={{
            ...style,
            width: thumbSize,
            height: stripHeight - 8,
            padding: 2,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 2,
              border: isActive ? "2px solid #32CD32" : "1px solid #333",
              borderRadius: 6,
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => handleSeek(frameNum)}
          >
            <Image
              src={`${path}/frame_${frameName}.jpg`}
              alt={`frame_${frameName}`}
              fill
              sizes={`${thumbSize}px`}
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      );
    },
    [frameIndex, padLength, path, thumbSize]
  );

  return (
    <div
      style={{
        background: "black",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Frame View */}
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          touchAction: "pan-y",
          userSelect: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={() => setIsPlaying((p) => !p)}
        onClick={() => {
          if (!dragRef.current.active) setIsPlaying((p) => !p);
        }}
      >
        <Image
          src={src}
          alt={`Frame ${padded}`}
          fill
          sizes="100vw"
          priority
          onError={() => console.warn("Missing:", src)}
          style={{
            objectFit: "contain",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
        {/* prefetchers (hidden) */}
        <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          {prefetchNext.map((p) => (
            <Image key={p} src={p} alt="" width={1} height={1} priority={false} />
          ))}
        </div>

        {/* Controls overlay */}
        <div
          style={{
            position: "absolute",
            bottom: stripHeight + 12,
            left: 12,
            right: 12,
            display: "flex",
            gap: 10,
            justifyContent: "center",
            pointerEvents: "auto",
          }}
        >
          <button
            onClick={() => setIsPlaying((p) => !p)}
            style={btnStyle}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              handleSeek(Math.max(1, frameIndex - 1));
            }}
            style={btnStyle}
            aria-label="Prev frame"
          >
            ◀︎
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              handleSeek(Math.min(totalFrames, frameIndex + 1));
            }}
            style={btnStyle}
            aria-label="Next frame"
          >
            ▶︎
          </button>
          <span
            style={{
              color: "#bbb",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 12,
              alignSelf: "center",
            }}
          >
            {String(frameIndex).padStart(padLength, "0")} / {totalFrames}
          </span>
        </div>
      </div>

      {/* Virtualized Thumbnails */}
      <div
        style={{
          background: "#111",
          borderTop: "2px solid #333",
          position: "relative",
          height: stripHeight,
        }}
      >
        <List
          ref={listRef}
          height={stripHeight}
          itemCount={totalFrames}
          itemSize={thumbSize}
          width={width}
          layout="horizontal"
          overscanCount={12}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {Thumbnail}
        </List>
      </div>
    </div>
  );
}

const btnStyle = {
  background: "#222",
  color: "#fff",
  border: "1px solid #444",
  padding: "8px 12px",
  borderRadius: 10,
  fontSize: 14,
  lineHeight: 1,
};
