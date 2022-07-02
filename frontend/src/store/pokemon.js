import { csrfFetch } from "./csrf";

//todo define types
// - CRUD

// - CREATE

const CREATE_POKEMON = "pokemon/CREATE_POKEMON";

// - READ

const GET_POKEMON = "pokemon/GET_POKEMON";

// - UPDATE

const UPDATE_POKEMON = "pokemon/UPDATE_POKEMON";

// - DELETE

const DELETE_POKEMON = "pokemon/DELETE_POKEMON";

//todo action creator

const actionCreatePokemon = (pokemon) => {
  return {
    type: CREATE_POKEMON,
    pokemon,
  };
};

const actionGetPokemons = (pokemon) => {
  return {
    type: GET_POKEMON,
    pokemon,
  };
};

const actionUpdatePokemon = (pokemon) => {
  return {
    type: UPDATE_POKEMON,
    pokemon,
  };
};

const actionDeletePokemon = (pokemonId) => {
  return {
    type: DELETE_POKEMON,
    pokemonId,
  };
};

//todo Thunks

// CREATE

export const thunkCreatePokemon = (poke) => async (dispatch) => {
  if (poke.imgUrl === "") {
    poke.imgUrl =
      "https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png";
  }
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

// READ

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

//DELETE

export const thunkDeletePokemon = (pokemonId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pokemon/${pokemonId}`, {
    method: "POST",
    pokemonId,
  });

  if (response.ok) {
    dispatch(actionDeletePokemon(pokemonId));
  }
};

//todo Reducer

const pokeReducer = (state = {}, action) => {
  let newState = {};

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
      const pokemonData = action.pokemon.pokemon;
      newState[pokemonData.id] = pokemonData;
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
