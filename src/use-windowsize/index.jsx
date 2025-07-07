import { useWindowSize } from "./hook"

export default function WindowSize() {
    const {width, height} = useWindowSize();
    console.log(width,height);
    

    return(
        <div></div>
    )
}
