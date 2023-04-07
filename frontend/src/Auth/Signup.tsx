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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
    <form
      onSubmit={handleSubmit}
      className="auth-form rounded-3xl flex-col justify-center items-center text-center mr-auto ml-auto mt-20 px-5 py-8 min-w-[10%] max-w-[30%] bg-gray-300"
    >
      <h3 className="font-bold text-xl mb-7 text-center">Sign Up</h3>
      <input
        type="email"
        ref={mailRef}
        className="form-control block w-[75%] mx-auto px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none my-9"
        placeholder="Email address"
      />
      <input
        type="password"
        ref={pwRef}
        className="form-control block w-[75%] mx-auto px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none my-9"
        placeholder="Password"
      />
      <input
        type="password"
        ref={cpwRef}
        className="form-control block w-[75%]  mx-auto px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none my-9"
        placeholder="Confirm Password"
      />
      <button
        disabled={isLoading!}
        className="inline-block px-7 py-3 w-[80%] bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb-8"
        type="submit"
      >
        Sign Up
      </button>
      <div style={{ color: "red", margin: "10px", fontWeight: "900" }}>
        {error}
      </div>
      <div style={{ color: "green", margin: "10px", fontWeight: "900" }}>
        {succ}
      </div>
      {isLoading && <div>Loading..</div>}
      <Link to="/login" className="block">
        Already registered?{" "}
        <span className="underline text-blue-900 hover:text-white">Log In</span>
      </Link>
    </form>
  );
}
