import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Login, Signup } from "./pages/Auth";
import { AdminDashboard, AdminStoreAssignment, AdminUsers } from "./pages/Admin";
import { Account, StoreList } from "./pages/Member";
import OwnerDashboard from "./pages/Owner";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/stores" element={<AdminStoreAssignment />} />
          </Route>
          <Route element={<ProtectedRoute roles={["NORMAL_USER"]} />}>
            <Route path="/stores" element={<StoreList />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route element={<ProtectedRoute roles={["STORE_OWNER"]} />}>
            <Route path="/owner" element={<OwnerDashboard />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
