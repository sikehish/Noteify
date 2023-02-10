import { useState } from "react";
import { useAuthContext } from "../Hooks/AuthContext";
import { useNoteContext } from "../Hooks/NoteContext";

export default () => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [error, setError] = useState(false);
  const { state } = useAuthContext();
  const notesObj = useNoteContext();

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
          body: JSON.stringify({ title, description }),
        });
        const data = await res.json();
        notesObj.dispatch({ type: "CREATE", payload: data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Note</h3>
      <label>
        <h5>Title:</h5>
        <textarea
          name=""
          id=""
          cols={30}
          rows={1}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </label>
      <label>
        <h5>Description:</h5>
        <textarea
          name=""
          id=""
          cols={50}
          rows={10}
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Create</button>
      {error && (
        <div style={{ color: "red", margin: "10px", fontWeight: "900" }}>
          Title incomplete!
        </div>
      )}
    </form>
  );
};
