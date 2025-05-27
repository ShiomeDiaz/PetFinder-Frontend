// src/components/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/userEmail", { withCredentials: true })
      .then(res => {
        const email = res.data.email || res.data;
        localStorage.setItem("userEmail", email);
        setUserEmail(email);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("userEmail");
        setIsAuthenticated(false);
        setUserEmail(null);
        setLoading(false);
      });
  }, []);

  const login = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail(null);
    fetch("http://localhost:8080/api/users/logout", {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      window.location.href = "/login";
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
