"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

let COUNTERS = 5;
const randomColors = [
  "#e63946",
  "#f1fa8c",
  "#a8dadc",
  "#457b9d",
  "#ff6f61",
  "#06d6a0",
  "#118ab2",
  "#ffb703",
  "#8338ec",
  "#ef476f",
];

const names = [
  "Aarav",
  "Meera",
  "Rohan",
  "Saanvi",
  "Kabir",
  "Isha",
  "Arjun",
  "Diya",
  "Vivaan",
  "Anaya",
  "Aryan",
  "Kiara",
  "Aditya",
  "Myra",
  "Dev",
  "Tanya",
  "Rudra",
  "Aanya",
  "Yash",
  "Nisha",
];

function getRandom(count) {
  return Math.floor(Math.random() * count);
}

function counterData() {
  return Array.from({ length: COUNTERS }, (_, i) => {
    return {
      counterId: i,
      numberOfCustomers: 0,
    };
  });
}

export default function BigBazar() {
  const [counters, setCounters] = useState(counterData());
  const [customers, setCustomers] = useState([]);
  const [disableCustomersButton, setDisableCustomersButton] = useState(false);

  useEffect(() => {
    if (disableCustomersButton) {
      const timeout = setTimeout(() => {
        setDisableCustomersButton(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [disableCustomersButton]);

  useEffect(() => {
    const customersCount = counters.map((counter, i) => {
        return {
            counterId: i,
            numberOfCustomers: customers.filter((customer) => customer.counterId === counter.counterId).length
        }
    });
    setCounters(customersCount)
  }, [customers.length]);

  function addCustomers() {
    const randomCount = getRandom(10);
    const totalCustomers = randomCount === 0 ? 1 :  randomCount;
    let newCustomers = [];    
    const tempCustomers = [...customers]

    for(let i=0; i<totalCustomers; i++) {
        const customersCount = counters.map((counter) => {
            return tempCustomers.filter((customer) => customer.counterId === counter.counterId).length
        });
        const minCounter = Math.min(...customersCount);
        const customer = {
            customerId: uuidv4(),
            counterId: customersCount.indexOf(minCounter),
            name: names[getRandom(20)],
        }
        newCustomers.push(customer);
        tempCustomers.push(customer)
    }
    setCustomers((prev) => [...prev, ...newCustomers]);
    setDisableCustomersButton(true);
  }

  return (
    <div style={{ display: "flex", padding: 16, gap: 16 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COUNTERS}, 1fr)`,
          gap: "16px",
          height: "100vh",
          flex: 1,
        }}
      >
        {counters.map((counter) => {
          const randomColor = randomColors[getRandom(randomColors.length)];
          return (
            <div style={{ backgroundColor: randomColor, padding: 16 }} key={counter.counterId}>
              <div
                style={{ padding: 10, height: 24, backgroundColor: "white" }}
              >
                Counter: {counter.counterId}
                <span>({counter.numberOfCustomers})</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 16,
                }}
              >
                {customers.map((customer) => {
                  const isCustomer = customer.counterId === counter.counterId;
                  if (isCustomer) {
                    return (
                      <div
                        style={{
                          backgroundColor: "white",
                          width: 52,
                          height: 52,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 4,
                        }}
                        key={customer.customerId}
                      >
                        <div>{customer.name}</div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button
          style={{
            backgroundColor: disableCustomersButton ? "gray" : "#8338ec",
            color: "white",
            padding: 12,
          }}
        //   disabled={disableCustomersButton}
          onClick={addCustomers}
        >
          Add Customers
        </button>
      </div>
    </div>
  );
}
