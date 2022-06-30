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
  const [hidden, setHidden] = useState("none");

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
    setHidden("");
    dispatch(thunkCreateReview(data));
  };

  const handleDelete = async (reviewId) => {
    await dispatch(thunkDeleteReview(reviewId));
    history.push(`/pokemon/${pokeId}`);
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Review Section
      </h2>

      <form
        onSubmit={createReview}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>
            <textarea
              style={{ resize: "none" }}
              required
              rows="10"
              cols="77"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell everyone what you think about this Pokemon!"
            ></textarea>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button>Add your review!</button>
          </div>
        </div>
      </form>

      {reviewArr[0] ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
            boarderBottom: "1px ",
          }}
        >
          <button
            onClick={(e) => (hidden === "" ? setHidden("none") : setHidden(""))}
          >
            Toggle Reviews
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "2rem",
          }}
        >
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "2rem",
            }}
          >
            Be the first to leave a review!
          </h1>
        </div>
      )}
      {reviewArr
        .sort(function (a, b) {
          return b.id - a.id;
        })
        .map((review, i) => {
          return (
            <div key={i} style={{ display: hidden }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "3%",
                }}
              >
                <div className="poke-text">
                  <div className="poke-text">
                    {pokemonId === review.pokemonId ? (
                      <div>
                        {review.review}
                        <div>
                          {userObj.id === review.userId ? (
                            <div>
                              {/* <button>Edit Your Review</button> */}
                              <div>
                                <br />
                                <button onClick={() => handleDelete(review.id)}>
                                  Delete Your Review
                                </button>
                              </div>
                              <br />
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
