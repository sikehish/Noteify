import CreateNote from "./CreateNote";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../Hooks/AuthContext";
import { useNoteContext } from "../Hooks/NoteContext";
import Note from "./Note";
import NoteModalButton from "./NoteModalButton";

function Notes() {
  const { state } = useAuthContext();
  const notesObj = useNoteContext();
  const [isLoading, setIsLoading] = useState<null | boolean>(null);

  // const deleteNote = async (e: FormEvent, id: string) => {
  //   const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${state?.user?.token}`,
  //     },
  //   });
  //   const data = await res.json();

  //   notesObj.dispatch({ type: "DELETE", payload: { _id: id } });
  // };

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
    <div className="mb-8 pt-8">
      <>
        {/* <h2 className="text-center text-3xl font-bold m-5">Notes</h2> */}
        <CreateNote />
        {/* {notesObj.state?.length > 0 && <h1>Elements:</h1>} */}
        <h2 className="block text-center font-bold m-5">Pinned</h2>
        <div className="grid grid-cols-3 mb6 justify-center	justify-items-center">
          {notesObj.state?.length > 0 &&
            notesObj.state.map(
              (el) =>
                el.pinned && (
                  <div
                    className="flex-col justify-center items-center text-center"
                    key={el._id! + Math.random().toString}
                  >
                    <NoteModalButton
                      description={el.description as string}
                      title={el.title as string}
                      id={el._id as string}
                      pin={el.pinned as boolean}
                    />
                    {/* <button
                  className="block text-red-700"
                  onClick={(e) => deleteNote(e, el._id!)}
                >
                  X
                </button> */}
                  </div>
                )
            )}
        </div>
        <h2 className="block text-center font-bold m-5">Others</h2>
        <div className="grid grid-cols-3  justify-center	justify-items-center">
          {notesObj.state?.length > 0 &&
            notesObj.state.map(
              (el) =>
                !el.pinned && (
                  <div
                    className="flex-col justify-center items-center text-center"
                    key={el._id! + Math.random().toString}
                  >
                    <NoteModalButton
                      description={el.description as string}
                      title={el.title as string}
                      id={el._id as string}
                      pin={el.pinned as boolean}
                    />
                  </div>
                )
            )}
        </div>
        {isLoading && <h2>Loading...</h2>}
        {isLoading == false && notesObj.state?.length == 0 && (
          <h1>No elements found</h1>
        )}
      </>
    </div>
  );
}
export default Notes;
