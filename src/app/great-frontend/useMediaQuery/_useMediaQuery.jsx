import { useEffect } from "react";

export function useMediaQuery(query) {


    useEffect(() => {

        function handleResize(e) {
            console.log(e);
            
        }
        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

}