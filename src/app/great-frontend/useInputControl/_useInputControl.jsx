import { useRef } from "react";
import { useState } from "react";

export function useInputControl(initialValue) {
    const init = useRef(initialValue);
    const [value, setValue] = useState(initialValue);
    const [touched, setTouched] = useState(false);
    const [dirty, setDirty] = useState(false);

    function reset() {
        setValue(init.current);
        setTouched(false);
        setDirty(false)
    }

    function handleChange(e) {
        const val = e.target.value;
        setValue(val);
        setDirty(true)
    }

    function handleBlur(e) {
        setTouched(!touched)
    }

    return {
        value,
        reset,
        dirty ,
        touched,
        handleChange,
        handleBlur,
        different: value !== init.current
    }

}

// value: string: The current value of the input
// dirty: boolean: Whether the user has been modified at least once
// touched: boolean: Whether the input was focused and blurred
// different: boolean: Whether the value is different from the initial value
// handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void: A function that updates the value of the input
// handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void: A function that to be called when the input is blurred
// reset: () => void: A function to reset to the initial value as well as the value of all states

