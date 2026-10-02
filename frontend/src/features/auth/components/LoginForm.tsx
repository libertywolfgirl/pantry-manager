import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import styles from "../../../styles/LoginForm.module.css";

const LoginForm = () => {
  const navigate = useNavigate();
  
  const { login } = useAuth() as {
    login: (
      username: string,
      password: string,
    ) => Promise<{ success: boolean; message: string }>;
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(username, password);

    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
    } else {
      console.log("Logged in successfully!");
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      navigate("/");
    }
  };

  return (
    <div className={styles["login-form"]}>
      <h2 style={{ color: '#f3f4f6'}}>Login</h2>
      {error && <p className="errors">{error}</p>}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div className={styles["button-wrapper"]}>
          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
