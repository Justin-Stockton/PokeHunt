import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreatePokemon } from "../../store/pokemon";

function AddPokemon() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hidden, setHidden] = useState("none");

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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <button
        style={{ display: "flex", justifyContent: "center", width: "100px" }}
        onClick={(e) => setHidden("")}
      >
        Add Your Own Pokemon!
      </button>
      <div
        style={{
          display: `${hidden}`,
          flexDirection: "column",
          justifyContent: "center",
          border: "1px solid #A197BD",
          borderRadius: "1rem",
          margin: "5%",
          padding: "5%",
          width: "40%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1>Lets see that Pokemon!!</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {!sessionUser ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h2>
                It appears you aren't logged in. If you don't have an account
                feel free to use the Demo user
              </h2>
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "2rem 0 2rem 0",
            }}
          >
            <div style={{ display: "flex" }}>Name:</div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "2rem 0 2rem 0",
            }}
          >
            <div style={{ display: "flex" }}>Image Url:</div>
            <input
              type="text"
              placeholder="Image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "2rem 0 2rem 0",
            }}
          >
            <div style={{ display: "flex" }}>Desciption:</div>
            <textarea
              type="text"
              placeholder="Desciption"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="7"
              cols="100"
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" disabled={!sessionUser}>
              Submit your new Pokemon
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setHidden("none");
              }}
              style={{
                display: `flex`,
                width: "20%",
                justifyContent: "center",
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
