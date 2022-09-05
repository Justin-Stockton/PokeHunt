import React, { useState } from "react";
import Pokemon from "../Pokemon";
import AddPokemon from "../AddPokemon";
import classes from "./Main.module.css";

function Main() {
  const [display, setDisplay] = useState(false);
  return (
    <div className={classes.mainContainer}>
      <div className={classes.pokemonContainer}>
        <Pokemon />
      </div>
      <div className={classes.rightContainer}>
        <div>
          <button
            className={classes.button}
            onClick={() => setDisplay(!display)}
          >
            Add Your Own Pokemon!
          </button>

          <AddPokemon display={display} setDisplay={setDisplay} />
          <div>Created by:</div>
          <div>
            <a
              href="https://www.github.com/Justin-Stockton"
              target="https://www.github.com/Justin-Stockton"
            >
              Justin Stockton
            </a>
            <h3>Technologies used:</h3>

            <div className={classes.icons}>
              <a href="https://reactjs.org/" target="https://reactjs.org/">
                <img
                  alt="technolgy logo"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg"
                />
              </a>
            </div>
            <div className={classes.icons}>
              <a href="https://redux.js.org/" target="https://redux.js.org/">
                <img
                  alt="technolgy logo"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
                />
              </a>
            </div>
            <div className={classes.icons}>
              <a href="https://nodejs.org/en/" target="https://nodejs.org/en/">
                <img
                  alt="technolgy logo"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg"
                />
              </a>
            </div>

            <div className={classes.icons}>
              <a href="https://expressjs.com/" target="https://expressjs.com/">
                <img
                  alt="technolgy logo"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                />
              </a>
            </div>

            <div className={classes.icons}>
              <a
                href="https://www.postgresql.org/"
                target="https://www.postgresql.org/"
              >
                <img
                  alt="technolgy logo"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
