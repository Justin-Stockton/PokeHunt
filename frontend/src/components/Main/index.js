import React, { useState } from "react";
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
            <div>
              <a
                href="https://www.github.com/Justin-Stockton"
                target="https://www.github.com/Justin-Stockton"
              >
                Justin Stockton
              </a>
            </div>
          </div>
        </div>
        <div
          className="Is it this"
          style={{ width: "108rem", marginLeft: "10%" }}
        >
          <Pokemon />
        </div>
      </div>
    </div>
  );
}

export default Main;
