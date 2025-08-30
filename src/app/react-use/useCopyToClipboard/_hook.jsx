import { useState } from "react";

export function useCopyToClipboard() {
    const [state, setState] = useState({value: undefined, error: undefined})

    async function copyToClipboard(val) {        
        try {
            await navigator.clipboard.writeText(val);            
            setState({value: val, error: undefined})
        } catch (error) {
            setState({value: undefined, error: new Error("Copy failed")})
        }
    }    

    return [state, copyToClipboard]
}
