import React, { useState } from "react";
import Auth from "./components/Authentication/Auth";
import Main from "./components/Dashboard/Main";

function App() {
  const initialLoggedInState = localStorage.getItem("isLoggedIn") === "true";

  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div>{isLoggedIn ? (<><button onClick={handleLogout}>Logout</button><Main/></>) : <Auth onLogin={handleLogin} />}</div>
  );
}

export default App;
