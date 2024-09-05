import { create } from "zustand";

// Regex patterns for validation
const usernameRegex = /^[a-zA-Z0-9_]{6,16}$/; // 6 to 16 alphanumeric characters or underscores
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 uppercase, 1 number

const authStore = create((set, get) => ({
  isAuthenticated: true,
  isProfileCompleted: true,
  dataError: false,
  isLoading: false,
  signUpForm: {
    username: "",
    email: "",
    password: "",
  },

  handleSignUpForm: (e) => {
    const { value, name } = e.target;
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        [name]: value,
      },
    }));
    console.log(get().signUpForm);
  },

  isSignUpFormComplete: () => {
    const { username, email, password } = get().signUpForm;
    const usernameValid = usernameRegex.test(username);
    const emailValid = emailRegex.test(email);
    const passwordValid = passwordRegex.test(password);
    return usernameValid && emailValid && passwordValid;
  },

  signUpValidationErrors: () => {
    const { username, email, password } = get().signUpForm;

    const errors = {
      username: username
        ? usernameRegex.test(username)
          ? ""
          : "Username must be 6 to 16 characters long."
        : "",
      email: email
        ? emailRegex.test(email)
          ? ""
          : "Invalid email format."
        : "",
      password: password
        ? passwordRegex.test(password)
          ? ""
          : "Password must be at least 8 characters long, with at least one uppercase letter and one number."
        : "",
    };

    return errors;
  },

  signInForm: {
    email: "",
    password: "",
  },

  handleSignInForm: (e) => {
    const { value, name } = e.target;
    set((state) => ({
      signInForm: {
        ...state.signInForm,
        [name]: value,
      },
    }));
    console.log(get().signInForm);
  },

  isSignInFormComplete: () => {
    const { email, password } = get().signInForm;
    return email !== "" && password !== "";
  },
}));

export default authStore;
