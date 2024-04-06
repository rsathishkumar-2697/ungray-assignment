import React, { useState, useEffect } from 'react';
import { getComponent2Data } from '../../services/api';

const Component2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getComponent2Data()
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
      });
  }, []);

  return (
    <div>
   
      {data.map((item) => (
        <div key={item.id}>
          
          <p>{item.field1}</p>
          <p>{item.field2}</p>
          <p>{item.field3}</p>
         
        </div>
      ))}
    </div>
  );
};

export default Component2;