"use client";

import { useEffect, useState } from "react";
import News from "./news";

const URL = " https://hacker-news.firebaseio.com/v0/jobstories.json";
const INTIAL_LOAD = 6;

const HackerNews = () => {
  const [jobs, setJobs] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchJobDetails(page);
  }, [page]);

  const fetchData = async (page) => {
    let jobIds = jobs;
    try {
      const response = await fetch(URL);
      jobIds = await response.json();
      setJobs(jobIds);

      const start = page * INTIAL_LOAD;
      const end = start + INTIAL_LOAD;
      return jobIds.slice(start, end);
    } catch (err) {}
  };

  const fetchJobDetails = async (page) => {
    const ids = await fetchData(page);
    const details = await Promise.all(
      ids?.map((jobId) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`).then(
          (res) => res.json()
        )
      )
    );
    const newData = [...data, ...details];
    setData(newData);
  };

  const handleMore = () => {
    setPage(page + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((item) => {
        return <News item={item} key={item.id} />;
      })}
      {/* {data?.slice(0, INTIAL_LOAD * page).map((item) => {
        return <News item={item} key={item} />;
      })} */}
      <button onClick={handleMore}>Load More</button>
    </div>
  );
};

export default HackerNews;
