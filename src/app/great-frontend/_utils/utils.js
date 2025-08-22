export function classNames(...props) {
  let result = [];

  for (let index = 0; index < props.length; index++) {
    const element = props[index];          
    const value = classNamesHelper(element);
    if (value) {
      result.push(value);
    }
  }

  return result.join(" ");
}

function classNamesHelper(element) {
    
    if(!element) {
        return ""
    }

    if(typeof element === "number") {
        return element
    }

  if (typeof element === "string") {
    return element
  }

  if (Array.isArray(element)) {
    return element.map(classNamesHelper).filter(Boolean).join('')
  }

  if (typeof element === "object") {
    return Object.keys(element).filter((key) => !!element[key]).join(' ')
  }

  return ""
}

export function mergeData(sessions) {
    let result = {};

    for (let index = 0; index < sessions.length; index++) {
        const element = sessions[index];
        if(!result[element.user]) {
            result[element.user] = element;

        } else {            
            result[element.user] = {
                ...result[element.user],
                duration: result[element.user].duration + element.duration,
                equipment: Array.from(new Set([...result[element.user].equipment, ...element.equipment]))
            }            
        }
    }    

    return Object.values(result)
    
}

// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];
