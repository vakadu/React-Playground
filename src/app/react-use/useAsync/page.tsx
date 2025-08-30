'use client'

import { useAsync } from "./_useAsync";

const Page = () => {
  const state = useAsync(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const result = await response.text();
    return result
  }, []);
  console.log(state);
  

  return (
    <div>
      {state.loading
        ? <div>Loading...</div>
        : state.error
          ? <div>Error: {state.error.message}</div>
          : <div>Value: {state.value}</div>
      }
    </div>
  );
};

export default Page 