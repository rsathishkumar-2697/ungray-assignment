import React from 'react';
import Sidebar from './Sidebar';
import TopComponent from './TopComponent';
import LeftComponent from './LeftComponent';
import Component5 from './Component5';
import Componenttwo from './Componenttwo';
import './Main.css'

const Main = () => {
  return (
    <div className="main-container">
       <Sidebar />
    <TopComponent />
    <LeftComponent/>
    <Component5/>
    <Componenttwo/>
   
  </div>
  );
};

export default Main;