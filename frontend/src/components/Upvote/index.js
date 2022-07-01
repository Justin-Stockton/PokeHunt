import React, { useState } from "react";

function Upvote() {
  const [color, setColor] = useState("10px solid #5c6b73");
  const num = 321;
  return (
    <button
      style={{ backgroundColor: "transparent", marginRight: "2rem" }}
      //
      onClick={(e) => {
        e.preventDefault();

        if (color === "10px solid #5c6b73") {
          setColor("10px solid red");
        } else {
          setColor("10px solid #5c6b73");
        }
      }}
    >
      <div
        style={{
          display: "flex",
          height: "7rem",
          width: "5rem",
          border: "1px solid #5c6b73",
          borderRadius: "10%",
          alignItems: "center",
          justifyContent: "center",
          margin: "5%",
          flexDirection: "column-reverse",
        }}
      >
        <div style={{ margin: "5%" }}>{num}</div>
        <div
          style={{
            height: "0",
            width: "0",
            borderBottom: `${color}`,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            backgroundColor: "none",
          }}
        ></div>
      </div>
    </button>
  );
}

export default Upvote;
