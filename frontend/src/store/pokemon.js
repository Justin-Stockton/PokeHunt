// import { csrfFetch } from "./csrf";

// //todo define types
// // - CRUD
// // - CREATE
// const CREATE_POKEMON = "pokemon/createPokemon";
// // - READ
// const GET_POKEMON = "pokemon/getPokemon";
// // - UPDATE
// const UPDATE_POKEMON = "pokemon/updatePokemon";
// // - DELETE
// const DELETE_POKEMON = "pokemon/deletePokemon";

// //todo action creator
// const actionCreatePokemon = (pokemon) => {
//   return {
//     type: "CREATE_POKEMON",
//     pokemon,
//   };
// };
// const actionGetPokemon = (pokemons) => {
//   return {
//     type: "GET_POKEMON",
//     pokemon,
//   };
// };
// const actionUpdatePokemon = (pokemon) => {
//   return {
//     type: "UPDATE_POKEMON",
//     pokemon,
//   };
// };
// const actionDeletePokemon = (pokemonId) => {
//   return {
//     type: "DELETE_POKEMON",
//     pokemon,
//   };
// };

// //todo Thunks

// export const thunkGetAllPokemon = () => async (dispatch) => {
//   const response = await csrfFetch("/api/pokemon");
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(actionGetPokemon(data));
//     return response;
//   }
//   return await response.json();
// };

// //todo Reducer
// const pokeReducer = (state = {}, action) => {
//   let newState = { ...state };
//   switch (action.type) {
//     case GET_POKEMON:
//       action.pokemons.forEach((pokemon) => {
//         newState[pokemon.id] = pokemon;
//       });
//       return newState;

//     case CREATE_POKEMON:
//       newState = { ...state };
//       newState.user = null;
//       return newState;

//     case UPDATE_POKEMON:
//       newState = { ...state };
//       newState.user = null;
//       return newState;

//     case DELETE_POKEMON:
//       newState = { ...state };
//       delete newState[action.pokemonId];
//       return newState;

//     default:
//       return state;
//   }
// };

// export default pokeReducer;
