import { useLayoutEffect } from "react";

export default function UseLayoutEffect() {
  //useLayoutEffect is synchrounous meaning it will wait till useLayoutEffect is
  //executed and then start rendering

  const id = document.getElementById("id");
  useLayoutEffect(() => {
    console.log("layout", id);
  }, []);

  return <div id="id"></div>;
}
