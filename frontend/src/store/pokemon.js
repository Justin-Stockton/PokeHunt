import { csrfFetch } from "./csrf";

//todo define types
// - CRUD
// - CREATE
const CREATE_POKEMON = "pokemon/CREATE_POKEMON";
// - READ
const GET_POKEMON = "pokemon/GET_POKEMON";

const GET_ONE_POKEMON = "pokemon/GET_ONE_POKEMON";
// - UPDATE
const UPDATE_POKEMON = "pokemon/UPDATE_POKEMON";
// - DELETE
const DELETE_POKEMON = "pokemon/DELETE_POKEMON";

//todo action creator
export const actionCreatePokemon = (pokemon) => {
  return {
    type: CREATE_POKEMON,
    pokemon,
  };
};
export const actionGetPokemons = (pokemon) => {
  return {
    type: GET_POKEMON,
    pokemon,
  };
};
export const actionGetOnePokemon = (pokemon) => {
  return {
    type: GET_ONE_POKEMON,
    pokemon,
  };
};
export const actionUpdatePokemon = (pokemon) => {
  return {
    type: UPDATE_POKEMON,
    pokemon,
  };
};
export const actionDeletePokemon = (pokemonId) => {
  return {
    type: DELETE_POKEMON,
    pokemonId,
  };
};

//todo Thunks

// CREATE
export const thunkCreatePokemon = (poke) => async (dispatch) => {
  const response = await csrfFetch(`/api/pokemon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(poke),
  });
  if (response.ok) {
    const pokemon = await response.json();
    dispatch(actionCreatePokemon(pokemon.pokemon));
    return pokemon;
  }
};
// READ ALL
export const thunkGetAllPokemons = () => async (dispatch) => {
  const response = await fetch("/api/pokemon", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetPokemons(data));
    return response;
  }

  return await response.json();
};

//UPDATE

export const thunkUpdatePokemon = (poke) => async (dispatch) => {
  const response = await csrfFetch(`/api/pokemon/${poke.pokemonId}`, {
    method: "PUT",
    body: JSON.stringify(poke),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(actionUpdatePokemon(data));
    return data;
  }
};
//todo Reducer
const pokeReducer = (state = {}, action) => {
  console.log(action);
  let newState = { ...state };

  switch (action.type) {
    case GET_POKEMON:
      action.pokemon.pokemon.forEach((pokemon) => {
        newState[pokemon.id] = pokemon;
      });
      return newState;

    case CREATE_POKEMON:
      newState = { ...state };
      newState[action.pokemon.id] = {
        userId: action.pokemon.userId,
        name: action.pokemon.name,
        imgUrl: action.pokemon.imgUrl,
        description: action.pokemon.description,
      };

      return newState;

    case UPDATE_POKEMON:
      newState = { ...state };
      console.clear();
      console.log("*****************");
      console.log(newState);
      console.log("*****************");
      console.log();
      console.log("*****************");
      newState[action.pokemon.pokemon.id] = {
        description: action.pokemon.pokemon.description,
        name: action.pokemon.pokemon.name,
        imgUrl: action.pokemon.pokemon.imgUrl,
      };
      return newState;

    case DELETE_POKEMON:
      newState = { ...state };
      delete newState[action.pokemonId];
      return newState;

    default:
      return state;
  }
};

export default pokeReducer;
