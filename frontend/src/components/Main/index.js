import React from "react";
import Pokemon from "../Pokemon";
import AddPokemon from "../AddPokemon";

function Main() {
  // const [hidden, setHidden] = useState("none");
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-evenly",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            margin: "2%",
            maxWidth: "100%",
            width: "30%",
          }}
        >
          <div>
            <div>
              <AddPokemon />
            </div>
            <div style={{ marginTop: "3%" }}>Created by:</div>
            <div style={{ padding: "2%" }}>
              <a
                href="https://www.github.com/Justin-Stockton"
                target="https://www.github.com/Justin-Stockton"
              >
                Justin Stockton
              </a>
              <h3>Technologies used:</h3>
              <div style={{ padding: "2%" }}>
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  href="https://reactjs.org/"
                  target="https://reactjs.org/"
                >
                  <img
                    alt="technolgy logo"
                    style={{ height: "15%", width: "15%" }}
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg"
                  />
                </a>
              </div>
              <div style={{ padding: "2%" }}>
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  href="https://redux.js.org/"
                  target="https://redux.js.org/"
                >
                  <img
                    alt="technolgy logo"
                    style={{ height: "15%", width: "15%" }}
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
                  />
                </a>
              </div>
              <div style={{ padding: "2%" }}>
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  href="https://nodejs.org/en/"
                  target="https://nodejs.org/en/"
                >
                  <img
                    alt="technolgy logo"
                    style={{ height: "15%", width: "15%" }}
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg"
                  />
                </a>
              </div>

              <div style={{ padding: "2%" }}>
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  href="https://expressjs.com/"
                  target="https://expressjs.com/"
                >
                  <img
                    alt="technolgy logo"
                    style={{ height: "15%", width: "15%" }}
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                  />
                </a>
              </div>

              <div style={{ padding: "2%" }}>
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  href="https://www.postgresql.org/"
                  target="https://www.postgresql.org/"
                >
                  <img
                    alt="technolgy logo"
                    style={{ height: "15%", width: "15%" }}
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "108rem", marginLeft: "10%", marginBottom: "2%" }}>
          <Pokemon />
        </div>
      </div>
    </div>
  );
}

export default Main;
