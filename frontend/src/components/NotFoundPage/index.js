import React from "react";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <p>OH NO! It looks like the link you clicked isn't ready yet.</p>
      <p>
        If you think this was an error feel free to contact me and I will look
        into it!
      </p>
    </div>
  );
}

export default NotFound;
