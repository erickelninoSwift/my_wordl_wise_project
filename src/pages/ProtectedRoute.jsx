import React, { useEffect } from "react";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigation = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) navigation("/", { replace: true });
  }, [isAuthenticated, navigation]);

  return isAuthenticated ? children : null;
}
