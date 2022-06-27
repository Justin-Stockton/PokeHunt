import React from "react";
import { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateReview } from "../../store/review";

function AddReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState("");
  const [errors] = useState([]);

  const url = useParams();
  const pokemonId = url.pokemonId;

  const sessionUser = useSelector((state) => state.session.user);
  let userId;
  if (sessionUser) userId = sessionUser.id;
  if (!sessionUser) return <Redirect to="/login" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const pokemonId =
    const data = {
      review,
      pokemonId,
    };

    const _review = await dispatch(thunkCreateReview(data));
    history.push(`/pokemon/${_review.pokemon.id}`);
    return _review;
  };

  return <h1>Add Review Form</h1>;
}

export default AddReviewForm;
