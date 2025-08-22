"use client";

import Link from "next/link";
import { useEffect } from "react";
import { classNames, mergeData } from "./_utils/utils";
import { EventEmitter } from "./_utils/event-emitter";

const routes = [
  { routeName: "/great-frontend/use-array", name: "Use Array" },
  { routeName: "/great-frontend/use-debounce", name: "Use Debounce" },
  { routeName: "/great-frontend/use-timeout", name: "Use Timeout" },
  { routeName: "/great-frontend/use-set", name: "Use Set" },
  { routeName: "/great-frontend/useWindowSize", name: "Use Window Size" },
];

export default function Index() {
  // useEffect(() => {
  //   // console.log(classNames("foo", "bar"));
  //   // // "foo bar"

  //   // console.log(classNames("foo", { bar: true }));
  //   // // "foo bar"

  //   // console.log(classNames({ "foo-bar": true }));
  //   // // // "foo-bar"

  //   // console.log(classNames({ "foo-bar": false }));
  //   // // // ""

  //   // console.log(classNames({ foo: true }, { bar: true }));
  //   // // "foo bar"

  //   // console.log(classNames({ foo: true, bar: true }));
  //   // // // "foo bar"

  //   // console.log(classNames({ foo: true, bar: false, qux: true }));
  //   // // // "foo qux"

  //   // console.log(classNames("a", ["b", { c: true, d: false }])); // 'a b c'

  //   // console.log(
  //   //   classNames(
  //   //     "foo",
  //   //     {
  //   //       bar: true,
  //   //       duck: false,
  //   //     },
  //   //     "baz",
  //   //     { quux: true },
  //   //   ),
  //   // );

  //   // console.log(classNames(null, false, "bar", undefined, { baz: null }, ""));
  //   // console.log(classNames(
  //   //     'foo',
  //   //     {
  //   //       bar: true,
  //   //       duck: false,
  //   //     },
  //   //     'baz',
  //   //     { quux: true },
  //   //   ));

  //   //   console.log(classNames('boo', true && 'loo', false && 'booz', {
  //   //     foo: true,
  //   //     bar: false,
  //   //     baz: 1,
  //   //   }))
  //     console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''))

  // }, []);

  // useEffect(() => {
  //   console.log(
  //     mergeData([
  //       { user: 8, duration: 50, equipment: ["bench"] },
  //       { user: 7, duration: 150, equipment: ["dumbbell"] },
  //       { user: 1, duration: 10, equipment: ["barbell"] },
  //       { user: 7, duration: 100, equipment: ["bike", "kettlebell"] },
  //       { user: 7, duration: 200, equipment: ["bike"] },
  //       { user: 2, duration: 200, equipment: ["treadmill"] },
  //       { user: 2, duration: 200, equipment: ["bike"] },
  //     ]),
  //   );
  //   console.log(
  //     mergeData([
  //       { user: 8, duration: 50, equipment: ["bench"] },
  //       { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
  //       { user: 8, duration: 50, equipment: ["bench"] },
  //       { user: 7, duration: 150, equipment: ["bench", "kettlebell"] },
  //     ]),
  //   );
  // }, []);

  // useEffect(() => {
  //   const emitter = new EventEmitter();
  //   console.log(emitter);
    
  //   function addTwoNumbers(a, b) {
  //     console.log(`The sum is ${a + b}`);
  //   }
  //   emitter.on("foo", addTwoNumbers);
  //   emitter.emit("foo", 2, 5);
  //   // > "The sum is 7"

  //   emitter.on("foo", (a, b) => console.log(`The product is ${a * b}`));
  //   emitter.emit("foo", 4, 5);
  //   // > "The sum is 9"
  //   // > "The product is 20"

  //   emitter.off("foo", addTwoNumbers);
  //   emitter.emit("foo", -3, 9);
  //   // > "The product is -27"
  // }, []);

  return (
    <div className="p-5">
      <div className="grid grid-cols-5 gap-4 pb-5">
        {routes.map((route) => {
          return (
            <Link
              className="flex items-center justify-center rounded-xl bg-amber-800 p-4 text-white hover:bg-amber-900"
              key={route.name}
              href={route.routeName}
            >
              {route.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
