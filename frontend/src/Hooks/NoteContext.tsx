import { createContext, useReducer, useContext } from "react";

const NoteContext = createContext();

export const useNoteContext = () => {
  const val = useContext(NoteContext);
  return val;
};

const reducer = (state, action) => {
  if (action.type === "SET") {
    return { title: action.payload, description: action.description };
  } else if (action.type === "DELETE") {
    return { title: null, description: null };
  } else return state;
};

export const NoteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    title: null,
    description: null,
  });

  return (
    <NoteContext.Provider value={{ dispatch, state }}>
      {children}
    </NoteContext.Provider>
  );
};
