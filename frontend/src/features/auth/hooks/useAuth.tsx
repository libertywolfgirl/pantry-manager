import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import client from "../../../api/client";
import type {
  AuthContextValueType,
  AuthUserType,
} from "../../../types/authTypes";

const AuthContext = createContext<AuthContextValueType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (access) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({
        access,
        username: localStorage.getItem("username") ?? undefined,
      });
    }

    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await client.post<{ access: string }>("/auth/login/", {
        username,
        password,
      });

      const { access } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("username", username);
      setUser({ access, username });
      return { success: true, message: "Login successful" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, , @typescript-eslint/no-unsafe-member-access
          message: error.response?.data?.detail ?? "Invalid credentials",
        };
      }

      return {
        success: false,
        message: "Invalid credentials",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValueType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
