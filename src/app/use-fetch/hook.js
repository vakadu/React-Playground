import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(url);
      
      if (!response.ok) {        
          throw new Error(`Error: Filed to fetch`);
        }
      const newResponse = await response.json();
      setData(newResponse);
    } catch (error) {        
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
  };
}
