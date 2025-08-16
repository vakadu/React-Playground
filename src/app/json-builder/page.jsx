import React, { useState } from "react";

const layout = {
  type: "div",
  props: { className: "container" },
  children: [
    {
      type: "h1",
      props: { children: "Welcome!" },
    },
    {
      type: "CustomInput",
      props: { value: "Type here...", onChange: "handleInputChange" },
    },
    {
      type: "div",
      props: { className: "nested" },
      children: [
        {
          type: "p",
          props: { children: "Some nested content" },
        },
      ],
    },
  ],
};

const components = {
  div: ({ children, props }) => <div {...props}>{children}</div>,
  h1: ({ props }) => <h1>{props.children}</h1>,
  CustomInput: ({ props }) => (
    <input value={props.value} onChange={props.onChange} />
  ),
  p: ({ props }) => <p>{props.children}</p>,
};

function Cms({ item }) {
  const [value, setValue] = useState("");

  const handlers = {
    handleInputChange: (e) => {
      setValue(e.target.value);
    },
  };

  function renderTree(item) {
    let newProps = { ...item };
    if (Array.isArray(item.children)) {
      newProps.children = item.children.map((child, i) => (
        <Cms key={i} item={child} />
      ));
    }
    newProps.props.onChange = handlers.handleInputChange;

    let Comp = components[newProps.type];
    return React.createElement(Comp, newProps);
  }

  return <div>{renderTree(item)}</div>
}

export default function JsonBuilder() {
  return <Cms item={layout} />;
}
