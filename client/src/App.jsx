import "./App.css";
import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import TutorLogin from "./pages/TutorLogin";
import { Link } from "react-router-dom";
import ClassSelection from "./pages/ClassSelection";
import TutorSelection from "./pages/TutorSelection";
import ViewChapters from "./pages/ViewChapters";

const App = () => {
  // const [trips, setTrips] = useState([]);
  // const [destinations, setDestinations] = useState([]);
  // useEffect(() => {
  //   const fetchTrips = async () => {
  //     const response = await fetch("/api/trips");
  //     const data = await response.json();
  //     setTrips(data);
  //   };
  //   fetchTrips();
  // }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/student/login",
      element: <StudentLogin />,
    },
    {
      path: "/tutor/login",
      element: <TutorLogin />,
    },
    {
      path: "/selectclasses",
      element: <ClassSelection />,
    },
    {
      path: "/classes/:class_id",
      element: <TutorSelection />,
    },
    {
      path: "/chapters",
      element: <ViewChapters />,
    },
    // {
    //   path: "/activity/create/:trip_id",
    //   element: <CreateActivity />,
    // },
    // {
    //   path: "/destinations/add/:destination_id",
    //   element: <AddToTrip data={trips} />,
    // },
  ]);

  return (
    <div className="App">
      <Navigation />
      {element}
    </div>
  );
};

export default App;
