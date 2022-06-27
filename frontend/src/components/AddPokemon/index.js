import React from "react";
import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreatePokemon } from "../../store/pokemon";

function AddPokemon() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  let userId;
  if (sessionUser) userId = sessionUser.id;
  if (!sessionUser) return <Redirect to="/login" />;

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
    <div>
      <h1>Lets see that Pokemon!!</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Desciption"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></input>
        <button type="submit">Submit your new Pokemon</button>
      </form>
    </div>
  );
}

export default AddPokemon;
