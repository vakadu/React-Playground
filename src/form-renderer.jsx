import { useState } from "react";

const schema1 = {
  type: "group",
  label: "User Profile",
  fields: [
    {
      type: "text",
      label: "Name",
      key: "name",
    },
    {
      type: "group",
      label: "Address",
      fields: [
        { type: "text", label: "Street", key: "street" },
        { type: "text", label: "City", key: "city" },
      ],
    },
    {
      type: "repeat",
      label: "Contacts",
      key: "contacts",
      fields: [
        { type: "text", label: "Phone", key: "phone" },
        { type: "text", label: "Email", key: "email" },
      ],
    },
  ],
};

function Form({ schema, state, handleChange, handleAdd, handleDelete }) {
  return (
    <div style={{ marginLeft: 12 }}>
      {schema.type === "group" && (
        <div>
          <h4>{schema.label}</h4>
          {schema.fields.map((field) => (
            <Form
              schema={field}
              state={state}
              handleChange={handleChange}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
      {schema.type === "text" && (
        <div>
          <label>{schema.label}</label>
          <input
            name={schema.key}
            value={state?.[schema.key] ?? ""}
            onChange={(e) => handleChange(schema.key, e.target.value)}
          />
        </div>
      )}
      {schema.type === "repeat" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h4>{schema.label}</h4>
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={() => handleAdd(schema.type, "phone")}>+</button>
              <button onClick={() => handleDelete(schema.type, "phone")}>
                -
              </button>
            </div>
          </div>
          {schema.fields.map((field) => (
            <Form
              schema={field}
              state={state}
              handleChange={handleChange}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FormRenderer() {
  const [state, setState] = useState();
  const [scheme, setSchema] = useState(schema1);

  function handleChange(key, value) {
    const result = { ...state };
    result[key] = value;
    setState(result);
  }

  function handleAdd(type, key) {
    const temp = { ...scheme };
    const repeatData = temp.fields.find((filter) => filter.type === type);
    repeatData.fields.push({
      type: "text",
      label: "Phone",
      key: `${key}${temp.fields.length}`,
    });
    setSchema(temp);
  }  

  function handleDelete(type, key) {
     const temp = { ...scheme };
     const repeatData = temp.fields.find((filter) => filter.type === type);
     const newData = repeatData.fields.filter((field) => field.key !== key);
     repeatData.fields = newData;
      setSchema(temp);
  }

  return (
    <div>
      <Form
        schema={scheme}
        state={state}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
      />
    </div>
  );
}
