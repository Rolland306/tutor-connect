import React from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";

const Card = (props) => {
  console.log("props: ", props);

  return (
    <div className="Card" style={{ backgroundColor: `green` }}>
      <div className="card-info">
        <Link to={"edit/" + props.id}>
          <img className="moreButton" alt="edit button" src={more} />
        </Link>
        <h3 className="title">{props.username}</h3>
        <h3>Current Students: {props.number}</h3>
        <Link to={"/chapters"}>
          <button>Select</button>
        </Link>
        <Link to={"/"}>
          <button className="seeMoreBtn">See More</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
