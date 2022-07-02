import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkAddUpVote, thunkRemoveUpVote } from "../../store/upvote";

function Upvote({ poke }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const pokemonId = poke.id;
  const [color, setColor] = useState("10px solid #5c6b73");
  const sessionUser = useSelector((state) => state.session.user);
  let userId;
  if (sessionUser) userId = sessionUser.id;

  const test = useSelector((state) => {
    return Object.values(state.upVotes);
  });

  const num = test.filter((pokemon) => {
    return pokemon.pokemonId === pokemonId && pokemon.upVote === true;
  }).length;

  const upvoteObj = test.filter((pokemon) => {
    return pokemon.pokemonId === pokemonId && pokemon.userId === userId;
  })[0];

  let upVoteId;

  upvoteObj ? (upVoteId = upvoteObj.id) : (upVoteId = null);

  return (
    <button
      style={{ backgroundColor: "transparent", marginRight: "2rem" }}
      onClick={(e) => {
        e.preventDefault();
        const data = {
          userId,
          pokemonId,
          upVoteId,
        };

        if (!sessionUser) {
          alert(
            "You must be logged in to vote, but you can always use the demo user!"
          );
          history.push("/login");
        }

        if (color === "10px solid #5c6b73") {
          setColor("10px solid #733CA9");
          dispatch(thunkAddUpVote(data));
        } else {
          setColor("10px solid #5c6b73");
          dispatch(thunkRemoveUpVote(data));
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
