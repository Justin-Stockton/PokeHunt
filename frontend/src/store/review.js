import { csrfFetch } from "./csrf";

// ==== todo Define the Types ==== //

// ==== CRUD ==== //

// ==== CREATE ==== //

const CREATE_REVIEW = "review/CREATE_REVIEW";

// ==== READ ==== //

const GET_REVIEW = "review/GET_REVIEW";

// ==== UPDATE ==== //

const UPDATE_REVIEW = "review/UPDATE_REVIEW";

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

const actionUpdateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

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
  const response = await csrfFetch(`/api/review/${review.pokemonId}`{,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(review),});

  if(response.ok){
    const review = await response.json();
    dispatch(actionCreateReview(review.review));
    return review;
  }
};

// ==== READ ==== //

// ==== UPDATE ==== //

// ==== DELETE ==== //

// ==== todo Define the Reducer==== //

const reviewReducer = (state = {}, action) => {
  //
};

export default reviewReducer;
