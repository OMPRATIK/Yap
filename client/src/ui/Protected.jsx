import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(
    function () {
      async function fetchAuth() {
        await checkAuth();
      }
      fetchAuth();
    },
    [checkAuth]
  );

  if (isCheckingAuth) {
    return <div className="skeleton flex-grow"></div>;
  }
  return authUser ? children : <Navigate to="/login" />;
}

export default Protected;
