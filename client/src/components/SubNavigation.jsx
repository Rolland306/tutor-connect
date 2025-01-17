import React from "react";
import { useLocation } from "react-router-dom";
import "../css/SubNavigation.css";

const SubNavigation = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const classId = pathSegments[2];

  return (
    <div className="sub-navigation">
      <h2>{classId ? `Class: ${classId}` : "No Class Selected"}</h2>
    </div>
  );
};

export default SubNavigation;
