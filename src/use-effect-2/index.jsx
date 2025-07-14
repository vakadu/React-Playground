import { useRef, useState } from "react"

function useCustomEffect(cb, deps) {
    const firstRender = useRef(true);
    const prevDeps = useRef(deps);    

    if(firstRender.current) {
        firstRender.current = false
    }

    const depsChange = deps.some((dep, index) => {
        return dep !== prevDeps.current[index]        
    });
    console.log(depsChange);
    
    
    if(depsChange) {
        prevDeps.current = deps
        const cleanup = cb();
        return () => cleanup()
    }
}


export default function CustomUseEffect() {
    const [start, setStart] = useState(false)

    useCustomEffect(() => {        
        if(!start) {
            setStart(!start)
        }
    }, [start])

    return(
        <div>
            <button onClick={() => setStart(!start)}>{start ? 'Started':'Not Started'}</button>
        </div>
    )
}
