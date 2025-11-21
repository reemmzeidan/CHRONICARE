import { Navigate } from "react-router-dom";

export default function RequireRole({ role, children }) {
  const userRole = localStorage.getItem("role");

  if (userRole !== role) return <Navigate to="/login" replace />;
  return children;
}
