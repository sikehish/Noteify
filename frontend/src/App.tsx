import { useState } from "react";
import CreateNote from "./Notes/CreateNote";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import { Signup } from "./Auth/Signup";
import { Login } from "./Auth/Login";
import Notes from "./Notes/Notes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
