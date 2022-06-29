import { csrfFetch } from "./csrf";

// ==== todo Define the Types ==== //

// ==== CRUD ==== //

// ==== CREATE ==== //

const CREATE_REVIEW = "review/CREATE_REVIEW";

// ==== READ ==== //

const GET_REVIEW = "review/GET_REVIEW";

// ==== UPDATE ==== //

// const UPDATE_REVIEW = "review/UPDATE_REVIEW";

// ==== DELETE ==== //

const DELETE_REVIEW = "review/DELETE_REVIEW";

// ==== todo Define the Actions //

// ==== CREATE ==== //

const actionCreateReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

// ==== READ ==== //

const actionGetReview = (pokemonId) => {
  return {
    type: GET_REVIEW,
    pokemonId,
  };
};

// ==== UPDATE ==== //

// const actionUpdateReview = (review) => {
//   return {
//     type: UPDATE_REVIEW,
//     review,
//   };
// };

// ==== DELETE ==== //

const actionDeleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

// ==== todo Define the Thunks ==== //

// ==== CREATE ==== //

export const thunkCreateReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(actionCreateReview(review));
    return review;
  }
};

// ==== READ ==== //

export const thunkGetReviews = (pokemonId) => async (dispatch) => {
  const response = await fetch(`/api/review/${pokemonId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetReview(data));
    return response;
  }

  return await response.json;
};

// ==== UPDATE ==== //

// ==== DELETE ==== //

export const thunkDeleteReview = (pokemonId) => async (dispatch) => {
  const response = await csrfFetch(`/api/review/${pokemonId}`, {
    method: "POST",
    pokemonId,
  });

  if (response.ok) {
    dispatch(actionDeleteReview(pokemonId));
  }
};

// ==== todo Define the Reducer==== //
// (state = {}, action)
const reviewReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_REVIEW:
      action.pokemonId.pokemonReviews.forEach((review) => {
        newState[review.id] = review;
        console.log("\n\n********");
        console.log(newState);
        console.log("********\n\n");
      });
      return newState;

    case CREATE_REVIEW:
      newState = { ...state };
      newState[action.review.createdReview.id] = {
        id: action.review.createdReview.id,
        userId: action.review.createdReview.userId,
        pokemonId: action.review.createdReview.pokemonId,
        review: action.review.createdReview.review,
        createdAt: action.review.createdReview.createdAt,
        updatedAt: action.review.createdReview.updatedAt,
      };
      return newState;

    case DELETE_REVIEW:
      newState = { ...state };
      delete newState[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewReducer;
