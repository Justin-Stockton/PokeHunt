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
      }}
    >
      <div style={{ display: "flex", paddingBottom: "2%", marginTop: "1rem" }}>
        <button
          style={{ display: "flex", justifyContent: "center", width: "5rem" }}
          onClick={(e) =>
            hidden === "none" ? setHidden("flex") : setHidden("none")
          }
        >
          Add Your Own Pokemon!
        </button>
      </div>
      <div
        style={{
          display: `${hidden}`,
          flexDirection: "column",
          justifyContent: "center",
          border: "1px solid #A197BD",
          borderRadius: "1rem",
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
          <h1>Lets see that Pokemon!</h1>
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
            <div style={{ display: "flex" }}>Description:</div>
            <textarea
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="7"
              cols="100"
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit" disabled={!sessionUser}>
              Submit
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
