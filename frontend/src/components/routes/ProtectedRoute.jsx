import { Navigate } from "react-router-dom";
import { hasStoredSession } from "./authSession";

const ProtectedRoute = ({ children }) => {
  if (!hasStoredSession()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
