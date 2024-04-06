import React, { useState, useEffect } from "react";
import "./Component5.css";

const Component5 = () => {
  const [data, setData] = useState(null); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track error state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  useEffect(() => {
    // Effect to run once on component mount
    loginWithCredentials("trial", "assignment123")
      .then(() => {
        fetchData(); // Fetch data if authentication is successful
      })
      .catch((error) => {
        setError(error.message); // Handle authentication error
        setLoading(false); // Update loading state
      });
  }, []); // Empty dependency array to run effect only once on mount

  // Function to simulate login with credentials
  const loginWithCredentials = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "trial" && password === "assignment123") {
          setIsLoggedIn(true); // Set logged in status to true
          resolve(); // Resolve the promise if credentials are correct
        } else {
          reject(new Error("Invalid credentials")); // Reject with error if credentials are incorrect
        }
      }, 1000); // Simulate delay for authentication
    });
  };

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://ec2-35-175-217-18.compute-1.amazonaws.com:8000/sample_assignment_api_5/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("trial:assignment123"), // Authentication header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data"); // Throw error if response is not ok
      }

      const result = await response.text(); // Get response as text
      const res = JSON.parse(JSON.parse(result)); // Parse response as JSON
      const negative = Number(res.negative); // Convert negative value to number
      const neutral = Number(res.neutral); // Convert neutral value to number
      const positive = Number(res.positive); // Convert positive value to number

      setData({ // Update data state with parsed values
        negative: negative,
        neutral: neutral,
        positive: positive,
      });
      setLoading(false); // Update loading state
    } catch (error) {
      console.error(error.message); // Log error if fetch fails
      setLoading(false); // Update loading state
      setError(error.message); // Update error state
    }
  };

  // JSX to render UI based on component state
  if (!isLoggedIn) {
    return <div>Please wait, logging in...</div>; // Display login message if not logged in
  }

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetch fails
  }

  // Calculate percentages based on fetched data
  const total = data.negative + data.neutral + data.positive;
  const negativePercentage = (data.negative / total) * 100;
  const neutralPercentage = (data.neutral / total) * 100;
  const positivePercentage = (data.positive / total) * 100;

  // Render UI displaying community feedback statistics
  return (
    <div className="container">
      <p>Community feedback</p>
      <h5>Mostly positive</h5>
      <div className="bars-container">
        <div
          className="bar"
          style={{
            width: `${negativePercentage}%`,
            backgroundColor: "pink",
            borderRadius: '5px',
          }}
        ></div>
        <div
          className="bar"
          style={{
            width: `${neutralPercentage}%`,
            backgroundColor: "orange",
            borderRadius: '5px',
          }}
        ></div>
        <div
          className="bar"
          style={{
            width: `${positivePercentage}%`,
            backgroundColor: "green",
            borderRadius: '5px',
          }}
        ></div>
      </div>
      <div className="labels">
        <p>Negative</p>
        <p>Neutral</p>
        <p>Positive</p>
      </div>
      <div className="values">
        <p>{data.negative}</p>
        <p>{data.neutral}</p>
        <p>{data.positive}</p>
      </div>
    </div>
  );
};

export default Component5;
