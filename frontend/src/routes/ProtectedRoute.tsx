import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../types";
export default function ProtectedRoute({ roles }: { roles?: Role[] }) { const { user } = useAuth(); if (!user) return <Navigate to="/login" replace />; if (roles && !roles.includes(user.role)) return <Navigate to={`/${user.role === "ADMIN" ? "admin" : user.role === "STORE_OWNER" ? "owner" : "stores"}`} replace />; return <Outlet />; }
