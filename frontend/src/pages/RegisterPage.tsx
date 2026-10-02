import RegisterForm from "../features/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <h1>Ready to join us?</h1>
      <RegisterForm />
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default RegisterPage;
