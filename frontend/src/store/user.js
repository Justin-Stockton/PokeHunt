import { csrfFetch } from "./csrf";

const GET_ONE = "users/GET_ONE";

const GET_ALL = "users/GET_ALL";

const actionGetOne = (user) => {
  return {
    type: GET_ONE,
    user,
  };
};

const actionGetAll = () => {
  return {
    type: GET_ALL,
  };
};

export const thunkGetOneUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const user = await response.json();
    dispatch(actionGetOne(user));
    return response;
  }
};

const userReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ONE:
      const user = action.user.user;
      newState[user.id] = user;
      return newState;
    default:
      return state;
  }
};

export default userReducer;
