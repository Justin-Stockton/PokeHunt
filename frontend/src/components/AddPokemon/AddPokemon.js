import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreatePokemon } from "../../store/pokemon";
import classes from "./AddPokemon.module.css";

function AddPokemon({ display, setDisplay }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const sessionUser = useSelector((state) => state.session.user);
  let userId;
  if (sessionUser) {
    userId = sessionUser.id;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId,
      name,
      imgUrl,
      description,
    };

    const poke = await dispatch(thunkCreatePokemon(data));
    history.push(`/pokemon/${poke.pokemon.id}`);
    return poke;
  };

  if (!display) return null;

  return (
    <div className={classes.background}>
      <div className={classes.formContainer}>
        <div className={classes.top}>
          <div className={classes.xContainer} onClick={() => setDisplay(false)}>
            <img src="/media/x.svg" />
          </div>
          <h1>Lets see that Pokemon!</h1>
          <div className={classes.filler}></div>
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          {!sessionUser ? (
            <div>
              <h2>
                It appears you aren't logged in. If you don't have an account
                feel free to use the Demo user
              </h2>
            </div>
          ) : null}
          <div>
            <div>Name:</div>
            <input
              className={classes.input}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <div className={classes.label}>Image Url:</div>
            <input
              className={classes.input}
              type="text"
              placeholder="Image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>
          <div>
            <div className={classes.label}>Description:</div>
            <textarea
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={classes.ta}
            ></textarea>
          </div>
          <div className={classes.buttonContainer}>
            <button
              type="submit"
              disabled={!sessionUser}
              className={classes.button}
            >
              Submit
            </button>
            <button
              className={classes.button}
              onClick={(e) => {
                e.preventDefault();
                setDisplay(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPokemon;
