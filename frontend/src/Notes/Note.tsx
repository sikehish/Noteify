import React, { useRef, useState } from "react";
import { useAuthContext } from "../Hooks/AuthContext";
import { useNoteContext } from "../Hooks/NoteContext";

function Note({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) {
  const { state } = useAuthContext();
  const notesObj = useNoteContext();
  const [titl, setTitle] = useState<string>(title);
  const [desc, setDescription] = useState<string>(description);
  const [error, setError] = useState(false);
  const deleteNote: React.FormEventHandler = async (e) => {
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

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = async (event) => {
    const pload = {
      title: titl == "" ? "Untitled" : titl,
      description: desc,
    };

    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state?.user?.token}`,
      },
      body: JSON.stringify(pload),
    });
    const json = await res.json();
    notesObj.dispatch({
      type: "EDIT",
      payload: { ...pload, _id: id },
    });
  };

  return (
    <div onBlur={handleBlur}>
      <h3
        contentEditable={true}
        onInput={(e) => {
          console.log("Text inside div", e.currentTarget.textContent);
          const temp = e.currentTarget.textContent;
          setTitle(e.currentTarget.textContent!);
          if (!temp) {
            setError(true);
          } else setError(false);
        }}
        suppressContentEditableWarning={true}
      >
        {title}
      </h3>
      {error && (
        <div style={{ color: "red", margin: "10px", fontWeight: "900" }}>
          Title incomplete!
        </div>
      )}
      <h4
        contentEditable={true}
        onInput={(e) => {
          console.log("Text inside div", e.currentTarget.textContent);
          setDescription(e.currentTarget.textContent!);
        }}
        suppressContentEditableWarning={true}
      >
        {description}
      </h4>
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
}

export default Note;
