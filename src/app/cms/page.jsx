'use client'

import React from "react";

const layout = {
  type: "div",
  props: {
    className: "container",
    children: [
      {
        type: "h1",
        props: { style: { color: "red" }, children: "Welcome" },
      },
      {
        type: "CustomButton",
        props: { label: "Click Me", onClick: "handleClick" },
      },
      {
        type: "div",
        props: {
          className: "nested",
          children: [
            {
              type: "p",
              props: { children: "Nested content" },
            },
          ],
        },
      },
    ],
  },
};

const components = {
  h1: ({ style, children }) => <h1 style={style}>{children}</h1>,
  div: ({ className, children }) => <div className={className}>{children}</div>,
  CustomButton: ({ label, onClick }) => (
    <button onClick={onClick}>{label}</button>
  ),
  p: ({ children }) => <p>{children}</p>,
};

const handlers = {};

const renderTree = ({ type, props }) => {
  const newProps = {...props};

  for (let key in newProps) {
    if (
      key.startsWith("on") &&
      typeof newProps[key] === "string" &&
      handlers[newProps[key]]
    ) {
      newProps[key] = handlers[newProps[key]];
    }
  }

  if(Array.isArray(props.children)) {
    newProps.children = props.children.map(renderTree)
  }
  console.log(newProps);
  

  const Comp = components[type];
  return React.createElement(Comp, newProps)
};

export default function Cms() {
  const { type, props } = layout;

  return <div>{renderTree({ type, props })}</div>;
}
