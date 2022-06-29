import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
//
import { thunkUpdatePokemon, thunkGetAllPokemons } from "../../store/pokemon";

function EditForm() {
  const dispatch = useDispatch();
  const poke = useParams();
  const pokemonId = poke.pokemonId;
  useEffect(() => {
    dispatch(thunkGetAllPokemons());
  }, [dispatch]);

  const pokeArr = useSelector((state) => {
    return state.pokemon[pokemonId];
  });

  const [imgUrl, setImgUrl] = useState(pokeArr.imgUrl);
  const [name, setName] = useState(pokeArr.name);
  const [description, setDescription] = useState(pokeArr.description);
  const [errors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  let userId;
  if (sessionUser) userId = sessionUser.id;
  if (!sessionUser) return <Redirect to="/login" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      pokemonId,
      userId,
      name,
      imgUrl,
      description,
    };

    const poke = await dispatch(thunkUpdatePokemon(data));
    return poke;
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>EditForm</button>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
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
          <textarea
            type="text"
            placeholder="Desciption"
            value={description}
            rows="10"
            cols="77"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button>Submit changes</button>
        </form>
      </div>
    </>
  );
}

export default EditForm;
