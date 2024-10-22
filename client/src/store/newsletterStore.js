import { create } from "zustand";
import axios from "axios";

// Regex pattern for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const newsletterStore = create((set, get) => ({
  email: "",
  emailError: "", // State to store email error message

  // Update email in store
  setEmail: (email) => {
    set({ email });
    // Validate email whenever it's updated
    if (!emailRegex.test(email) && email.length > 0) {
      set({ emailError: "Invalid email format." });
    } else {
      set({ emailError: "" });
    }
  },

  // Validate email
  isEmailValid: () => {
    const { email } = get();
    return emailRegex.test(email);
  },

  // Handle subscription
  subscribe: async () => {
    const { email, isEmailValid } = get();

    // Validate email before subscribing
    if (!isEmailValid()) {
      throw new Error("Invalid email format.");
    }

    try {
      const response = await axios.post(
        "/subscribe", // Adjust your API endpoint
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("Email is already subscribed!");
      } else {
        throw new Error("Subscription failed, please try again.");
      }
    }
  },
}));

export default newsletterStore;
