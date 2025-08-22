"use client";

import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const LIMIT = 10;

export default function Pagination2() {
  const [postsData, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef();
  const [hasMore, setMore] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/fake-posts?page=${page}&limit=${LIMIT}`,
        );
        if (!response.ok) {
          throw new Error(`Http error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        
        setPosts((prev) => [...prev, ...data.items]);
        // if (data.length < LIMIT) {
        //   setMore(false);
        // }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          setPage((page) => page + 1);
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
      observer.unobserve(loader.current);
    };
  }, []);

  function handleMore() {
    setPage((page) => page + 1);
  }
  console.log(page);

  return (
    <div>
      <div className="min-h-screen">
        {postsData.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
      {/* {!loading && <button onClick={handleMore}>Load More</button>}
      {loading && <div>Loading....</div>} */}
      <div ref={loader} style={{ height: 1 }} />

      {loading && <div>Loading…</div>}
      {!hasMore && <div>No more posts.</div>}
    </div>
  );
}
