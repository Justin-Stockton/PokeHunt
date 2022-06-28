import React, { useEffect, useState } from "react";
import {
  thunkGetReviews,
  thunkDeleteReview,
  thunkCreateReview,
} from "../../store/review";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Comments() {
  const history = useHistory();
  const dispatch = useDispatch();
  const poke = useParams();

  const pokeId = poke.pokemonId;
  const pokemonId = parseInt(pokeId, 10);
  const [review, setReview] = useState("");

  useEffect(() => {
    dispatch(thunkGetReviews(pokeId));
  }, [dispatch, pokeId]);

  const reviewArr = useSelector((state) => {
    return Object.values(state.review);
  });

  const userObj = useSelector((state) => {
    return state.session.user;
  });

  const createReview = async (e) => {
    e.preventDefault();
    const data = {
      userId: userObj.id,
      pokemonId,
      review,
    };
    setReview("");
    dispatch(thunkCreateReview(data));
  };

  const handleDelete = async (reviewId) => {
    await dispatch(thunkDeleteReview(reviewId));
    history.push(`/pokemon/${pokeId}`);
  };

  return (
    <div>
      <h1>Review Section</h1>
      <form onSubmit={createReview}>
        <textarea
          required
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
        ></textarea>
        <button>Add your review!</button>
      </form>
      {reviewArr.map((review, i) => {
        return (
          <div key={i}>
            <div className="review-container">
              <div className="poke-text">
                <div className="poke-review">
                  {pokemonId === review.pokemonId ? (
                    <div>
                      {review.review}
                      <div>
                        {userObj.id === review.userId ? (
                          <div>
                            {/* <button>Edit Your Review</button> */}
                            <div>
                              <button onClick={() => handleDelete(review.id)}>
                                Delete Your Review
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
