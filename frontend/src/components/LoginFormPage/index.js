import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="content-wrapper" style={{ marginTop: "15%" }}>
      <form onSubmit={handleSubmit} className="form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20rem",
            padding: "5%",
          }}
        >
          <div style={{ marginBottom: "2%" }}>Username or Email:</div>
          <div style={{ marginBottom: "10%" }}>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              style={{ width: "100%" }}
              required
            />
          </div>

          <div style={{ marginBottom: "2%" }}>Passowrd:</div>
          <div style={{ marginBottom: "10%" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%" }}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit">Log In</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
