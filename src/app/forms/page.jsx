"use client";

import React, { useState } from "react";

const StockSearch = () => {
  const [date, setDate] = useState("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState("");

  // Function to validate date format without leading zeroes
  const isValidDate = (dateString) => {
    // Pattern for 'D-MMMM-YYYY' where D doesn't have leading zero
    const datePattern = /^[1-9]|1[0-9]|2[0-9]|3[01]-[A-Za-z]+-\d{4}$/;
    return datePattern.test(dateString);
  };

  // Function to fetch data from API
  const fetchStockData = async () => {
    if (!isValidDate(date)) {
      setError("Invalid date format. Expected format: D-MMMM-YYYY");
      setStockData(null);
      return;
    }

    try {
      const response = await fetch(
        `https://jsonmock.hackerrank.com/api/stocks?date=${date}`
      );
      const result = await response.json();
      if (result.data.length > 0) {
        setStockData(result.data[0]);
        setError("");
      } else {
        setStockData(null);
        setError("No data found for the given date");
      }
    } catch (error) {
      setError("Error fetching data");
      setStockData(null);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setDate(e.target.value);
    setError(""); // Clear error message when input changes
  };

  // Handle button click to fetch stock data
  const handleSearchClick = () => {
    fetchStockData();
  };

  return (
    <div>
      <input
        type="text"
        value={date}
        onChange={handleInputChange}
        placeholder="Enter date as D-MMMM-YYYY"
      />
      <button onClick={handleSearchClick}>Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {stockData && (
        <div>
          <h3>Stock Data for {stockData.date}</h3>
          <p>Open: {stockData.open}</p>
          <p>High: {stockData.high}</p>
          <p>Low: {stockData.low}</p>
          <p>Close: {stockData.close}</p>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
