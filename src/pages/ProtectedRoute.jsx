import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  if (user.status === "login비완료") {
    return <Navigate to="/" replace />;
  } else if (user.status === "네트워크 통신중") {
    return <div>loding</div>;
  }

  return children;
}
