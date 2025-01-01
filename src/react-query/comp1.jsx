import { useQuery } from "./use-query";

const fetchPosts = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return response.json();
  } catch (error) {}
};

export default function Comp1() {
  const { data, isPending } = useQuery("posts", fetchPosts);
  console.log(data);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <div>{data?.title}</div>;
}
