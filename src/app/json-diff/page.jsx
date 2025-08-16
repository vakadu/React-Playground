// Old
'use client'

const prev = {
  name: "Vinod",
  age: 30,
  address: {
    city: "Delhi",
    pin: 12345
  },
  skills: ["React", "Node"]
};

// New
const next = {
  name: "Vinod",
  age: 31,
  address: {
    city: "Bangalore",
    pin: 12345
  },
  email: "vinod@example.com",
  skills: ["React", "Node", "TypeScript"]
};

const checker = (o, n, s) => {
    let result = [];
    let keys = new Set([...Object.keys(o), ...Object.keys(n)]);

    for(let key of keys) {
        let oldValue = o[key];
        let newValue = n[key];   
        let prefixKey = s ? `${s}.${key}` : key

        if(Array.isArray(oldValue) && Array.isArray(newValue)) {
            const uniqOld = oldValue.filter((old) => !newValue.includes(old));
            const uniqNew = newValue.filter((news) => !oldValue.includes(news));
            let resultArray = [...uniqOld, ...uniqNew];
            if(resultArray.length > 0) {
                let obj = { prefixKey, status: "ADDED", newValue: resultArray.join('') };
                result.push(obj)
            }
        }

        else if(typeof oldValue === 'object' && typeof newValue === 'object') {
            const newData = checker(oldValue, newValue, prefixKey);
            result.push(...newData)            
        }

        else if(!oldValue || !newValue) {
            let obj = { prefixKey, status: "ADDED", oldValue, newValue };
            result.push(obj)
        }

        else if(oldValue && newValue && oldValue !== newValue) {
            let obj = { prefixKey, status: "CHANGED", oldValue, newValue };
            result.push(obj)
        }
    }        

    return result;
};

export default function JsonDiff() {
    const diffResult = checker(prev, next, '');
    console.log(diffResult);
    
    
    return(
        <div>
            {
                diffResult.map((entry, idx) => (
  <DiffRow
    key={idx}
    keyPath={entry.key}
    status={entry.status}
    oldValue={entry.oldValue}
    newValue={entry.newValue}
  />
))
            }
        </div>
    )
}

const DiffRow = ({ keyPath, status, oldValue, newValue }) => {
  const getColor = () => {
    if (status === "ADDED") return "green";
    if (status === "REMOVED") return "red";
    if (status === "CHANGED") return "orange";
    return "gray";
  };

  const symbol = {
    ADDED: "+",
    REMOVED: "-",
    CHANGED: "~",
  }[status];

  return (
    <div style={{ color: getColor(), marginBottom: 4 }}>
      {symbol} <strong>{keyPath}</strong>:{" "}
      {status === "CHANGED" && (
        <span>
          "{oldValue}" → "{newValue}"
        </span>
      )}
      {status === "ADDED" && <span>"{newValue}"</span>}
      {status === "REMOVED" && <span>"{oldValue}"</span>}
    </div>
  );
};

