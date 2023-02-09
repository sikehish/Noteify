import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="notes">Notes</NavLink>
      <NavLink to="login">Login</NavLink>
      <NavLink to="signup">Signup</NavLink>
    </nav>
  );
}

export default Navbar;
