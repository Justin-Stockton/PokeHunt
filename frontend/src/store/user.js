import { csrfFetch } from "./csrf";

const GET_ONE = "users/GET_ONE";

const GET_ALL = "users/GET_ALL";

const actionGetOne = (user) => {
  return {
    type: GET_ONE,
    user,
  };
};

const actionGetAll = (users) => {
  return {
    type: GET_ALL,
    users,
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
export const thunkGetAllUsers = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const users = await response.json();
    dispatch(actionGetAll(users));
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

    case GET_ALL:
      action.users.users.forEach((user) => {
        newState[user.id] = user;
      });

      return newState;

    default:
      return state;
  }
};

export default userReducer;
