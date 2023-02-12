import React, { EventHandler, FormEventHandler, useState } from "react";
import { useAuthContext } from "../Hooks/AuthContext";
import { useNoteContext } from "../Hooks/NoteContext";
import { BsPinAngleFill, BsPinAngle } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

import Note from "./Note";

export default function NoteModalButton({
  title,
  description,
  id,
  pin: el,
}: {
  title: string;
  description: string;
  id: string;
  pin: boolean;
}) {
  const notesObj = useNoteContext();
  const [showModal, setShowModal] = useState(false);
  const [pin, setPin] = useState(el);
  const { state } = useAuthContext();
  const deleteNote: FormEventHandler = async (e) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state?.user?.token}`,
      },
    });
    const data = await res.json();

    notesObj.dispatch({ type: "DELETE", payload: { _id: id } });
  };

  const handleClick: React.MouseEventHandler = async (e) => {
    // e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state?.user?.token}`,
      },
      body: JSON.stringify({ pinned: !pin }),
    });
    const data = await res.json();
    setPin(!pin);
    notesObj.dispatch({ type: "PINNED", payload: { _id: id } });
  };

  return (
    <>
      <button className="text-gray-800" onClick={handleClick}>
        {!pin ? <BsPinAngle title="Pin" /> : <BsPinAngleFill title="Unpin" />}
      </button>
      <div
        className="flex-row justify-center items-center bg-gray-600 text-white hover:bg-gray-800 active:bg-gray-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        //   type="button"
      >
        <button onClick={() => setShowModal(true)}>{title}</button>
        <button
          className="ml-5 text-red-400 hover:text-red-600"
          onClick={(e) => deleteNote(e)}
        >
          <FaTrashAlt />
        </button>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            // onBlur={(e) => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative p-5 flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <Note
                  description={description as string}
                  title={title as string}
                  id={id as string}
                />
                {/*body*/}
                {/*footer*/}
                <div className="flex items-center justify-center p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
