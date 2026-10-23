import LoginForm from "../features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <main>
      <h1>Already have an account?</h1>
      <LoginForm />
      <p>No account? <a href="/register">Register here</a></p>
    </main>
  );
};

export default LoginPage;
