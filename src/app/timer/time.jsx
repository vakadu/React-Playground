import { memo } from "react";

const Time = ({time}) => {
    console.log("time");
    return(
        <h1>{time}</h1>
    )
}

export default memo(Time)
