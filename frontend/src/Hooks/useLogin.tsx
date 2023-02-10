import { useState } from "react";
import { useAuthContext } from "./AuthContext";

function useLogin() {
  const [error, setError] = useState(false);
  const [isSucc, setIsSucc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsSucc(false);
    setIsLoading(true);
    setError(false);

    const res = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.err, res);
      setIsLoading(false);
      setIsSucc(false);
      setError(data.err);
    } else if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });

      setError(false);
      setIsLoading(false);
      setIsSucc(true);
    }
  };

  return { login, error, isLoading, isSucc };
}

export default useLogin;
