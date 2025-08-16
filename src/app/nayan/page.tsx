"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";

function useWindowSize() {
	const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
	useEffect(() => {
		const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return size;
}

export default function Nayan() {
	const totalFrames = 20800; // update this
	const fps = 60;

	const [frameIndex, setFrameIndex] = useState(1);
	const [isPlaying, setIsPlaying] = useState(true);
	const listRef = useRef<any>(null);
	const [width] = useWindowSize();


	const padded = String(frameIndex).padStart(4, "0");
	const path = '/dump/chellame';
	const src = `${path}/frame_${padded}.jpg`;

	const scrollToFrame = (index: any) => {
		if (listRef.current) {
			listRef.current.scrollToItem(index - 1, "center");
		}
	};

	useEffect(() => {
		if (!isPlaying) return;
		const interval = setInterval(() => {
			setFrameIndex((prev) => {
				const next = prev >= totalFrames ? 1 : prev + 1;
				scrollToFrame(next);
				return next;
			});
		}, 1000 / fps);
		return () => clearInterval(interval);
	}, [isPlaying]);

	useEffect(() => {
		const handleKeyDown = (e: any) => {
			if (e.key === "ArrowRight") {
				setIsPlaying(false);
				setFrameIndex((prev) => {
					const next = Math.min(prev + 1, totalFrames);
					scrollToFrame(next);
					return next;
				});
			}
			if (e.key === "ArrowLeft") {
				setIsPlaying(false);
				setFrameIndex((prev) => {
					const prevFrame = Math.max(prev - 1, 1);
					scrollToFrame(prevFrame);
					return prevFrame;
				});
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [frameIndex]);

	const handleSeek = (index: any) => {
		setFrameIndex(index);
		setIsPlaying(false);
		scrollToFrame(index);
	};

	// react-window item renderer
	const Thumbnail = ({ index, style }: any) => {
		const frameNum = index + 1;
		const frameName = String(frameNum).padStart(4, "0");
		const isActive = frameNum === frameIndex;

		return (
			<div style={{ ...style, padding: 2 }}>
				<Image
					src={`${path}/frame_${frameName}.jpg`}
					alt={`frame_${frameName}`}
					loading="lazy"
					style={{
						objectFit: "cover",
						border: isActive ? "2px solid lime" : "1px solid #333",
						cursor: "pointer",
					}}
					fill
					onClick={() => handleSeek(frameNum)}
				/>
			</div>
		);
	};

	return (
		<div style={{ background: "black", height: "100vh", display: "flex", flexDirection: "column" }}>
			{/* Main Frame View */}
			<div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Image
					src={src}
					alt={`Frame ${padded}`}
					style={{ maxWidth: "100%", maxHeight: "100%" }}
					onError={() => console.warn("Missing:", src)}
					fill
				/>
			</div>

			{/* Virtualized Thumbnails */}
			<div style={{ background: "#111", borderTop: "2px solid #333", position: 'absolute', bottom:0  }}>
				<List
					ref={listRef}
					height={70}
					itemCount={totalFrames}
					itemSize={84} // 80px width + padding
					width={width}
					layout="horizontal"
				>
					{Thumbnail}
				</List>
			</div>
		</div>
	);
}
