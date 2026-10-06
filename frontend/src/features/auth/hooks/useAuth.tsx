import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";

interface AuthUser {
  access: string;
};

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (access) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ access });
    }

    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<{ access: string }>(
        "http://localhost:8000/auth/login/",
        {
          username,
          password,
        },
      );

      const { access } = response.data;

      localStorage.setItem("access", access);
      setUser({ access });
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
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
