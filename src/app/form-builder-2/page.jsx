'use client'

import { useState } from "react";

const formConfig = [
  {
    name: "country",
    label: "Country",
    type: "select",
    options: ["India", "USA"],
  },
  {
    name: "state",
    label: "State",
    type: "text",
    showIf: {
      field: "country",
      value: "India",
    },
  },
  {
    name: "acceptTerms",
    label: "Accept Terms",
    type: "checkbox",
  },
  {
    name: "addresses",
    label: "Addresses",
    type: "group",
    repeatable: true,
    children: [
      { name: "street", label: "Street", type: "text" },
      { name: "city", label: "City", type: "text" },
      { name: "pincode", label: "Pincode", type: "text" },
    ],
  },
  {
    name: "hasReferral",
    label: "Do you have a referral?",
    type: "checkbox",
  },
  {
    name: "referralCode",
    label: "Referral Code",
    type: "text",
    showIf: {
      field: "hasReferral",
      value: true,
    },
  },
];

export default function FormBuilder2() {
  const [state, setState] = useState();

  const handleChange = (val, key) => {
    const temp = { ...state };
    temp[key] = val;
    setState(temp);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 400,
        margin: 16,
      }}
    >
      {formConfig.map((form) => {
        if (form.type === "select") {
          return (
            <select
              name={form.name}
              onChange={(e) => handleChange(e.target.value, form.name)}
              value={state?.[form.name]}
            >
              <option value="">-- Select --</option>

              {form.options.map((option) => {
                return <option>{option}</option>;
              })}
            </select>
          );
        }
        if (form.type === "checkbox") {
          return (
            <div>
              <label>{form.label}</label>
              <input
                type={form.type}
                name={form.name}
                checked={state?.[form.name]}
                onChange={(e) => handleChange(e.target.checked, form.name)}
              />
            </div>
          );
        }
        if (form.showIf && form.showIf.value === state?.[form.showIf.field]) {
          return (
            <input
              type={form.type}
              name={form.name}
              value={state?.[form.name]}
              placeholder={form.label}
              onChange={(e) => handleChange(e.target.value, form.name)}
            />
          );
        }
        if (form.type === "group") {
          return (
            <div style={{display: 'flex', gap: 8}}>
              {form.children.map((child) => {
                return (
                  <input
                    type={child.type}
                    placeholder={child.label}
                    name={child.name}
                    onChange={(e) => handleChange(e.target.value, child.name)}
                  />
                );
              })}
            </div>
          );
        }
        return;
      })}
    </div>
  );
}
