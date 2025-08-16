import { useState } from "react";

const Form = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the current field when typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "mobileNumber") {
      const mobilePattern = /^[1-9]\d{9}$/;
      if (!value.trim()) {
        error = "Mobile Number is required";
      } else if (!mobilePattern.test(value)) {
        error = "Enter correct format";
      } else if (isDuplicateMobile(value)) {
        error = "Mobile number already exists";
      }
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const isDuplicateMobile = (mobile) => {
    return data.some(
      (item, index) => item.mobileNumber === mobile && index !== editIndex // Exclude the current index when editing
    );
  };

  const validateForm = () => {
    let newErrors = {};
    // Only validate mobile number strictly
    const mobileError = validateField("mobileNumber", formData.mobileNumber);
    if (mobileError) {
      newErrors.mobileNumber = mobileError;
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (editIndex !== null) {
        const updatedData = data.map((item, index) =>
          index === editIndex ? formData : item
        );
        setData(updatedData);
        setEditIndex(null);
      } else {
        setData([...data, formData]);
      }
      setErrors({});
      setFormData({ firstName: "", lastName: "", mobileNumber: "" });
    }
  };

  const handleEdit = (index) => {
    let tempData = data[index];
    setFormData(tempData);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updateData = data?.filter((d, i) => i !== index);
    setData(updateData);
  };

  return (
    <section>
      {data?.map((d, index) => (
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 12,
            borderBottom: "1px solid #444",
          }}
          key={d.mobileNumber}
        >
          <div>{d.firstName}</div>
          <div>{d.lastName}</div>
          <div>{d.mobileNumber}</div>
          <button onClick={() => handleEdit(index)}>edit</button>
          <button onClick={() => handleDelete(index)}>delete</button>
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 450,
          gap: 12,
        }}
      >
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="First Name"
        />
        {errors?.firstName && <span>{errors.firstName}</span>}

        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Last Name"
        />
        {errors?.lastName && <span>{errors.lastName}</span>}

        <input
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Mobile Number"
        />
        {errors?.mobileNumber && <span>{errors.mobileNumber}</span>}

        <button type="submit">submit</button>
      </form>
    </section>
  );
};

export default Form;
