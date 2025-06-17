import { createContext, useContext } from "react"

const SwrContext = createContext(null);

export function SwrProvider({children, value}) {
    return(
        <SwrContext.Provider value={value}>
            {children}
        </SwrContext.Provider>
    )
}

export function useSwrClient() {
    const context = useContext(SwrContext);
    return context
}
