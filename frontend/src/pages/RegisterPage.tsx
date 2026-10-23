import RegisterForm from "../features/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <main>
      <h1>Ready to join us?</h1>
      <RegisterForm />
      <p>Already have an account? <a href="/login">Login here</a></p>
    </main>
  );
};

export default RegisterPage;
