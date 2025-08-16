"use client";

import { useEffect, useState } from "react";
import { getMenu } from "./api";

export default function NavigationMenu() {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await getMenu();
    const menuData = await response?.json();
    setData(menuData);
  }
  return (
    <div style={{ display: "flex" }}>
      {data?.nodes?.map((node) => {
        return <Menu key={node?.path} node={node} />;
      })}
    </div>
  );
}

const Menu = ({ node }) => {
  const [active, setActive] = useState(false);
  const isFolder = node.type === "folder";

  const handleMouseEnter = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span>{node.path.split("/").pop()}</span>
      {isFolder &&
        active &&
        node?.nodes.map((newNode) => {
          return <Menu node={newNode} key={newNode.path} />;
        })}
    </div>
  );
};
