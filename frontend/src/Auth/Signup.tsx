import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../Hooks/useSignup.js";

export function Signup() {
  // const [pwError, isPwError] = useState(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const cpwRef = useRef<HTMLInputElement>(null);
  const { signup, error, isLoading, isSucc } = useSignup();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    await signup(
      mailRef.current?.value as string,
      pwRef.current?.value as string,
      cpwRef.current?.value as string
    );
    setTimeout(() => {
      if (isSucc) {
        navigate("/login");
      }
    }, 1500);
  };

  return (
    <div onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <form>
        <label>
          <h5>Enter Email ID</h5>
          <input type="email" ref={mailRef} />
        </label>
        <label>
          <h5>Enter Password</h5>
          <input type="password" ref={pwRef} />
        </label>
        <label>
          <h5>Confirm Password</h5>
          <input type="password" ref={cpwRef} />
        </label>
        <div style={{ color: "red", margin: "10px", fontWeight: "900" }}>
          {error}
        </div>
        {isSucc && <div>Loading..</div>}
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
