"use client";

import { useEffect, useState } from "react";
import { CustomUseEffect } from "./custom";
import usePrev from "../use-prev/prev";
import ByRefVal from "./by-ref-val";

//this is used for managing sideeffects
//meaning data fetching, subscriptions etcc..

//useeffect is asynchronous meaning it doesnt block the render
//if there is setstate in useeffect then it might not update immediately

// life cycle
//useeffect is run after the mounting phase
//if we give empty dependecies then it will run once after the mounting phase
//if we add something in the dependency array useeffct will trigger once the
//depency changes, it will do a shallow copy of my prev and current
//dependencies and see if they are changed then it will call the useeffect

// const tempObj = {
//   name: "vinod",
//   address: {
//     line1: "hsr",
//     state: "KA",
//     Cou: "ind",
//   },
// };

const fruits = [
  { name: "Apple", quantity: 10 },
  { name: "Banana", quantity: 5 },
  { name: "Orange", quantity: 8 },
];

const fruits2 = [
  { name: "Apple", quantity: 11 },
  { name: "Banana", quantity: 5 },
  { name: "Orange", quantity: 8 },
];

const movies = ['a', 'b', 'c'];

function api() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fruits2);
    }, 2000);
  });
}

export default function UseEffct() {
  const [state, setState] = useState(fruits);
  const prev = usePrev(state);
  const [mov, setMov] = useState(movies)

  const fetchData = async () => {
    const data = await api();
    setState(data);
  };

  CustomUseEffect(() => {
    fetchData();
    // console.log("beforeapi");
  }, [state]);

  return (
    <div>
      {state.map((fruit, index) => (
        <div key={index}>
          {fruit.name} - Quantity: {fruit.quantity}
        </div>
      ))}
      <div>=============</div>
      <div>
        <ByRefVal/>
      </div>
    </div>
  );
}
