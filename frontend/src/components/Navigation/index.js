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

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <div>
          <NavLink to="/login">Log In</NavLink>
        </div>
        <div>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <button>Demo User</button>
          </form>
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
