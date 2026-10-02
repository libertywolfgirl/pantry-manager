import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";

interface AuthUser {
  token: string;
  [key: string]: unknown;
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
    const token = localStorage.getItem("token");

    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ token });
    }

    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<{ token: string; user_data?: AuthUser }>(
        "http://localhost:8000/auth/login/",
        {
          username,
          password,
        },
      );

      const { token, user_data } = response.data;
      const nextUser = user_data ? { ...user_data, token } : { token };

      localStorage.setItem("token", token);
      setUser(nextUser);
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
    localStorage.removeItem("token");
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
