"use client";

// context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { fetchUser, logout as apiLogout } from "../services/auth";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verify_at: string;
  date_of_birth: string;
  country: string;
  created_at: string;
  updated_at: string;
  // other user properties
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser();
      if (userData) {
        setUser(userData);
      }
    };

    getUser();

    const interval = setInterval(() => {
      getUser();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
