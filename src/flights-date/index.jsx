import { useState } from "react";

const TODAY = formatDate(new Date());
// 24 hours in a day.
// Each hour has 60 minutes.
// Each minute has 60 seconds.
// Each second has 1000 milliseconds.
const DAY_IN_SECONDS = 24 * 60 * 60 * 1000;

function formatDate(date) {
  const year = date.getFullYear(); //2024
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //date.getMonth() is zero indexd like 0-11, so we add +1, we get month as 1,2,3 etcc.
  //so we add padStart(2,"0")
  const day = date.getDate().toString().padStart(2, "0");
  //date also comes in 1,2,3 etc.., so we add padstart(2,"0")

  return [year, month, day].join("-");
}

export default function Flights() {
  const [flightOption, setFlightOption] = useState("one-way");
  const [departureDate, setDepartureDate] = useState(
    formatDate(new Date(Date.now() + DAY_IN_SECONDS)) // Tomorrow.
  );
  const [returnDate, setReturnDate] = useState(
    formatDate(new Date(Date.now() + 3 * DAY_IN_SECONDS))
  );

  function submitForm(event) {
    event.preventDefault();
    if (flightOption === "one-way") {
      alert(`You have booked a one-way flight on ${departureDate}`);
      return;
    }

    alert(
      `You have booked a return flight, departing on ${departureDate} and returning on ${returnDate}`
    );
  }

  return (
    <div>
      <form className="flight-booker" onSubmit={submitForm}>
        <select
          value={flightOption}
          onChange={(event) => {
            setFlightOption(event.target.value);
          }}
        >
          <option value="one-way">One-way flight</option>
          <option value="return">Return flight</option>
        </select>
        <input
          aria-label="Departure date"
          type="date"
          value={departureDate}
          onChange={(event) => {
            setDepartureDate(event.target.value);
          }}
          min={TODAY}
        />
        {flightOption === "return" && (
          <input
            aria-label="Return date"
            type="date"
            value={returnDate}
            min={departureDate}
            onChange={(event) => {
              setReturnDate(event.target.value);
            }}
          />
        )}
        <button>Book</button>
      </form>
    </div>
  );
}
