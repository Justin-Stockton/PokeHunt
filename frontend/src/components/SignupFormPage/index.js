import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors(["Passwords didn't match"]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <form
        style={{
          marginTop: "10%",
        }}
        onSubmit={handleSubmit}
      >
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div
          style={{
            marginBottom: "1%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Email:
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "3%", width: "15rem" }}
          />
        </div>
        <div
          style={{
            marginBottom: "1%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Username:
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ marginBottom: "3%", width: "15rem" }}
          />
        </div>
        <div
          style={{
            marginBottom: "1%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Password:
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "3%", width: "15rem" }}
          />
        </div>
        <div
          style={{
            marginBottom: "1%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Confirm Password:
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ marginBottom: "3%", width: "15rem" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
