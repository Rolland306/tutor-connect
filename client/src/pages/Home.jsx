import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <Link to="/student/login" className="login-button">
        Sign In as Student
      </Link>
      <Link to="/tutor/login" className="login-button">
        Sign In as Tutor
      </Link>
    </div>
  );
};

export default Home;
