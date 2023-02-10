import { createContext, useReducer, useContext } from "react";

const NoteContext = createContext({} as ContextType);

export const useNoteContext = () => {
  const val = useContext(NoteContext);
  return val;
};

interface obj {
  title?: string;
  description?: string;
  _id?: string;
}

interface act {
  type: string;
  payload?: any;
}

const reducer = (state: obj[], action: act): obj[] => {
  if (action.type === "CREATE") {
    const ele = {
      ...action.payload,
    };
    return [...state, ele];
  } else if (action.type === "SET") {
    return [...action.payload];
  } else if (action.type === "DELETE") {
    const ans = state.filter((el: obj) => {
      return el._id != action.payload?._id;
    });
    return ans;
  } else if (action.type === "EDIT") {
    const ans = state.find((el: obj) => {
      return (el._id = action.payload._id);
    });
    console.log(action, ans);
    ans!.title = action.payload.title;
    ans!.description = action.payload.description;
    return [...state];
  } else if (action.type === "DELETEALL") {
    return [];
  } else return state;
};

interface ContextType {
  state: obj[];
  dispatch: React.Dispatch<{ type: string; payload?: obj }>;
}

export const NoteContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(reducer, []);
  // const value:ContextType={ dispatch, state }

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};
