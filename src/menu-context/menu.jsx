import { useState } from "react";

const Menu = ({ item }) => {
  const [subMenu, setSubMenu] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setSubMenu(!subMenu);
  };

  return (
    <li onClick={handleClick}>
      {item.name}{" "}
      {subMenu && item.subMenu && (
        <ul>
          {item.subMenu.map((submenu) => {
            return <Menu item={submenu} />;
          })}
        </ul>
      )}
    </li>
  );
};

export default Menu;
