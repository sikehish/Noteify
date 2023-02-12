import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "./Hooks/AuthContext";
import { useNoteContext } from "./Hooks/NoteContext";
import logo from "./assets/favicon_io/android-chrome-192x192.png";
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
    notesObj.dispatch({ type: "DELETEALL" });
  };

  return (
    <nav className="flex bg-gray-800 py-5 justify-between items-center align-middle">
      <div
        className="flex justify-start align-middle items-center ml-5"
        role="button"
        onClick={(e) => navigate("/home")}
      >
        <img
          src={logo}
          alt="Noteify Logo"
          className="text-white"
          style={{ filter: "invert(100%)", height: "30px", width: "30px" }}
        />
        <h3 className="text-white pl-3 ">noteify.</h3>
      </div>
      <div className="flex  mr-5 justify-end items-center align-middle">
        <NavLink
          className="mr-10 p-0 text-white hover:text-yellow-300 text-center"
          to="/"
        >
          Home
        </NavLink>
        {!state?.user && (
          <NavLink
            className="mr-10 text-white  hover:text-yellow-300"
            to="login"
          >
            Login
          </NavLink>
        )}

        {!state?.user && (
          <NavLink
            className="mr-10 text-white  hover:text-yellow-300"
            to="signup"
          >
            Sign Up
          </NavLink>
        )}
        {state?.user && (
          <>
            <NavLink
              className="mr-10 text-white  hover:text-yellow-300"
              to="notes"
            >
              Notes
            </NavLink>
            <div className="flex-col justify-content items-center justify-items-center-middle text-center">
              <h3 className="mr-10 text-white hover:text-yellow-300 text-center">
                {state.user.email}
              </h3>
              <button
                onClick={handleLogout}
                className="hover:font-extrabold text-white hover:text-yellow-300 text-center"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
