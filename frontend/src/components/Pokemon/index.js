import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { thunkGetAllPokemons } from "../../store/pokemon";
import "./Pokemon.css";
import { NavLink } from "react-router-dom";
import Upvote from "../Upvote";

function Pokemon() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllPokemons());
  }, [dispatch]);

  const pokemonArr = useSelector((state) => {
    return Object.values(state.pokemon);
  });

  if (!pokemonArr) {
    return null;
  }
  return (
    <>
      {pokemonArr.map((pokemon, i) => {
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
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Pokemon;
