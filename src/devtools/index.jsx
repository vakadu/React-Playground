import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function DevTools() {
  const [data, setData] = useState([
    {
      id: uuidv4(),
      count: 0,
      children: [],
    },
  ]);
  const [count, setCount] = useState(0);

  function addChildById(data, id, newNode) {
    return data?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          children: [...item.children, newNode],
        };
      }
      if (item?.children.length > 0) {
        return {
          ...item,
          children: addChildById(item.children, id, newNode),
        };
      }
      return item;
    });
  }

  function addTabs(e, id) {
    const newNode = {
      id: uuidv4(),
      count: 0,
      children: [],
    };
    if (id) {
      const newData = addChildById(data, id, newNode);
      setData(newData);
    } else {
      const newData = [...data, newNode];
      setData(newData);
    }
  }

  function updateCount(data, id, type) {
    return data.map((item) => {
        if(item.id === id) {
            return{
                ...item,
                count: type === 'dec' ? item.count > 0 ? item.count - 1 : 0 : item.count + 1
            }
        }

        if(item.children.length > 0) {
            return {
                ...item,
                children: updateCount(item.children, id, type)
            }
        }

        return item
    })
  }

  function increment(id) {
    const newData = updateCount(data, id, 'inc');
    setData(newData);
    setCount(calCount(newData))
  }

  function decrement(id) {
    const newData = updateCount(data, id, 'dec');
    setData(newData)
    setCount(calCount(newData))
  }

  function calCount(data) {
    let sum = 0;

    function dfs(nodes) {        
        for(let n of nodes) {
            sum += n.count;
            if(n.children.length >0) {
                dfs(n.children)
            }
        }
    }

    dfs(data)
    return sum;
  }

  function getCount() {
    const count = calCount(data);    
    setCount(count)
  }

  function deleteNode(data, id) {
    return data.filter((item) =>item.id !== id).map((it) => {
        return {
            ...it,
            children: deleteNode(it.children, id)
        }
    })
  }

  function deleteTab(e, id) {
    const newData = deleteNode(data, id);
    setData(newData)
  }

  return (
    <div>
      <div style={{display: 'flex', margin: 12, gap: 12 }}>
        <button onClick={addTabs}>
          Add
        </button>
        <div onClick={getCount}>Count: {count}</div>
      </div>

      <div>
        {data?.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              addTabs={addTabs}
              increment={increment}
              decrement={decrement}
              deleteTab={deleteTab}
            />
          );
        })}
      </div>
    </div>
  );
}

function Item({ item, addTabs, increment, decrement, deleteTab }) {
  return (
    <div style={{ marginLeft: 8 }} data-id={item.id}>
      <div style={{ display: "flex", gap: 12, padding: 8 }}>
        <div>{item.id}<span>{' ---->'}</span> <span>Count: {item.count}</span></div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => increment(item.id)}>+</button>
          <button onClick={() => decrement(item.id)}>-</button>
          <button onClick={(e) => addTabs(e, item.id)}>Add</button>
          <button onClick={(e) => deleteTab(e, item.id)}>Delete</button>
        </div>
      </div>
      {item.children.map((it) => {
        return (
          <Item
            item={it}
            key={it.id}
            addTabs={addTabs}
            decrement={decrement}
            increment={increment}
            deleteTab={deleteTab}
          />
        );
      })}
    </div>
  );
}
