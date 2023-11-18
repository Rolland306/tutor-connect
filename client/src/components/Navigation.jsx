import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import "../css/Navigation.css";

const Navigation = () => {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://tutor-connect-production.up.railway.app"
      : "";
  const [classes, setClasses] = useState([]);
  const [allowClassSelection, setAllowClassSelection] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch classes data from your API
  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch(`${API_URL}/api/classes`);
      const data = await response.json();
      console.log("classes: ", data);
      setClasses(data);
    };

    fetchClasses();

    // Check if the current route allows class selection
    const { pathname } = location;
    setAllowClassSelection(pathname === "/selectclasses");
  }, [location, API_URL]);

  const handleClassClick = (classId) => {
    // Handle class selection, e.g., navigate to class details
    navigate(`/classes/${classId}`);
  };

  return (
    <nav>
      <ul>
        <li>
          <a href="/" role="button">
            <h1>Tutor-Connect 🔗</h1>
          </a>
        </li>
        <li>
          <a href="/" role="button">
            About
          </a>
        </li>
        <li className="dropdown">
          <a href="/classes" role="button">
            Classes
          </a>
          {allowClassSelection && (
            <div className="dropdown-content">
              {classes.map(
                (classItem) => (
                  console.log("classItem: ", classItem),
                  (
                    <a
                      key={classItem.class_id}
                      href={`/classes/${classItem.class_id}`}
                      onClick={() => handleClassClick(classItem.class_id)}
                    >
                      {classItem.class_name}
                    </a>
                  )
                )
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
