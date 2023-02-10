import CreateNote from "./CreateNote";
import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../Hooks/AuthContext";
import { useNoteContext } from "../Hooks/NoteContext";

function Notes() {
  const { state } = useAuthContext();
  const notesObj = useNoteContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log("STATE 1:", notesObj.state);
        if (data !== null) notesObj.dispatch({ type: "SET", payload: data });
        console.log("STATE 2:", notesObj.state);
      }
    };

    fetchData();
    // return ()=>{}
  }, []);
  return (
    <div>
      <>
        <div>Notes</div>
        <CreateNote />
        {notesObj.state?.length > 0 && <h1>Elements:</h1>}
        {notesObj.state?.length > 0 ? (
          notesObj.state.map((el) => (
            <React.Fragment key={el._id}>
              <h3>{el.title}</h3>
              <h4>{el.description}</h4>
            </React.Fragment>
          ))
        ) : (
          <h1>No elements found</h1>
        )}
      </>
    </div>
  );
}
export default Notes;
