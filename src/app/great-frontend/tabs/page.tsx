"use client";

import { useState } from "react";

const tabs = {
    0: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    1: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    2: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."
} as any;

export default function Page() {
    const [active, setActive] = useState(0);
  return (
    <div>
      <div>
        <button onClick={() => setActive(0)}>HTML</button>
        <button onClick={() => setActive(1)}>CSS</button>
        <button onClick={() => setActive(2)}>JavaScript</button>
      </div>
      <div>
        <p>
          {tabs[active]}
        </p>
      </div>
    </div>
  );
}
