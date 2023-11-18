import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const TutorSelection = () => {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://tutor-connect-production.up.railway.app"
      : "";
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      const response = await fetch(`${API_URL}/api/tutors`); // Update the API endpoint to fetch tutors
      const data = await response.json();
      console.log("tutors: ", data);
      setTutors(data);
    };

    fetchTutors();
  }, [API_URL]);
  console.log("tutorsForReal: ", tutors);

  return (
    <div className="tutorsContainer">
      <h2>CS 250</h2>

      <div className="subNavigation">
        {tutors.map(
          (tutor) => (
            console.log("tutorFR: ", tutor),
            (
              <Card
                key={tutor.tutor_id}
                id={tutor.tutor_id}
                username={tutor.tutor_name}
                number={tutor.num_students}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default TutorSelection;
