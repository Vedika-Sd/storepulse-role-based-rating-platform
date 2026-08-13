import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types";
type AuthContextValue = { user: User | null; token: string | null; login: (token: string, user: User) => void; logout: () => void };
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USER_KEY = "storepulse_user";
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => { const saved = localStorage.getItem(USER_KEY); return saved ? JSON.parse(saved) as User : null; });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("storepulse_token"));
  const login = (nextToken: string, nextUser: User) => { localStorage.setItem("storepulse_token", nextToken); localStorage.setItem(USER_KEY, JSON.stringify(nextUser)); setToken(nextToken); setUser(nextUser); };
  const logout = () => { localStorage.removeItem("storepulse_token"); localStorage.removeItem(USER_KEY); setToken(null); setUser(null); };
  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error("useAuth must be used inside AuthProvider"); return value; }
