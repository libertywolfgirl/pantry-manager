import { useAuth } from "../features/auth/hooks/useAuth";

const DashboardPage = () => {
    const { logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
