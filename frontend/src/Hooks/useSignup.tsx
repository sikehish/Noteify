import { useState } from "react";
import { useAuthContext } from "./AuthContext";

export default function useSignup() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSucc, setIsSucc] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, cpassword: string) => {
    setIsSucc(false);
    setIsLoading(true);
    setError(false);

    const res = await fetch("http://localhost:3000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // mode: "no-cors",
        // "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: JSON.stringify({ email, password, cpassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.err, res);
      setIsLoading(false);
      setIsSucc(false);
      //Some error -  refer to userController to see what error was thrown and most imp-the err property name
      setError(data.err);
    } else if (res.ok) {
      dispatch({ type: "SIGNUP" });
      // localStorage.setItem("user", JSON.stringify(data));
      setIsSucc(true);
      setIsLoading(false);
      setError(false);
    }
  };

  // console.log(error);
  return { signup, error, isLoading, isSucc };
}
