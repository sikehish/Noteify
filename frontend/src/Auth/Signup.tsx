import React from "react";
import { Link } from "react-router-dom";

export function Signup() {
  return (
    <div>
      <h3>Sign Up</h3>
      <label>
        <h5>Enter Email ID</h5>
        <input type="email" />
      </label>
      <label>
        <h5>Enter Password</h5>
        <input type="password" />
      </label>
      <label>
        <h5>Confirm Password</h5>
        <input type="password" />
      </label>
      <p>
        Already have an account?<Link to="/login">Login</Link>
      </p>
      <button type="submit">Create Note</button>
    </div>
  );
}
