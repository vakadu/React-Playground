import { useEffect, useState } from "react";
import apiCall from "./api";
import Context from "./context";

const ContextMenu = () => {
  const [data, setData] = useState([]);
  const [showMenu, setMenu] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenu(true);
    const newPoints = {
      x: e.pageX,
      y: e.pageY,
    };
    setPoints(newPoints);
  };

  useEffect(() => {
    window.addEventListener("contextmenu", handleContextMenu);

    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const fetchData = async () => {
    const response = await apiCall();
    setData(response);
  };

  const handleClick = () => {
    if (showMenu) {
      setMenu(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ position: "relative", height: "100vh", width: "100%" }}
    >
      {showMenu && <Context data={data} points={points} />}
    </div>
  );
};

export default ContextMenu;
