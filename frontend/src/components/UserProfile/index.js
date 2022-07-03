import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneUser } from "../../store/user";
import { useParams, NavLink } from "react-router-dom";
import { thunkGetUserPokemon } from "../../store/pokemon";
import { thunkGetUpVotes } from "../../store/upvote";
// import Upvote from "../Upvote";

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetOneUser(userId));
    dispatch(thunkGetUserPokemon(userId));
    // dispatch(thunkGetUpVotes());
  }, [dispatch, userId]);

  const pokemonArr = useSelector((state) => {
    return Object.values(state.pokemon);
  });

  const userObj = useSelector((state) => {
    return state.users[userId];
  });

  if (!userObj) return <div> ...Loading</div>;

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
        <h1
          style={{
            fontSize: "2rem",
            justifyContent: "center",
            display: "flex",
          }}
        >
          Welcome to {userObj.username}'s Profile!
        </h1>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "1.5 rem",
          }}
        >
          Checkout their Pokemon!
        </p>
      </div>
      {pokemonArr.length ? (
        pokemonArr.map((pokemon, i) => {
          return (
            <div key={i}>
              <div className="container">
                <div className="poke-img">
                  <NavLink to={`/pokemon/${pokemon.id}`}>
                    <img
                      src={`${pokemon.imgUrl}`}
                      alt=""
                      style={{ height: "7rem", width: "100%" }}
                    />
                  </NavLink>
                </div>
                <div className="poke-text">
                  <div className="poke-name">{pokemon.name}</div>
                  <div className="poke-description">{pokemon.description}</div>
                </div>
                {/* <Upvote poke={pokemon} /> */}
              </div>
            </div>
          );
        })
      ) : (
        <h1>
          Uh-oh! It looks like this trainer hasn't caught any pokemon yet!
        </h1>
      )}
    </div>
  );
}

export default UserProfile;
