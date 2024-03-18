import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { userLoginStatus } = useAuthContext();

  if (userLoginStatus === "login비완료") {
    return <Navigate to="/" replace />;
  } else if (userLoginStatus === "네트워크 통신중") {
    return <div>loading</div>;
  }

  return children;
}
