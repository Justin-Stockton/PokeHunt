import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Main from "./components/Main";
import SinglePokePage from "./components/SinglePokePage/SinglePokePage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import "./index.css";
import NotFound from "./components/NotFoundPage";
import UserProfile from "./components/UserProfile";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/pokemon/:pokemonId">
            <SinglePokePage />
          </Route>
          <Route exact path="/users/:userId">
            <UserProfile />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
