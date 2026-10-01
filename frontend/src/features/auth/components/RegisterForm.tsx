import { useState } from "react";
import axios from "axios";
import styles from "../../../styles/RegisterForm.module.css";

type Errors = {
  username?: string[];
  email?: string[];
  password?: string[];
  confirm_password?: string[];
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const { username, email, password, confirm_password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    if (formData.password !== formData.confirm_password) {
      setErrors({confirm_password: ["Passwords don't match."]});
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/register/",
        formData,
      );
      if (res.status === 201) {
        setMessage("Registration successful! You can now log in.");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.status);
        console.log(err.response?.data);
        setErrors(err.response?.data);
      } else {
        console.error("An unexpected error occurred:", err);
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles["register-form"]}>
      <h2 style={{ color: "#f3f4f6" }}>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit}>
        <div className={styles["form-group"]}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
          {errors.username && (
            <span className="errors">{errors.username[0]}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
          {errors.email && (
            <span className="errors">{errors.email[0]}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          {errors.password && (
            <span className="errors">{errors.password[0]}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={onChange}
            required
          />
          {errors.confirm_password && (
            <span className="errors">{errors.confirm_password[0]}</span>
          )}
        </div>
        <button type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
