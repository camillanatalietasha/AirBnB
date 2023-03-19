import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav-bar">
      <NavLink exact to="/">
        <div className="logo-div">
          <img
            id="logo"
            src="https://res.cloudinary.com/dvduszbet/image/upload/v1679205075/spacebnb/logonewest_digykd.png"
            alt="space-bnb-logo"
          />
        </div>
      </NavLink>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
