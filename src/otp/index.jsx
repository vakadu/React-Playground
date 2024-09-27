import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Otp() {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(4).fill(""));

  useEffect(() => {
    inputRefs?.current?.[0].focus();
  }, []);

  const handleChange = (e, i) => {
    const value = e.target.value;
    let temp = [...otp];
    //taking only last value
    temp[i] = value.slice(value.length - 1);
    setOtp(temp);

    if (i >= 0 && i < otp.length - 1) {
      inputRefs?.current?.[i + 1].focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (otp[i] === "" && i > 0) {
        inputRefs.current[i - 1].focus();
        let temp = [...otp];
        temp[i - 1] = "";
        setOtp(temp);
      }
    }
  };

  const handleClick = (e, i) => {
    inputRefs.current[i].setSelectionRange(1, 1);
  };

  return (
    <div style={{ display: "flex", gap: 24 }}>
      {otp.map((_, i) => {
        return (
          <div style={{ width: 32, height: 32 }} key={i}>
            <input
              ref={(input) => (inputRefs.current[i] = input)}
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontSize: 24,
              }}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onClick={(e) => handleClick(e, i)}
              value={otp[i]}
            />
          </div>
        );
      })}
    </div>
  );
}
