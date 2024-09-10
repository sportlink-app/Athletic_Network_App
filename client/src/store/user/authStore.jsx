import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

// Regex patterns for validation
const usernameRegex = /^[a-zA-Z0-9_]{6,16}$/; // 6 to 16 alphanumeric characters or underscores
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 uppercase, 1 number

const authStore = create((set, get) => ({
  isAuthenticated: Cookies.get("token") || null,
  setAuthState: (isAuthenticated) => {
    set({ isAuthenticated });
  },
  isProfileCompleted: Cookies.get("isProfileCompleted") || null,
  setProfileCompletedState: (isProfileCompleted) => {
    set({ isProfileCompleted });
  },

  dataError: false,

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

  signUp: async () => {
    try {
      const { username, email, password } = get().signUpForm;
      const response = await axios.post(
        "https://sportlink-z9gy.onrender.com/signup",
        { username, email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Set authentication state
      set({ isAuthenticated: true });

      // Store token and isProfileCompleted in cookies
      Cookies.set("token", response.data.token, { expires: 7 });
      Cookies.set("isProfileCompleted", response.data.isProfileCompleted, {
        expires: 7,
      });

      return response.data; // Return the data if needed
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("Username or email already exists!");
      } else if (error.response && error.response.status === 500) {
        throw new Error("Sign up failed, please try again");
      } else {
        throw new Error("An unexpected error occurred, please try again later");
      }
    } finally {
      set({
        signUpForm: {
          username: "",
          email: "",
          password: "",
        },
      });
    }
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

  login: async () => {
    try {
      const { email, password } = get().signInForm;
      const response = await axios.post(
        "https://sportlink-z9gy.onrender.com/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Set authentication state
      set({ isAuthenticated: true });
      Cookies.set("token", response.data.token, { expires: 7 });
      Cookies.set("isProfileCompleted", response.data.isProfileCompleted, {
        expires: 7,
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Email or password is incorrect");
      } else if (error.response && error.response.status === 500) {
        throw new Error("Login failed, please try again");
      } else {
        throw new Error("An unexpected error occurred, please try again later");
      }
    } finally {
      set({
        signInForm: {
          email: "",
          password: "",
        },
      });
    }
  },
}));

export default authStore;
