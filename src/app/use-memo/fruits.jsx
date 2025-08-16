export default function Fruits({ fruits }) {
  console.log("fruits");

  return (
    <div>
      {fruits?.map((fruit) => {
        return <div key={fruit}>{fruit}</div>;
      })}
    </div>
  );
}
