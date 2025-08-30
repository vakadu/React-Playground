"use client";

// 🚖 Ride Assignment Simulation – Feature Specification
// 🧩 Overview
// We are building a ride-picking simulation in React where multiple users (riders) wait in a queue to select from a set of available rides. Each ride has a price and becomes temporarily unavailable once picked. The system ensures:

// Users always pick the cheapest available ride

// Once all rides are taken, users wait in queue

// Rides become available again after a random cooldown time

// 📦 Core Concepts
// 1. 🧑‍🤝‍🧑 Riders
// A rider queue is maintained.

// Each rider automatically picks the cheapest available ride when it's their turn.

// Riders can be generated via a "Generate Riders" button.

// Riders are processed one at a time in FIFO (queue) order.

// 2. 🚗 Rides
// Each ride has:

// A unique rideId

// A price (random or seeded)

// A status: available or cooldown

// Rides start as available.

// Once picked, a ride goes into cooldown for a random time (e.g., 3-7 seconds).

// Once the cooldown ends, the ride becomes available again.

// 🔄 Ride Assignment Logic
// A rider is dequeued from the rider queue.

// The rider picks the cheapest available ride.

// That ride's status changes to cooldown.

// The rider is considered "served" and removed from the queue.

// Once the cooldown ends, the ride becomes available again.

// The next rider (if any) is immediately processed.

// 🧠 Edge Cases
// If no rides are available, riders stay in queue until one becomes available.

// Multiple riders are not allowed to pick the same ride during its cooldown.

// All rides are independent — cooldown timers don't affect each other.

import { use, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const colors = [
  "#e74c3c", // red
  "#8e44ad", // purple
  "#3498db", // blue
  "#1abc9c", // turquoise
  "#f39c12", // orange
  "#2ecc71", // green
  "#e67e22", // carrot
  "#9b59b6", // amethyst
  "#34495e", // dark blue
  "#16a085", // teal
];

const riders = [
  { riderId: uuidv4(), price: 121, name: "shankar", status: "free", capacity: 3 },
  { riderId: uuidv4(), price: 23, name: "kinkar", status: "free", capacity: 1 },
  { riderId: uuidv4(), price: 90, name: "lankar", status: "free", capacity: 6 },
  { riderId: uuidv4(), price: 82, name: "dunkar", status: "free", capacity: 1 },
  { riderId: uuidv4(), price: 12, name: "samkar", status: "free", capacity: 2 },
];

export default function Riders() {
  const [drivers, setDrivers] = useState(riders);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   if(users.length > 0) {
  //     handleUsers()
  //   }
  // }, [users])
  

  function handleUsers() {
    let random = Math.floor(Math.random() * 8) + 1;
    const newUsers = Array.from({ length: random }, (_, i) => {
      return {
        id: uuidv4(),
        status: "waiting",
      };
    });
    const updatedDrivers = [...drivers];
    const updatedUsers = [...users];

    newUsers.forEach((user) => {
      updatedDrivers.sort((a, b) => a.price - b.price);
      const rider = updatedDrivers.find((driver) => driver.status === "free");

      if (rider) {
        user.status = "assigned";
        user.riderId = rider.riderId;
        rider.status = "riding";
        
        setTimeout(() => {
          setDrivers((prev) => {
            return prev.map((d) => d.riderId === user.riderId ? {...d, status: 'free'} : d)
          })

          setUsers((prev) => {
            
          })


          // setUsers((prev) => {
          //   return prev.filter((u) => u.id !== user.id)
          // })
        }, 5000)
      } else {
        user.status = "queued";
      }

      updatedUsers.push(user);
    });

    setDrivers(updatedDrivers);
    setUsers(updatedUsers);
  }
  console.log(users);
  

  return (
    <div style={{ height: "100vh" }}>
      <button
        style={{
          backgroundColor: "white",
          padding: 12,
          outline: "none",
          margin: 12,
        }}
        onClick={handleUsers}
      >
        Generate Users
      </button>
      <div style={{ display: "flex", height: "100%" }}>
        {drivers.map((driver) => {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const { riderId, price, name, status } = driver;
          return (
            <div style={{ flex: 1, backgroundColor: color, padding: 10, }} key={riderId}>
              <div
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  padding: 8,
                  borderRadius: 12,
                  marginBottom: 12
                }}
              >
                <div>{name}</div>
                <div>Price: {price}</div>
                <div>Status: {status}</div>
              </div>
              {users.map((user) => {
                if (user.riderId === riderId) {
                  return (
                    <div
                      key={user.id}
                      style={{
                        width: 52,
                        height: 52,
                        backgroundColor: "white",
                        borderRadius: 15,
                        marginBottom: 12,
                      }}
                    >{user.status}</div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
