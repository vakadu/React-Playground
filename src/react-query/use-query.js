import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "./query-client-provider";

export function useQuery(key, fn) {
  const client = useQueryClient();

  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, status: "loading" }));
    try {
      const data = await client.fetchQuery(key, fn);
      setState((prevState) => ({ ...prevState, status: "success", data }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, status: "error" }));
    }
  }, [client, fn, key]);

  useEffect(() => {
    const cached = client.cache.get(key);
    if (cached.status === "success") {
      setState((prevState) => ({
        ...prevState,
        status: "success",
        data: cached.data,
      }));
    } else {
      fetchData();
    }
  }, [client.cache, fetchData, key]);

  return {
    data: state.data,
    isPending: state.status === "loading",
    error: state.error,
  };
}
