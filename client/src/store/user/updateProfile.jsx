import { create } from "zustand";
import userInfoStore from "./userInfoStore";
import axios from "axios";
import authStore from "./authStore";

// Regex patterns for validation
const usernameRegex = /^[a-zA-Z0-9_]{6,16}$/; // 6 to 16 alphanumeric characters or underscores
const bioMinWords = 10; // Minimum number of words for bio
const telRegex = /^0\d{8,}$/; // Starts with 0 and at least 8 digits

const updateProfileStore = create((set, get) => {
  // Subscribe to changes in userInfoStore
  userInfoStore.subscribe((newState) => {
    set({
      editForm: {
        username: newState.username,
        gender: newState.gender,
        bio: newState.bio,
        sports: newState.sports,
        city: newState.city,
        tel: newState.tel,
      },
    });
  });

  return {
    dataError: false,
    editForm: {
      username: userInfoStore.getState().username,
      gender: userInfoStore.getState().gender,
      bio: userInfoStore.getState().bio,
      sports: userInfoStore.getState().sports,
      city: userInfoStore.getState().city,
      tel: userInfoStore.getState().tel,
    },

    // Check if the form is complete and valid
    isFormComplete: () => {
      const { username, bio, tel, sports, city } = get().editForm;
      const usernameValid = usernameRegex.test(username);
      const bioValid = bio.split(/\s+/).length >= bioMinWords; // Check for minimum word count
      const telValid = telRegex.test(tel);
      const sportsValid = sports.length > 0; // Ensure sports is not empty
      const cityValid = city.trim() !== ""; // Ensure city is not empty

      return usernameValid && bioValid && telValid && sportsValid && cityValid;
    },

    // Return validation error messages for each field
    updateValidationErrors: () => {
      const { username, bio, tel, sports, city } = get().editForm;

      const errors = {
        username: username
          ? usernameRegex.test(username)
            ? ""
            : "Username must be 6 to 16 characters long."
          : "",
        bio: bio
          ? bio.split(/\s+/).length >= bioMinWords
            ? ""
            : `Bio must be at least ${bioMinWords} words long.`
          : "",
        tel: tel
          ? telRegex.test(tel)
            ? ""
            : "Phone number must start with 0 and contain at least 8 digits."
          : "",
        sports: sports.length > 0 ? "" : "Please select at least one sport.",
        city: city.trim() !== "" ? "" : "City field cannot be empty.",
      };

      return errors;
    },

    // Handle form field updates
    handleUpdateFieldChange: (e) => {
      const { value, name } = e.target;
      set((state) => ({
        editForm: {
          ...state.editForm,
          [name]: value,
        },
      }));
    },

    // Handle sports field updates
    handleSportsChange: (selectedSports) => {
      set((state) => ({
        editForm: {
          ...state.editForm,
          sports: selectedSports,
        },
      }));
    },

    updateProfile: async () => {
      try {
        const { username, gender, bio, sports, city, tel } = get().editForm;
        const response = await axios.put(
          "/profile",
          { username, gender, bio, sports, city, tel },
          {
            headers: {
              Authorization: `Bearer ${authStore.getState().token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Update the userInfoStore after a successful update
        userInfoStore.setState({
          username,
          gender,
          bio,
          sports,
          city,
          tel,
        });

        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          throw new Error("Username already exists");
        } else {
          throw new Error(
            "An unexpected error occurred, please try again later"
          );
        }
      }
    },
  };
});

export default updateProfileStore;
