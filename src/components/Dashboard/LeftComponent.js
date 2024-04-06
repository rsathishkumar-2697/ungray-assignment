import React, { useState, useEffect } from "react";
import "./LeftComponent.css";
import { SemiCircleProgress } from 'react-semicircle-progressbar';

const LeftComponent = () => {
  const [data, setData] = useState({
    score: 0,
  });

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
        "http://ec2-35-175-217-18.compute-1.amazonaws.com:8000/sample_assignment_api_3/",
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
      console.log(res)
      setData({
        score: Number(res.score),
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
console.log(data);
  return (
    <div className="left-container">
      <div className="score-box">
        <div className="score-progress">
      <div> <SemiCircleProgress
        percentage={data.score}
        size={{
          width: 200,
          height: 100,
        }}
        strokeWidth={5}
        strokeColor="blue"
      />
      
      </div>
          </div>
        <p className="out-of">of 100 points</p>
      </div>
      <hr></hr>
      <div className="score-info">
        <h3>You're good!</h3>
        <p className="para">Your sales performance score is better than 80% of other users.</p>
    <button>Improve your score</button>
    </div>
    </div>
  );
};

export default LeftComponent;
