import { FormEventHandler, useRef, useState } from "react";
import { useAuthContext } from "../Hooks/AuthContext";
import { useNoteContext } from "../Hooks/NoteContext";

import "./CreateNote.css";

export default () => {
  const [title, setTitle] = useState("");
  const [showDesc, setShowDesc] = useState(false);
  const [description, setDesc] = useState("");
  const [error, setError] = useState(false);
  const { state } = useAuthContext();
  const notesObj = useNoteContext();

  const textareaRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const handleChange: FormEventHandler = (e) => {
    textareaRef.current!.style.height = "auto";
    textareaRef.current!.style.height =
      textareaRef.current!.scrollHeight + "px";
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (!title) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${state?.user?.token}`,
          },
          body: JSON.stringify({
            title,
            description: description,
            pinned: false,
          }),
        });
        const data = await res.json();
        notesObj.dispatch({ type: "CREATE", payload: data });
        setTitle("");
        setDesc("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-col justify-center align-middle items-center m-10 border-[2px] px-3 py-0 border-black w-min ml-auto mr-auto bg-gray-800 rounded-md mb-14"
    >
      {/* <h3>Create Note</h3> */}
      <label className="">
        {/* <h5 className="text-center">Title:</h5> */}
        <textarea
          className="block ml-auto mr-auto border-[2px] bg-gray-800 font-bold mt-4 mb-6 px-2 textarea"
          name=""
          id=""
          cols={50}
          rows={1}
          value={title}
          placeholder="Note it down...."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onFocus={(e) => {
            setShowDesc(true);
            e.currentTarget.placeholder = "Title";
          }}
          onBlur={(e) => {
            // console.log("Values: ", e.target.value, description);
            if (e.target.value == "" && description == "") {
              setShowDesc(false);
              e.currentTarget.placeholder = "Note it down....";
            }
          }}
        ></textarea>
      </label>
      {showDesc && (
        <>
          {" "}
          <label>
            {/* <h5 className="text-center min-h-max">Description:</h5> */}
            <textarea
              name=""
              id=""
              cols={50}
              // rows={10}
              value={description}
              placeholder="Description"
              ref={textareaRef}
              onChange={(e) => {
                setDesc(e.target.value);
                handleChange(e);
              }}
              className="block w-full ml-auto mr-auto border-[2px] bg-gray-800 px-2 textarea"
            ></textarea>
          </label>
          <button
            className="block text-center border-[2px] ml-auto mr-auto bg-slate-300 hover:bg-white color:bg-gray-800 px-5 py-1 m-4"
            type="submit"
          >
            Create
          </button>
        </>
      )}
      {error && (
        <div
          className="text-center"
          style={{ color: "red", margin: "10px", fontWeight: "900" }}
        >
          Title incomplete!
        </div>
      )}
    </form>
  );
};
