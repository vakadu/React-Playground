import { useEffect, useState } from "react";
import { queryClient } from ".";

export default function useQuery(key, fn) {
  const [loading, setLoading] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  function refetch() {
    fetchData();
  }

  async function fetchData() {
    setLoading(true);
    const queryData = await queryClient.fetchQuery(key, fn);
    setData(queryData.data);
    setLoading(false);
  }

  return {
    loading,
    data,
    refetch
  };
}
