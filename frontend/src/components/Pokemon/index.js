import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { thunkGetAllPokemons } from "../../store/pokemon";

function Pokemon() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => {
    return Object.values(state.pokemon).map(
      (pokemonId) => state.pokemon[pokemonId]
    );
  });
  // console.log(pokemon);
  //
  useEffect(() => {
    dispatch(thunkGetAllPokemons());
  }, [dispatch]);
  //
  if (!pokemon) {
    return null;
  }
  return (
    <>
      <div>Hello From PokeComponet (products)</div>
      <div>Container for pokemon</div>
      <div className="primary-text">{pokemon.name}</div>
    </>
  );
}
export default Pokemon;
