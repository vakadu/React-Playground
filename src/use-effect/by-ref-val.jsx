import { useEffect, useMemo, useState } from "react";

const movies = [
  "The Accountant 2",
  "From the World of John Wick: Ballerina",
  "Sinners",
  "Straw",
  "Predator: Killer of Killers",
  "Mission: Impossible - The Final Reckoning",
  "Lilo & Stitch",
  "The Phoenician Scheme",
  "Mountainhead",
  "Bring Her Back",
  "The Godfather",
  "Seven Samurai",
  "12 Angry Men",
  "Pulp Fiction",
  "The Shawshank Redemption"
];

const api = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...movies])
        }, 2000)
    })
}

const api2 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["1", "2", "3"])
        }, 2000)
    })
}

export default function ByRefVal() {
    // const [state, setState] = useState(undefined);
    // const [state2, setState2] = useState(undefined);
    const [rand, setRand] = useState();
    const [count, setCount] = useState(1);
    const [mov, setMov] = useState({num: 1});

    const newData = useMemo(() => {
        console.log("new");
        
        return mov
    }, [mov.num])

    useEffect(() => {
        console.log(count);
    }, [count])

    useEffect(() => {
         console.log(mov);
    }, [mov])

    // useEffect(() => {        
    //     fetchData()
    // }, [])

    // const fetchData = async () => {
    //     const res = await api();
    //     const res2 = await api2();         
    //     setState(res);
    //     setState2(res2)
    // };

    // const onUpdate = () => {
    //     movies.push("tiger");
    //     fetchData()
    // };
    

    return(
        <div>
            <button onClick={() => setCount(1)}>count: {count}</button>
             <button onClick={() => setMov({num: 1})}>mov: {newData.num}</button>
            {/* <button onClick={onUpdate}>update</button>
            {
                state?.map((mov) => {
                    return(
                        <div key={mov}>{mov}</div>
                    )
                })
            }
            {
                state2?.map((mov) => {
                    return(
                        <div key={mov}>{mov}</div>
                    )
                })
            } */}
        </div>
    )
}
