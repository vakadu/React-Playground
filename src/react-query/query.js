import { useEffect, useState } from "react";
import { cache } from "../cache";

const CACHE_DURATION = 5000;

const useVw = (key, fetcher) => {
  const [data, setData] = useState(cache[key]?.data || null);
  const [loading, setLoading] = useState(!cache[key]?.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    const now = Date.now();

    // Check if cached data exists and is still valid
    if (cache[key] && now - cache[key].timestamp < CACHE_DURATION) {
      setData(cache[key].data);
      setLoading(false);
      return;
    }

    // Fetch new data if cache is missing or expired
    fetchData();
  }, [key, fetcher]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetcher();
      cache[key] = {
        data: response,
        timestamp: Date.now(),
      };
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
  };
};

export default useVw;
