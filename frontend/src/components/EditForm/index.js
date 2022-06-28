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
      <div>EditForm</div>
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
        <textarea
          type="text"
          placeholder="Desciption"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit changes</button>
      </form>
    </>
  );
}

export default EditForm;
