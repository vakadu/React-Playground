"use client";

import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const LIMIT = 30;

export default function Pagination2() {
  const [postsData, setPosts] = useState([]);
  const [page, setPage] = useState('0');
  const [loading, setLoading] = useState(false);
  const loader = useRef();
  const [hasMore, setMore] = useState(true);

  useEffect(() => {
    fetchData('0');
  }, []);

  async function fetchData(nextPage) {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/fake-posts?pageToken=${nextPage}&limit=${LIMIT}`,
        );
        if (!response.ok) {
          throw new Error(`Http error: ${response.status}`);
        }
        const data = await response.json();        
        setPosts((prev) => [...prev, ...data.items]);        
        setPage(data.nextPageToken);
        // if (data.length < LIMIT) {
        //   setMore(false);
        // }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }    

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          fetchData(page)
          // setPage((page) => page + 1);
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
    };
  }, [page]);

  function handleMore() {
    setPage((page) => page + 1);
  }

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
