"use client";

import { useState } from "react";

const items = [
  {
    value: "html",
    label: "HTML",
    panel:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    value: "css",
    label: "CSS",
    panel:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
  },
  {
    value: "javascript",
    label: "JavaScript",
    panel:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
  },
];

export default function Tabs() {
  const [active, setActive] = useState(items?.[0].value);
  const activePanel = items.find((panel) => active === panel.value).panel;
  return (
    <div>
      <div>
        {items.map((item) => {
          return (
            <button key={item.value} onClick={() => setActive(item.value)}>
              {item.label}
            </button>
          );
        })}
      </div>
      <div>
        <p>{activePanel}</p>
      </div>
    </div>
  );
}
