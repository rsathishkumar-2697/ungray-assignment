import React, { useState, useEffect } from "react";
import "./Component5.css";

const Component5 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loginWithCredentials("trial", "assignment123")
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const loginWithCredentials = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "trial" && password === "assignment123") {
          setIsLoggedIn(true);
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://ec2-35-175-217-18.compute-1.amazonaws.com:8000/sample_assignment_api_5/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("trial:assignment123"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.text();
      console.log(result);
      const res = JSON.parse(JSON.parse(result));
      console.log(res);

      const negative = Number(res.negative);
      const neutral = Number(res.neutral);
      const positive = Number(res.positive);

      console.log("Negative:", negative);
      console.log("Neutral:", neutral);
      console.log("Positive:", positive);

      setData({
        negative: negative,
        neutral: neutral,
        positive: positive,
      });
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  if (!isLoggedIn) {
    return <div>Please wait, logging in...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data === null) {
    return <div>No data available</div>;
  }

 

  const total = (data.negative || 0) + (data.neutral || 0) + (data.positive || 0);
  const negativePercentage = total === 0 ? 0 : ((data.negative || 0) / total) * 100;
  const neutralPercentage = total === 0 ? 0 : ((data.neutral || 0) / total) * 100;
  const positivePercentage = total === 0 ? 0 : ((data.positive || 0) / total) * 100;
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
