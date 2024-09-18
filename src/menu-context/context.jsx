import Menu from "./menu";

const Context = ({ data, points }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: points.y,
        left: points.x,
        zIndex: 99,
        border: "1px solid",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data.map((menu) => {
          return <Menu key={menu.id} item={menu} />;
        })}
      </ul>
    </div>
  );
};

export default Context;
