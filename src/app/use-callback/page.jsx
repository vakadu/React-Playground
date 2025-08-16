"use client";

import React, { useState, useMemo, useCallback } from "react";
import Fruits from "./fruits";
import Search from "./plain";
import Select from "./select";
import UseCustomCallback from "./custom";

const fruits = [
  "Pineapple",
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Grapes",
  "Watermelon",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Cherry",
  "Peach",
  "Plum",
  "Apricot",
  "Kiwi",
  "Papaya",
  "Pomegranate",
  "Lychee",
  "Dragonfruit",
  "Avocado",
  "Guava",
  "Passionfruit",
  "Durian",
  "Jackfruit",
  "Cantaloupe",
  "Honeydew",
  "Fig",
  "Tangerine",
  "Clementine",
  "Mandarin",
  "Lemon",
  "Lime",
  "Coconut",
  "Pear",
  "Persimmon",
  "Mulberry",
  "Gooseberry",
  "Cranberry",
  "Boysenberry",
  "Elderberry",
  "Date",
  "Raisin",
  "Sultana",
  "Starfruit",
  "Rambutan",
  "Longan",
  "Nectarine",
  "Quince",
  "Tamarind",
  "Soursop",
  "Salak",
  "Chico",
  "Custard Apple",
  "Acerola",
  "Bilberry",
  "Jabuticaba",
  "Jujube",
  "Langsat",
  "Mangosteen",
  "Marionberry",
  "Miracle Fruit",
  "Olive",
  "Prickly Pear",
  "Sapodilla",
  "Santol",
  "Sugar Apple",
  "Ugli Fruit",
  "Yuzu",
  "Zucchini (technically a fruit)",
  "Ackee",
  "Amla",
  "Buddha's Hand",
  "Calamansi",
  "Cherimoya",
  "Hawthorn",
  "Kaffir Lime",
  "Kumquat",
  "Lucuma",
  "Medlar",
  "Nance",
  "Pepino",
  "Pitanga",
  "Pummelo",
  "Rowan",
  "Sea Buckthorn",
  "Sloe",
  "Surinam Cherry",
  "White Currant",
  "Yellow Passionfruit",
  "Carambola",
  "Jostaberry",
  "Wineberry",
  "Feijoa",
  "Huckleberry",
  "Loquat",
  "Pomelo",
];

function sortFruits(fruits, sortby) {
  return [...fruits].sort((a, b) => {
    if (a[0].toLowerCase() === sortby && b[0].toLowerCase() !== sortby)
      return -1;
    if (a[0].toLowerCase() !== sortby && b[0].toLowerCase() === sortby)
      return 1;
    return a.localeCompare(b);
  });
}

export default function UseCallback(props) {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(null);

  const sortedFruits = useMemo(() => sortFruits(fruits, selected), [selected]);

  const filteredFruits = sortedFruits.filter((fruit) => {
    return fruit.toLowerCase().includes(value.toLowerCase());
  });

  const handleChange = UseCustomCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value]
  );

  const handleSelected = UseCustomCallback(
    (e) => {
      setSelected(e.target.value);
    },
    [selected]
  );

  return (
    <div className="App">
      <Select value={selected} onChange={handleSelected} />
      <Search value={value} handleChange={handleChange} />
      <Fruits fruits={filteredFruits} />
    </div>
  );
}

// import { useCallback, useState } from "react";

// import { shuffle } from "../utils";

// import Search from "./search";

// const allUsers = ["john", "alex", "george", "simon", "james"];

// export default function UseCallback() {
//   const [users, setUsers] = useState(allUsers);

//   const handleSearch = useCallback(
//     () => (text) => {
//       const filteredUsers = allUsers.filter((user) => user.includes(text));
//       setUsers(filteredUsers);
//     },
//     [users]
//   );

//   const shuffledUsers = () => {
//     setUsers((prev) => {
//       let temp = shuffle([...prev]);
//       return temp;
//     });
//   };

//   return (
//     <div className="tutorial">
//       <div className="align-center mb-2 flex">
//         <button onClick={shuffledUsers}>Shuffle</button>
//         <Search onChange={handleSearch} />
//       </div>
//       <ul>
//         {users.map((user) => (
//           <li key={user}>{user}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
