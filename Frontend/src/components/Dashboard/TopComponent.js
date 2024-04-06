import React, { useState, useEffect } from 'react';
import './TopComponent.css';

const TopComponent = () => {

  console.log('TopComponent rendered')
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loginWithCredentials('trial', 'assignment123')
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
        if (username === 'trial' && password === 'assignment123') {
          setIsLoggedIn(true);
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); 
    });
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://ec2-35-175-217-18.compute-1.amazonaws.com:8000/sample_assignment_api_1/',
        {
          method: 'POST',
          
          headers: {
            'Content-Type': 'application/json',
         
            Authorization: 'Basic ' + btoa('trial:assignment123'), 
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const result = await response.text();
      console.log(result)
     
      const res= JSON.parse(JSON.parse(result));
      const purchase = Number(res.purchase);
      const revenue = Number(res.revenue);
      const refunds = Number(res.refunds);
  
      console.log('Purchase:', purchase);
      console.log('Revenue:', revenue);
      console.log('Refunds:', refunds);
  
      setData({
        purchase: purchase,
        revenue: revenue,
        refunds: refunds,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
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
  console.log('Data:', data);
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Dashboard</h2>
        </div>
        <div className="header-right">
          <div className="compare-container">
            <h4>Compare to</h4>
            <select>
              <option>Last Year</option>
              <option>Current Year</option>
            </select>
          </div>
        </div>
      </div>
      <div className="box-container">
        <div className="box">
          <h4>Purchases</h4>
          <p>{data.purchase}</p>
        </div>
        <div className="box">
          <h4>Revenue</h4>
          <p>{data.revenue}</p>
        </div>
        <div className="box">
          <h4>Refunds</h4>
          <p>{data.refunds}</p>
        </div>
      </div>
    </div>
  );
};

export default TopComponent;


