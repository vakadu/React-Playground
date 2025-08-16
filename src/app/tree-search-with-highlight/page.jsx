'use client'

import { useState } from "react";

const data = {
  id: "root",
  label: "Home",
  children: [
    {
      id: "1",
      label: "About",
      children: [
        { id: "1.1", label: "Team" },
        { id: "1.2", label: "Careers" },
      ],
    },
    {
      id: "2",
      label: "Services",
      children: [
        { id: "2.1", label: "Design" },
        { id: "2.2", label: "Development" },
      ],
    },
  ],
};

function Table({ item, expanded, handleActiveId }) {    
  return (
    <div style={{marginLeft: 12}}>
      <div>
        <label style={{ backgroundColor: item.highlight ? 'gray' : 'transparent' }}>{item.label}, {item.id}</label>
        <button onClick={() => handleActiveId(item.id)}>+</button>
      </div>
      {
        expanded[item.id] && item.children &&
        item.children.map((child, i) => (
          <Table
            key={i}
            item={child}
            handleActiveId={handleActiveId}
            expanded={expanded}
          />
        ))}
    </div>
  );
}

function deepCheck(state, val) {
    const temp = {...state};
    if(temp.label.toLowerCase() === val) {
        temp['highlight'] = true
    } else {
        temp['highlight'] = false
    }

    if(state.children) {
        temp.children = state.children.map((child) => deepCheck(child, val))
    }

    return temp
}

function checkHighlighted(state) {
    let ids = [];
    if(state?.highlight) {
        ids.push(state.id)
    }

    if(state.children) {
        state.children = state.children.map((child) => checkHighlighted(child))
    }
    console.log(ids);
    
}

export default function TreeSearchExpandable() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({root: true}); 
  const [state, setState] = useState(data);  

  //TODO: expand on hightlight
  const handleChange = (val) => {
    setSearch(val);
    const temp = deepCheck(state, val);    
    // const highlighted = checkHighlighted(temp);
    setState(temp);
  };

  const handleActiveId = (id) => {
    const temp = {...expanded};
    temp[id] = true;
    setExpanded(temp)    
  }  

  return (
    <div>
      <input value={search} onChange={(e) => handleChange(e.target.value)} />
      <Table item={state} handleActiveId={handleActiveId} expanded={expanded} />
    </div>
  );
}
