import useVw from "./query";

const fetchPosts = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return response.json();
  } catch (error) {}
};

export default function ReactQuery() {
  const { data, loading } = useVw("posts", fetchPosts);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{data?.title}</div>;
}
