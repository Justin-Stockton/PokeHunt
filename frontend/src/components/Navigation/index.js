import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <div>
          <NavLink to="/login">Log In</NavLink>
        </div>
        <div>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </>
    );
  }

  return (
    <div className="big-div">
      <div>{isLoaded && sessionLinks}</div>
      <NavLink exact to="/" id="home">
        Home
      </NavLink>
    </div>
  );
}

export default Navigation;
