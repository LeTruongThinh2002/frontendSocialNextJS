"use client";
import { createContext, useEffect } from "react";
import { fetchUserProfileAction, logoutAction } from "@/redux/auth/auth.action";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

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
  fetchUserProfile: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Access the user from the Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  // Action to fetch the user profile
  const fetchUserProfile = () => {
    dispatch(fetchUserProfileAction());
  };

  // Action to log out
  const logout = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    fetchUserProfile();

    // Fetch user profile every 5 minutes
    const interval = setInterval(() => {
      fetchUserProfile();
    }, 40 * 60 * 1000); // 40 minutes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUserProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};
