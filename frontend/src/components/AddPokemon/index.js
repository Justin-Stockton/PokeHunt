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

  const sessionUser = useSelector((state) => state.session.user);
  let userId;
  if (sessionUser) {
    userId = sessionUser.id;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (imgUrl === "") {
    //   setImgUrl(
    //     "https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png"
    //   );
    // }

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
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        {!sessionUser ? (
          <div>
            It appears you aren't logged in. If you don't have an account feel
            free to use the Demo user
          </div>
        ) : null}
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
        <button type="submit" disabled={!sessionUser}>
          Submit your new Pokemon
        </button>
      </form>
    </div>
  );
}

export default AddPokemon;
