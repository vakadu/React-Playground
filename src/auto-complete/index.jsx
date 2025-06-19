import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

function debounce(cb) {
  let timeout;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      cb(...args);
    }, 400);
  };
}

export default function AUtoComplete() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState("");
  const [data, setData] = useState();
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      setData((prev) => prev?.filter((item) => item?.id.includes(searchTerm)));
    }),
    []
  );

  async function fetchData() {
    const response = await api();
    setData(response);
  }

  function handleChange(value) {
    setValue(value);
    handleSearch(value);
    if (value.length === 0) {
      fetchData();
    }
  }

  function handleKeyDown(e) {
    if (e.code === "Escape") {
      setOpen(!open);
    } else if(e.code === "ArrowUp") {
         setActiveIndex((prev) => prev > 0 ? prev - 1 : 0)
    } else if(e.code === "ArrowDown") {
        setActiveIndex((prev) => prev < data?.length-1 ? prev + 1 : data?.length-1)
    }else if(e.code === "Enter") {
        const tempData = [...data];
        const active = tempData[activeIndex];
        setValue(active.label)        
    }
  }

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
      />
      {open && (
        <div>
          {data?.map((item, i) => {
            return (
              <div
                style={{
                  backgroundColor: activeIndex === i ? "gray" : "white",
                }}
                onClick={() => setValue(item.label)}
                key={item.id}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
