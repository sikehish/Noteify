import { createContext, useReducer, useContext } from "react";

const AuthContext = createContext({} as auth);

interface st {
  user: { email: string; token: string } | null;
}

interface auth {
  state: st | null;
  dispatch: Function;
}

export const useAuthContext = (): auth => {
  const val: auth = useContext(AuthContext);
  //Need to throw error if value is being acesed outside the context defined
  return val;
};

const reducer = (
  state: st,
  action: { type: string; payload: { email: string; token: string } | null }
) => {
  if (action.type === "SIGNUP") {
    return { user: null }; //NOT IMPLEMENTING AUTO REGISTRATION ON SIGNUP
  } else if (action.type === "LOGIN") {
    return { user: action.payload };
  } else if (action.type === "LOGOUT") {
    return { user: null };
  } else return state;
};

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch]: [user: st, dispatch: Function] = useReducer(
    reducer,
    {
      user: JSON.parse(localStorage.getItem("user") as string) || null,
    }
  );

  return (
    <AuthContext.Provider value={{ dispatch, state }}>
      {children}
    </AuthContext.Provider>
  );
};
