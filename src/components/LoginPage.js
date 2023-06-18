import React, { useState, useEffect } from "react";
import "../styles/Style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Login Page v^4!C%CQ94f0
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const notify = (error) => toast(error);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username and password are filled
    if (!username || !password) {
      setError("Please enter both username and password.");
      notify("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Make API request to login
      const response = await fetch(
        "https://demo.credy.in/api/v1/usermodule/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Login successful
        const { token } = data.data;
        // Store token in local storage
        localStorage.setItem("accessToken", token);
        // Redirect to movies page
        window.location.href = "/movies";
      } else {
        // Login failed
        setError(data.error.message);
        notify(data.error.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      notify(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <section class="section-cta" id="cta">
        <div class="container">
          <div class="cta">
            <div class="cta-text-box">
              <h2 class="heading-secondary">
                Welcome Back, Login Here to Access the Movies
              </h2>
              <form class="cta-form" name="sign-up" netlify>
                <div>
                  <label for="full-name">Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>

                <div>
                  <label for="email">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div>
                  <label for="select-where">Just an Extra Option?</label>
                  <select
                    id="select-where"
                    name="select-where"
                    required
                    disabled
                  >
                    <option value="">Don't click here </option>
                    <option value="friends">Friend and Family</option>
                    <option value="youtube">YouTube</option>
                    <option value="podcast">Podcast</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
                <button
                  class="btn btn--form"
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  Login Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
