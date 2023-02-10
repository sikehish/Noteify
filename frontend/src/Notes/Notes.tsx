import CreateNote from "./CreateNote";
import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../Hooks/AuthContext";
import { useNoteContext } from "../Hooks/NoteContext";
import Note from "./Note";

function Notes() {
  const { state } = useAuthContext();
  const notesObj = useNoteContext();
  const [isLoading, setIsLoading] = useState<null | boolean>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchData();
    // return ()=>{}
  }, []);
  return (
    <div>
      <>
        <div>Notes</div>
        <CreateNote />
        {/* {notesObj.state?.length > 0 && <h1>Elements:</h1>} */}
        {notesObj.state?.length > 0 &&
          notesObj.state.map((el) => (
            <React.Fragment key={el._id}>
              <Note
                description={el.description as string}
                title={el.title as string}
                id={el._id as string}
              />
            </React.Fragment>
          ))}
        {isLoading && <h2>Loading...</h2>}
        {isLoading == false && notesObj.state?.length == 0 && (
          <h1>No elements found</h1>
        )}
      </>
    </div>
  );
}
export default Notes;
