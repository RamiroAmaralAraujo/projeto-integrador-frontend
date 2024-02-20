import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export function UnauthenticatedLayout() {

  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="h-full w-full min-h-screen bg-brand-green-light">
      <Outlet />
    </div>
  )
}
