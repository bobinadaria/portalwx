"use client";

import { createContext, useContext, useState } from "react";
import { MOCK_USER, UserProfile } from "./user-portal-data";

interface UserPortalContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const UserPortalContext = createContext<UserPortalContextValue | null>(null);

export function UserPortalProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (_email: string) => {
    setUser(MOCK_USER);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserPortalContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </UserPortalContext.Provider>
  );
}

export function useUserPortal(): UserPortalContextValue {
  const ctx = useContext(UserPortalContext);
  if (!ctx) throw new Error("useUserPortal must be used inside UserPortalProvider");
  return ctx;
}
