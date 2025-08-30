"use client";

import { useFetch } from "./hook";

export default function FetchHook() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todo/1"
  );
  

  if(loading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>{error}</div>
  }

  return <div>{data.title}</div>;
}
