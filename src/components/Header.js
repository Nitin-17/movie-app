import { useState } from "react";
import "../styles/Header.css";
import icon from "../images/filmigo1bg.png";

const Title = () => (
  <a to="/">
    <img src={icon} alt="Movie Logo" className="logo" />
  </a>
);

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <header class="header">
      <Title />
      <nav class="main-nav">
        <ul class="main-nav-list">
          <li>
            <a href="#login" class="main-nav-link nav-cta" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
