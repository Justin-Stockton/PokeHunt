import React, { useState } from "react";
import Pokemon from "../Pokemon";
import AddPokemon from "../AddPokemon";

function Main() {
  const [hidden, setHidden] = useState("none");
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
            flexDirection: "column",
            marginTop: "4%",
          }}
        >
          <div>
            <AddPokemon />
          </div>
        </div>
        <div>
          <Pokemon />
        </div>
      </div>
    </div>
  );
}

export default Main;
