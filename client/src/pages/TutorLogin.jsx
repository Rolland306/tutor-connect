import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TutorLogin.css";

const TutorLogin = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "tutor", // Pre-selected role for tutors
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    // Implement login logic
    console.log("Tutor login logic");
  };

  const handleSignUp = () => {
    // Implement signup logic
    console.log("Tutor signup logic");
  };

  return (
    <div className="form-container">
      <h3>Tutor Form</h3>
      <form>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <button onClick={handleLogin}>Login</button>
        <br></br>
        <button onClick={handleSignUp}>SignUp</button>
      </form>

      <Link to="/" className="back-link">
        Back
      </Link>
    </div>
  );
};

export default TutorLogin;
