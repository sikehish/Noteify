import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../Hooks/useSignup.js";

export function Signup() {
  // const [pwError, isPwError] = useState(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const cpwRef = useRef<HTMLInputElement>(null);
  const { signup, error, isLoading } = useSignup();
  const [flag, setFlag] = useState(false);
  const [succ, setSucc] = useState("");
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    await signup(
      mailRef.current?.value as string,
      pwRef.current?.value as string,
      cpwRef.current?.value as string
    );
    setFlag(true);
  };

  useEffect(() => {
    if (!isLoading && !error && flag) {
      mailRef.current!.value = "";
      pwRef.current!.value = "";
      cpwRef.current!.value = "";
      setSucc("Account created successfully!");
      const pathname = "/login";
      const myTimeout = setTimeout(() => {
        if (window.location.pathname == "/signup") navigate(pathname);
      }, 1500);
      if (window.location.pathname == pathname) clearTimeout(myTimeout);
    }
  }, [flag, error, isLoading]);

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
        <div style={{ color: "green", margin: "10px", fontWeight: "900" }}>
          {succ}
        </div>
        {isLoading && <div>Loading..</div>}
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
