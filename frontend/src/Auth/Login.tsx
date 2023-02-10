import React, { useState, useEffect } from "react";
import useLogin from "../Hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { login, error, isLoading, isSucc } = useLogin();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await login(email, pw);
    if (isSucc) {
      setTimeout(() => {
        navigate("/attendance");
      }, 1500);
    }
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Log In</h3>
      <label htmlFor="em">Email</label>
      <input
        type="email"
        id="em"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="pw">Password</label>
      <input
        type="password"
        id="pw"
        onChange={(e) => setPw(e.target.value)}
        value={pw}
      />
      <button disabled={isLoading} type="submit">
        Login
      </button>
      {error && (
        <div style={{ color: "red", margin: "10px", fontWeight: "900" }}>
          {error}
        </div>
      )}
      {isSucc && (
        <div style={{ color: "green", margin: "10px", fontWeight: "900" }}>
          Succesfuly logged in!
        </div>
      )}
      <Link to="/signup">
        Not yet registered? <span>Signup</span>
      </Link>
    </form>
  );
}
