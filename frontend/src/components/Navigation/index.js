import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="background">
    <div className="nav-bar">
      <ul className="logo-create-menu">
        <NavLink exact to="/">
          <div className="logo-div">
            <img
              id="logo"
              src="https://raw.githubusercontent.com/camillanatalietasha/SpaceBnB/main/frontend/src/media/images/logonewest.png"
              alt="space-bnb-logo"
            />
          </div>
        </NavLink>
      </ul>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </div>
    </div>
  );
}

export default Navigation;
