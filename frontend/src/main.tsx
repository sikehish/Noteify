import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./Hooks/AuthContext";
import { NoteContextProvider } from "./Hooks/NoteContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthContextProvider>
    <NoteContextProvider>
      <App />
    </NoteContextProvider>
  </AuthContextProvider>
);
