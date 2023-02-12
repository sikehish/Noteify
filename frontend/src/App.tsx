import { useState } from "react";
import CreateNote from "./Notes/CreateNote";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import { Signup } from "./Auth/Signup";
import Login from "./Auth/Login";
import Notes from "./Notes/Notes";
import { useAuthContext } from "./Hooks/AuthContext";
import Footer from "./Footer";

function App() {
  const { state } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes"
            element={state?.user ? <Notes /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!state?.user ? <Signup /> : <Navigate to="/notes" />}
          />
          <Route
            path="/login"
            element={!state?.user ? <Login /> : <Navigate to="/notes" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
