import { useState } from "react";

const tree = {
  id: "root",
  label: "Parent",
  children: [
    {
      id: "a",
      label: "Child A",
      children: [
        { id: "a1", label: "Grandchild A1" },
        { id: "a2", label: "Grandchild A2" },
      ],
    },
    {
      id: "b",
      label: "Child B",
    },
  ],
};

function initializeTree(node) {
  const newNode = {
    ...node,
    checked: false,
  };
  if (node.children) {
    newNode.children = node.children.map((child) => initializeTree(child));
  }
  return newNode;
}

function Checkbox({ state, handleChange }) {  
  return (
    <div style={{ marginLeft: 12 }}>
      <label>{state.label}</label>
      <input
        type="checkbox"
        checked={state.checked}
        onChange={(e) => handleChange(state.id, e.target.checked)}
      />
      {state.children &&
        state.children.map((child, i) => (
          <Checkbox state={child} key={i} handleChange={handleChange} />
        ))}
    </div>
  );
}

function toggleAll(state, id, checked) {
  const updated = {...state, checked};
  if(updated.children) {
    updated.children = state.children.map((child) => toggleAll(child, id, checked))
  }
  return updated
}

function updatedTree(state, id, checked) {

  if(state.id === id) {
    return toggleAll(state, id, checked)
  }
  

  if(state.children) {
    return {
      ...state,
      children: state.children.map((child) =>  updatedTree(child, id, checked))
    }
  }

  return state
}

export default function CheckboxNested() {
  const [state, setState] = useState(() => initializeTree(tree));

  const handleChange = (id, checked) => {
    const updateTree = updatedTree(state, id, checked);
    setState(updateTree)    
  };

  return (
    <div>
      <Checkbox state={state} handleChange={handleChange} />
    </div>
  );
}
