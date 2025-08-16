"use client";

import React, { useState, useMemo } from "react";
import Fruits from "./fruits";
import Search from "./plain";
import CustomUseMemo from "./custom";

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

function sortFruits(fruits) {
  return [...fruits].sort((a, b) => a.localeCompare(b));
}

export default function UseMemo(props) {
  const [value, setValue] = useState("");

  const sortedFruits = CustomUseMemo(() => sortFruits(fruits), []);
  console.log(sortedFruits);

  const filteredFruits = sortedFruits.filter((fruit) => {
    return fruit.toLowerCase().includes(value.toLowerCase());
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="App">
      <Search value={value} handleChange={handleChange} />
      <Fruits fruits={filteredFruits} />
    </div>
  );
}
