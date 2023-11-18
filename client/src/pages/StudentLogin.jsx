import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentLogin.css";

const StudentLogin = () => {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://tutor-connect-production.up.railway.app"
      : "";
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "student", // Pre-selected role for students
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      console.log("data: ", data);
      setUserData(data);
    };
    fetchUsers();
  }, [API_URL]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    // Implement login logic
    console.log("Student login logic");

    // Check if there is a user with the provided username, password, and email
    const userExists = userData.some(
      (userDataItem) =>
        userDataItem.username === user.username &&
        userDataItem.password === user.password &&
        userDataItem.email === user.email
    );
    console.log("here");
    console.log(userExists);
    if (userExists) {
      // Student identity has been verified.
      // Proceed to login
      toast.success("Login successful!"); // Show success toast
      console.log("Login successful!");
      navigate("/selectclasses");
      //indow.location.href = "/selectclasses";
    } else {
      // Give the user a message that the account doesn't exist; suggest signing up
      toast.error("Account doesn't exist. Consider signing up.");
      console.log("Account doesn't exist. Consider signing up.");
    }
  };

  const handleSignUp = () => {
    // Implement signup logic
    console.log("Student signup logic");
  };

  return (
    <div className="form-container">
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
        <button onClick={handleSignUp}>SignUp</button>
      </form>

      <Link to="/" className="back-link">
        Back
      </Link>
    </div>
  );
};

export default StudentLogin;
