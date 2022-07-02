import { csrfFetch } from "./csrf";

const ADD_UPVOTE = "review/ADD_UPVOTE";

const REMOVE_UPVOTE = "review/REMOVE_UPVOTE";

const GET_UPVOTES = "review/GET_UPVOTES";

const actionAddUpVote = (data) => {
  return {
    type: ADD_UPVOTE,
    data,
  };
};

const actionGetUpVotes = (pokemonId) => {
  return {
    type: GET_UPVOTES,
    pokemonId,
  };
};

const actionRemoveUpVote = (data) => {
  console.log("This is the action data", data);
  return {
    type: REMOVE_UPVOTE,
    data,
  };
};

export const thunkGetUpVotes = (data) => async (dispatch) => {
  const response = await csrfFetch(`api/upvote`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetUpVotes(data));
    return response;
  }
};

export const thunkAddUpVote = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/upvote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const upVote = await response.json();
    dispatch(actionAddUpVote(upVote));
    return upVote;
  }
};

export const thunkRemoveUpVote = (data) => async (dispatch) => {
  console.log(data, "This is the thunk remove data");

  // const id = data.id;
  const response = await csrfFetch(`/api/upvote/delete`, {
    method: "POST",
    data,
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(actionRemoveUpVote(data));
  }
};

const upVoteReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_UPVOTES:
      const votes = action.pokemonId.pokemonUpVotes;
      votes.forEach((vote) => {
        newState[vote.id] = vote;
      });

      return newState;

    case ADD_UPVOTE:
      const upVoteData = action.data.addUpVote;
      newState = { ...state };
      newState[upVoteData.id] = upVoteData;
      return newState;

    case REMOVE_UPVOTE:
      newState = { ...state };

      return newState;

    default:
      return state;
  }
};

export default upVoteReducer;
