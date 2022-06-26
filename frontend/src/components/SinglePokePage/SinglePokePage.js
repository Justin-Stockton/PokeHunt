import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { thunkGetAllPokemons } from "../../store/pokemon";
import EditForm from "../EditForm";

function SinglePokePage() {
  const dispatch = useDispatch();
  const poke = useParams();
  const pokeId = poke.pokemonId;
  console.clear();

  useEffect(() => {
    dispatch(thunkGetAllPokemons());
  }, [dispatch]);

  const pokeArr = useSelector((state) => {
    return state.pokemon[pokeId];
  });
  const userObj = useSelector((state) => {
    console.log(state);
    return state.session.user;
  });
  console.log(userObj);
  if (!pokeArr) {
    return null;
  }
  return (
    <>
      <div>SinglePokePage</div>
      <div>
        <div>{pokeArr.name}</div>
        <div>{pokeArr.description}</div>
        <div>
          <img src={`${pokeArr.imgUrl}`} />
        </div>
      </div>
      {userObj.id === pokeArr.userId ? <EditForm /> : null}
    </>
  );
}

export default SinglePokePage;
