"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { getMe } from "@/data/get-me";

type UserContextType = {
  token: string;
  UserLogin: {
    id: string;
    name: string;
    cpf: string;
    role: string;
  };
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserContextType | null;
  setUser: (user: UserContextType | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContextType | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const loadUser = async () => {
      const token = getCookie("token") as string;

      if (token) {
        try {
          const userData = await getMe(token);
          if (userData) {
            // console.log(userData);
            setUser({ token, UserLogin: userData });
            setLoading(false);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
