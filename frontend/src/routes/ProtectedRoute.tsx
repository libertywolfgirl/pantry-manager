import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import Header from "../components/Header";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth() as { user: unknown; loading: boolean };
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ProtectedRoute;
