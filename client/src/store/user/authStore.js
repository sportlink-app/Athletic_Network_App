import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import notificationStore from "../notificationStore"; // Import the notification store

// Regex patterns for validation
const usernameRegex = /^[a-zA-Z0-9_]{6,16}$/; // 6 to 16 alphanumeric characters or underscores
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 uppercase, 1 number

const authStore = create((set, get) => {
  // Utility function to check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true; // If no token, it is expired
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 < Date.now(); // Convert to milliseconds
  };

  return {
    token: Cookies.get("token") || null,

    isAuthenticated: Cookies.get("token")
      ? !isTokenExpired(Cookies.get("token")) // Use the isTokenExpired function
      : false,

    isProfileCompleted: Cookies.get("token")
      ? jwtDecode(Cookies.get("token")).isProfileCompleted
      : false,

    authenticatedUsername: Cookies.get("token")
      ? jwtDecode(Cookies.get("token")).username
      : false,

    authenticatedId: Cookies.get("token")
      ? jwtDecode(Cookies.get("token")).id
      : false,

    // Set authentication state
    setAuthState: (isAuthenticated) => {
      set({ isAuthenticated });
    },

    // Set profile completion state
    setProfileCompletedState: (isProfileCompleted) => {
      set({ isProfileCompleted });
    },

    dataError: false,

    signUpForm: {
      username: "",
      email: "",
      password: "",
    },

    // Handle form change
    handleSignUpForm: (e) => {
      const { value, name } = e.target;
      set((state) => ({
        signUpForm: {
          ...state.signUpForm,
          [name]: value,
        },
      }));
    },

    // Check if the form is complete
    isSignUpFormComplete: () => {
      const { username, email, password } = get().signUpForm;
      const usernameValid = usernameRegex.test(username);
      const emailValid = emailRegex.test(email);
      const passwordValid = passwordRegex.test(password);
      return usernameValid && emailValid && passwordValid;
    },

    // Validate sign-up form errors
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

    // Handle sign-up process
    signUp: async () => {
      try {
        const { username, email, password } = get().signUpForm;
        const response = await axios.post(
          "/signup",
          { username, email, password },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        set({
          token: response.data.token,
          authenticatedUsername: response.data.username,
          authenticatedId: jwtDecode(response.data.token).id,
        });

        // Set cookie to expire in 1 year
        Cookies.set("token", response.data.token, { expires: 365 }); // 1 year

        set({ isAuthenticated: true });
        const decodedToken = jwtDecode(response.data.token);
        set({ isProfileCompleted: decodedToken.isProfileCompleted });

        // Update unread notifications count after sign up
        await notificationStore.getState().getUnreadCount(); // Ensure notification count is updated

        set({
          signUpForm: {
            username: "",
            email: "",
            password: "",
          },
        });

        return response.data;
      } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 400) {
          throw new Error("Username or email already exists!");
        } else if (error.response && error.response.status === 500) {
          throw new Error("Sign up failed, please try again");
        } else {
          throw new Error(
            "An unexpected error occurred, please refresh the page or try again later"
          );
        }
      }
    },

    // Sign-in form and handling
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
    },

    isSignInFormComplete: () => {
      const { email, password } = get().signInForm;
      return email !== "" && password !== "";
    },

    // Handle login process
    login: async () => {
      try {
        const { email, password } = get().signInForm;
        const response = await axios.post(
          "/login",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        set({
          token: response.data.token,
          authenticatedId: jwtDecode(response.data.token).id, // Ensure authenticatedId is set
        });

        Cookies.set("token", response.data.token, { expires: 365 }); // 1 year
        set({ isAuthenticated: true });

        // Update unread notifications count after login
        await notificationStore.getState().getUnreadCount(); // Ensure notification count is updated

        set({
          signInForm: {
            email: "",
            password: "",
          },
        });

        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          throw new Error("Email or password is incorrect");
        } else if (error.response && error.response.status === 500) {
          throw new Error("Login failed, please try again");
        } else {
          throw new Error(
            "An unexpected error occurred, please refresh the page or try again later"
          );
        }
      }
    },
  };
});
export default authStore;
