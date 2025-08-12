import { useEffect, useState } from "react";
import Time from "./time";
import  Content  from "./content";

export default function Timer() {
  const [time, setTime] = useState(5);
  const [value, setValue] = useState('');

  useEffect(() => {
    if(time === 0) {
        return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);
  console.log("render");
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: 'column',
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
      }}
    >
      <Time time={time}/>
      <input value={value} onChange={(e) => setValue(e.target.value)}/>
      <Content/>
    </div>
  );
}
