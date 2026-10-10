import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    verifyService()
      .then((response) => {
        setIsLoggedIn(true);
        setUser(response.data.user); // ⭐ usuario completo con favoritos
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
      });
  };

  const logInUser = (token) => {
    localStorage.setItem("authToken", token);
    authenticateUser();
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authenticateUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,        // ⭐ NECESARIO para favoritos
        isLoading,
        logInUser,
        logOutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
