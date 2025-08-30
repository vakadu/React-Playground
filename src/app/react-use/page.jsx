"use client";

import Link from "next/link";

const routes = [
  { routeName: "/react-use/useAsync", name: "Use Async" },
  { routeName: "/react-use/useCopyToClipboard", name: "UseCopyToClipboard" },
  { routeName: "/react-use/useLocalStorage", name: "useLocalStorage" },
  { routeName: "/react-use/useLockBodyScroll", name: "useLockBodyScroll" },
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
