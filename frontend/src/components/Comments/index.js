import React, { useEffect, useState } from "react";
import {
  thunkGetReviews,
  thunkDeleteReview,
  thunkCreateReview,
} from "../../store/review";
import { thunkGetAllUsers } from "../../store/user";
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

  const loading = "...loadings";

  useEffect(() => {
    dispatch(thunkGetReviews(pokeId));
    dispatch(thunkGetAllUsers());
  }, [dispatch, pokeId]);

  const reviewArr = useSelector((state) => {
    return Object.values(state.review);
  });

  const userObj = useSelector((state) => {
    return state.session.user;
  });

  const allUsersObj = useSelector((state) => {
    return state.users;
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

  if (!allUsersObj && !userObj && !reviewArr)
    return (
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        LOADING
      </div>
    );

  return (
    <div style={{ marginTop: "5%" }}>
      <h2
        style={{ display: "flex", justifyContent: "center", fontSize: "2rem" }}
      >
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
            marginBottom: "3%",
            boarderBottom: "1px ",
          }}
        >
          <button
            onClick={(e) => (hidden === "" ? setHidden("none") : setHidden(""))}
            style={{ marginBottom: "1%" }}
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
                  <div style={{ overflowWrap: "break-word" }}>
                    {pokemonId === review.pokemonId ? (
                      <div
                        className="test"
                        style={{
                          border: "1px solid grey",
                          padding: "1%",
                          width: "30%",
                          borderRadius: "20px",
                          marginLeft: "35%",
                          boxShadow: "10px 5px 5px grey",
                        }}
                      >
                        <p>{review.review}</p>

                        <div>
                          -{" "}
                          {allUsersObj[review.userId] &&
                          allUsersObj[review.userId].username
                            ? allUsersObj[review.userId].username
                            : loading}
                        </div>
                        <div>
                          {userObj.id === review.userId ? (
                            <div>
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
