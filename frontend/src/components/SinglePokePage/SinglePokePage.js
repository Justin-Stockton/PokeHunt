import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { thunkGetAllPokemons, thunkDeletePokemon } from "../../store/pokemon";
import EditForm from "../EditForm";

function SinglePokePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const poke = useParams();
  const pokeId = poke.pokemonId;

  useEffect(() => {
    dispatch(thunkGetAllPokemons());
  }, [dispatch]);

  const _handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeletePokemon(pokeId));
    history.push("/");
  };
  const pokeArr = useSelector((state) => {
    return state.pokemon[pokeId];
  });

  const userObj = useSelector((state) => {
    return state.session.user;
  });
  if (!pokeArr) {
    return null;
  }
  return (
    <>
      <div>Thank You For Looking At {pokeArr.name}!</div>
      <div>
        <div>{pokeArr.name}</div>
        <div>
          <img src={`${pokeArr.imgUrl}`} alt="pokemon" />
        </div>
        <div>{pokeArr.description}</div>
        {userObj.id === pokeArr.userId ? (
          <form onSubmit={_handleSubmit}>
            <div>
              <button type="submit">DELETE</button>
            </div>
          </form>
        ) : null}
      </div>
      <br />
      <br />
      <br />
      <br />
      {userObj.id === pokeArr.userId ? <EditForm /> : null}
    </>
  );
}

export default SinglePokePage;
