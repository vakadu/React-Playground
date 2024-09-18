import axios from "axios";
import { useState, useEffect } from "react";

const URL = "https://fakestoreapi.com/products";

const usePaginate = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=100`
      );
      setData(response.data.products);
    } catch (err) {
      throw new Error("eroor while loading");
    }
  };

  return {
    data,
    page,
    setPage,
  };
};

export default usePaginate;
