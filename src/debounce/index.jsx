import { useState } from "react"
import { useDebounce } from "./hook";

export function DebounceFunction() {
    const [val, setVal] = useState('');

    function apiCall(value) {
        console.log(value);
        
    }

    const debounceFunction = useDebounce(apiCall)

    function handleChange(value) {
        setVal(value);
        debounceFunction(value)
    }

    return(
        <div>
            <input value={val} onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}
