import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function FormBuilder3() {
    const [state, setState] = useState([
        {label: 'Field1', value: '', children:[], id: uuidv4()}
    ]);

    function handleChange(val, id) {
        function update(nodes) {
            return nodes.map((item) => {
                if(item.id === id) {
                    return {
                        ...item,
                        value: val
                    }
                }

                if(item.children) {
                    return {
                        ...item,
                        children: update(item.children)
                    }
                }

                return item
            })
        }
        const newState = update(state)
        setState(newState)
    }

    function handleAdd(id) {
        function add(nodes) {
            return nodes.map((node) => {
                if(node.id === id) {
                    return {
                        ...node,
                        children:[
                            ...node.children,
                            {
                            label: `Field #${node.children.length + 1}`,
                            value: "",
                            children: [],
                            id: uuidv4()
                        }
                        ]
                    }
                }

                if(node.children) {
                    return {
                        ...node,
                        children: add(node.children)
                    }
                }

                return node
            })
        }
        const newState = add(state);
        setState(newState)
    }

    function handleDelete(id) {
        function deleteItem(nodes) {
            return nodes.filter((node) => {
                return node.id !== id
            }).map((newItem) => {
                if(newItem.children) {
                    return {
                        ...newItem,
                        children: deleteItem(newItem.children)
                    }
                }
                return newItem
            })
        }
        
        const newState = deleteItem(state);
        setState(newState)
    }

    return(
        <div>
            {
                state.map((item, index) => {
                    return(
                        <Form item={item} handleChange={handleChange} handleAdd={handleAdd} handleDelete={handleDelete}/>
                    )
                })
            }
        </div>
    )
}

function Form({item, handleChange, handleAdd, handleDelete}) {
    return(
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginLeft: 12}}>
            <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                <label>{item.label}</label>
            <input onChange={(e) => handleChange(e.target.value, item.id)} name={item.id} value={item.value}/>
            </div>
            <button onClick={() => handleAdd(item.id)}>Add</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            {
                item?.children?.map((newItem) => {
                    return <Form item={newItem} handleChange={handleChange} handleAdd={handleAdd} handleDelete={handleDelete}/>
                })
            }
            </div>
        </div>
    )
}
