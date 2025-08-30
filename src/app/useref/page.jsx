"use client";

import { useEffect } from "react";
import { useRef } from "react";

//useref will start updating once dom is rendered

//useref doesnt tirgger a rerender

//if we assign a value to the useref it will persit across, meaning
//value is unchanged untill we do it

//bascially this is good for dom objects, setimers, prev values etcc..
//bcz these doesnt need to rerender and values stay constant across

export default function UseRef() {
  const ref = useRef();
  // const id = document.getElementById("id");

  // console.log(ref, id, "before");

  // useEffect(() => {
  //   console.log(ref, id);
  //   const ids = document.getElementById("id");
  //   console.log(ids);
  // }, []);

  return (
    <div ref={ref} id="id">
      {" "}
    </div>
  );
}
