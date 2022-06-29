import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import * as sessionActions from "../../store/session";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const credential = "Ash Ketchum";
  const password = "password";

  const handleClick = () => {
    // e.preventDefault();
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        return data;
      }
    );
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" id="home">
          Log In
        </NavLink>

        <NavLink to="/signup" id="home">
          Sign Up
        </NavLink>

        <div id="home" onClick={handleClick}>
          Demo User
        </div>
      </>
    );
  }

  return (
    <div className="big-div">
      <NavLink exact to="/" id="home">
        Home
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
