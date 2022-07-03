import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkGetOneUser } from "../../store/user";
import { useParams } from "react-router-dom";
import { thunkGetUserPokemon } from "../../store/pokemon";

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetOneUser(userId));
    dispatch(thunkGetUserPokemon(userId));
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "85%",
        margin: "8%",
      }}
    >
      <div>
        <p>UserProfile</p>
      </div>
    </div>
  );
}

export default UserProfile;
