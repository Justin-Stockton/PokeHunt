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
      <div
        style={{
          display: "flex",
          marginTop: "6%",
          flexDirection: "column",
          justifyContent: "center ",
        }}
      >
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
      </div>
    );
  }
  return (
    <div>
      <div style={{ marginTop: "5%" }}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {pokeArr.name}
        </h1>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={`${pokeArr.imgUrl}`} alt="pokemon" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {pokeArr.description}
        </div>
        {userObj.id === pokeArr.userId ? (
          <form onSubmit={_handleSubmit}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit">DELETE YOUR POKEMON</button>
            </div>
          </form>
        ) : null}
      </div>
      {userObj.id === pokeArr.userId ? <EditForm /> : null}
      <Comments />
    </div>
  );
}

export default SinglePokePage;
