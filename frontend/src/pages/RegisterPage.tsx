import RegisterForm from "../features/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <main>
      <h1>Ready to join us?</h1>
      <p>
        Register to keep track of your pantry ingredients and recipes. Quickly
        discover which ingredients you are missing for a particular recipe!
      </p>
      <RegisterForm />
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </main>
  );
};

export default RegisterPage;
