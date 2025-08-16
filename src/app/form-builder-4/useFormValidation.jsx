import { useEffect, useState } from "react"

function validateField(value, rules) {
    if(rules.required && !value) {
        return "This field is required"
    }
    if (rules.minLength && value.length < rules.minLength) {
    return `Minimum length is ${rules.minLength}.`;
  }
  return ""
}

export function useFormValidation(initialValues, validators) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false)

    const handleChange = (name) => (e) => {        
        const obj = {...values};
        obj[name] = e.target.value;
        setValues(obj)
    }

    function validate() {
        let valid = true;
        const newErrors = {};

        Object.keys(validators).forEach((field) => {
            const error = validateField(values[field], validators[field]);
            if(error) {
                newErrors[field] = error;
                valid = false
            }
        })
        setErrors(newErrors);
        setIsValid(valid)
    }

    // useEffect(() => {
    //     validate()
    // }, [])

    return {
        values,
        handleChange,
        errors,
        isValid,
        validate
    }
}
