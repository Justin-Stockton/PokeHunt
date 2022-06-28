import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkGetAllPokemons, thunkDeletePokemon } from "../../store/pokemon";
import EditForm from "../EditForm";
import Comments from "../Comments";

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
  if (!userObj) {
    return (
      <>
        <h1>
          It looks like you need to talk to the professor before proceeding!
        </h1>
        <div>
          I think I saw him over by the Log in button.... or was it the Sign up?
          I don't really remember anymore!
        </div>
        <div>
          To skip ahead to being a pokemon master click the Demo user button!!
        </div>
      </>
    );
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
              <button type="submit">DELETE YOUR POKEMON</button>
            </div>
          </form>
        ) : null}
      </div>
      <br />
      <br />
      <br />
      <br />
      {userObj.id === pokeArr.userId ? <EditForm /> : null}
      <Comments />
    </>
  );
}

export default SinglePokePage;
