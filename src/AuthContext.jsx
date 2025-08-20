import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signup = async (username) => {
    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setToken(data.token);
      setLocation("TABLET");
    } catch (error) {
      console.error(error);
    }
  };
  // TODO: authenticate
  const authenticate = async () => {
    if (!token) {
      throw Error("No token");
    }
    try {
      const response = await fetch(`${API}/authenticate`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setToken(data.token);
      setLocation("Tunnel");
    } catch (error) {
      console.error(error);
    }
  };
  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
