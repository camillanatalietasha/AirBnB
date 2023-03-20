import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory, Link } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout())
    .then(closeMenu())
    .then(history.push('/'));
  };

  const ulClassName = "menu-option" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="profile-container">
        {user ? (
          <Link className="link" id="create-spot-link-nav" to="/spots/new">
            Create a New Spot
          </Link>
        ) : (
          <></>
        )}
        <div onClick={openMenu}>
          <i className="fas fa-user-circle" id="profile-icon" />
        </div>
      </div>
      <div id="dropdown-menu-nav">
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li id="greeting" className="option"> Hello {user.firstName}!</li>
              <li className="option">{user.username}</li>
              <li className="option">
                {user.firstName} {user.lastName}
              </li>
              <li className="option">{user.email}</li>
              <li className="option">
                <NavLink to="/spots/current">Manage Spots</NavLink>
              </li>
              <li className="option-button">
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <div className="modal-links">
              <div className="one-modal">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              </div>
              <div className="one-modal">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
