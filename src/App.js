import { useState, useEffect } from "react";
import MoviesPage from "./components/Movies";
import LoginPage from "./components/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  return <div>{isLoggedIn ? <MoviesPage /> : <LoginPage />}</div>;
}

export default App;
