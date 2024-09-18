import { useEffect, useState } from "react";

const API_URL = "https://api.unsplash.com";

const useHook = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      `${API_URL}/search/photos?query=office&client_id=u0116tGKya0WOe-f-d07Q5UtVBEMEFvVYBavq_lb8XM&per_page=20`
    );
    const resJson = await response.json();
    setData(resJson.results);
  };

  return {
    data,
  };
};

export default useHook;
