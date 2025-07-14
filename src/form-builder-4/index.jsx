import React from "react";
import { useFormValidation } from "./useFormValidation";

const FormBuilder4 = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validators = {
    email: { required: true, email: true },
    password: { required: true, minLength: 6 },
  };

  const { values, errors, handleChange, isValid, validate } = useFormValidation(
    initialValues,
    validators
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();

    if(isValid) {
        alert("submitted")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={values.email}
          onChange={handleChange("email")}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange("password")}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default FormBuilder4;
