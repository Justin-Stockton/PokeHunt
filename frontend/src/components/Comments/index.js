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

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteReview(8));
    history.push(`/pokemon/${pokeId}`);
  };

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
    //
    console.log(data);
    dispatch(thunkCreateReview(data));
  };

  return (
    <div>
      <h1>Review Section</h1>
      <form onSubmit={createReview}>
        <textarea
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
                    <>
                      {review.review}
                      <div>
                        {userObj.id === review.userId ? (
                          <div>
                            <button>Test Edit</button>
                            <div>
                              <button onClick={handleDelete}>DELETE</button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </>
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
