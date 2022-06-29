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
          <button
            style={{ display: `${!hidden}` }}
            onClick={(e) => setHidden("")}
          >
            Add Your Own Pokemon!
          </button>
          <div style={{ display: `${hidden}`, margin: "5% 0 5% 0" }}>
            <AddPokemon />
          </div>
          <button
            onClick={(e) => setHidden("none")}
            style={{ display: `${hidden}` }}
          >
            Cancel
          </button>
        </div>
        <div>
          <Pokemon />
        </div>
      </div>
    </div>
  );
}

export default Main;
