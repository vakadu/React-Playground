"use client";

import Link from "next/link";

const routes = [
  { routeName: "/nayan/vallavan-1", name: "Vallavan-1" },
  { routeName: "/nayan/vallavan-2", name: "Vallavan-2" },
  { routeName: "/nayan/vallavan-3", name: "Vallavan-3" },
  { routeName: "/nayan/chellame", name: "chellame" },
];

export default function Index() {

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
