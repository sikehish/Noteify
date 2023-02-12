import React, { useRef, useState } from "react";
import { useAuthContext } from "../Hooks/AuthContext";
import { useNoteContext } from "../Hooks/NoteContext";

document.execCommand("defaultParagraphSeparator", false, "br");

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
  // const textareaEl = useRef<HTMLDivElement>(null);
  const handleBlur: React.FocusEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    const pload = {
      title: titl == "" ? "Untitled" : titl,
      description: desc,
    };

    console.log(desc);
    notesObj.dispatch({
      type: "EDIT",
      payload: { ...pload, _id: id },
    });

    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state?.user?.token}`,
      },
      body: JSON.stringify(pload),
    });
    const json = await res.json();
  };

  return (
    <div
      style={{
        whiteSpace: "pre-line",
      }}
      onBlur={handleBlur}
      className="h-full min-w-[65%] p-2 m-2 mr-0 ml-0  border-[2px]"
    >
      <h3
        contentEditable={true}
        onInput={(e) => {
          console.log("Text inside div", e.currentTarget.innerText);
          const temp = e.currentTarget.innerText;
          setTitle(e.currentTarget.innerText!);
        }}
        style={{
          whiteSpace: "pre-line",
        }}
        className="font-bold p-2 m-2 text-lg"
        suppressContentEditableWarning={true}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            window.getSelection()!.removeAllRanges();
            var div = document.getElementById("contenteditablediv");
            setTimeout(function () {
              div!.focus();
            }, 0);
          }
        }}
      >
        {title}
      </h3>
      {error && (
        <div style={{ color: "red", margin: "10px", fontWeight: "900" }}>
          Title incomplete!
        </div>
      )}
      <h4
        id="contenteditablediv"
        contentEditable="plaintext-only"
        onInput={(e) => {
          console.log("Text inside div", e.currentTarget.innerText);
          setDescription(e.currentTarget.innerText!);
        }}
        // autoFocus
        //  onFocus={e => e.currentTarget.select()}
        suppressContentEditableWarning={true}
        className="text-sm p-2 m-2"
      >
        {description}
      </h4>
      {/* <button onClick={deleteNote}>Delete</button> */}
    </div>
  );
}

export default Note;
