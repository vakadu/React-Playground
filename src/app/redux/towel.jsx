import { useEffect } from "react";
import { useState } from "react";

export function towel(intialVal) {
  let value = intialVal;

  const subscribers = new Set();

  return {
    get: () => value,
    set: (newVal) => {
      value = newVal;
      //   console.log("Setting new value:", newVal);
      //   console.log(
      //     "Subscribers before notify:",
      //     console.log(Array.from(subscribers))
      //   );
      subscribers.forEach((callback) => {
        callback(value);
      });
      //   console.log(
      //     "Subscribers after notify:",
      //     console.log(Array.from(subscribers))
      //   );
    },
    subscribe: (callback) => {
      return () => {
        subscribers.delete(callback);
      };
    },
    subscribers,
  };
}

export function useTowel(towel) {
  const [val, setVal] = useState(towel.get());

  useEffect(() => {
    const unsubscribe = towel.subscribe(setVal);

    return () => {
      unsubscribe();
    };
  }, [towel]);

  return [val, towel.set];
}
