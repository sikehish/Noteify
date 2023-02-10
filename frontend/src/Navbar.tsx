import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "./Hooks/AuthContext";
import { useNoteContext } from "./Hooks/NoteContext";
import useLogout from "./Hooks/useLogout";

function Navbar() {
  const { state } = useAuthContext();
  const notesObj = useNoteContext();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout: React.FormEventHandler = (e) => {
    e.preventDefault();
    logout();
    if (state?.user === null) navigate("/");
    notesObj.dispatch("DELETEALL");
  };

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="notes">Notes</NavLink>
      {!state?.user && <NavLink to="login">Login</NavLink>}
      {state?.user && (
        <div className="nav-logout">
          <h3>{state.user.email}</h3>
          <button onClick={handleLogout} className="mx-2 hover:font-extrabold">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
