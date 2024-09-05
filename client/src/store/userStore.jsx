import { create } from "zustand";

// Regex patterns for validation
const usernameRegex = /^[a-zA-Z0-9_]{6,16}$/; // 6 to 16 alphanumeric characters or underscores
const bioMinWords = 10; // Minimum number of words for bio
const telRegex = /^0\d{8,}$/; // Starts with 0 and at least 8 digits

const UserStore = create((set, get) => ({
  dataError: false,
  isLoading: false,
  username: "seifeddine",
  gender: "male",
  isAvailable: true,
  bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium beatae maxime et nihil est, illo quis. Hic itaque eius molestias.",
  sports: [
    "football",
    "basketball",
    "tennis",
    "volleyball",
    "sport5",
    "sport6",
    "sport7",
    "sport8",
    "sport9",
    "sport10",
  ],
  email: "seifeddine.aaza@gmail.com",
  city: "casablanca",
  tel: "0728365287",
  updateForm: {
    username: "seifeddine",
    gender: "male",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium beatae maxime et nihil est, illo quis. Hic itaque eius molestias.",
    email: "seifeddine.aaza@gmail.com",
    sports: [
      "football",
      "basketball",
      "tennis",
      "volleyball",
      "sport5",
      "sport6",
      "sport7",
      "sport8",
      "sport9",
      "sport10",
    ],
    city: "casablanca",
    tel: "0728365287",
  },
  setAvailability: () => set((state) => ({ isAvailable: !state.isAvailable })),

  isFormComplete: () => {
    const { username, bio, tel, sports, city } = get().updateForm;
    const usernameValid = usernameRegex.test(username);
    const bioValid = bio.split(/\s+/).length >= bioMinWords; // Check for minimum word count
    const telValid = telRegex.test(tel);
    const sportsValid = sports.length > 0; // Ensure sports is not empty
    const cityValid = city.trim() !== ""; // Ensure city is not empty

    return usernameValid && bioValid && telValid && sportsValid && cityValid;
  },

  updateValidationErrors: () => {
    const { username, bio, tel, sports, city } = get().updateForm;

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

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value,
      },
    }));
  },

  handleSportsChange: (selectedSports) => {
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        sports: selectedSports,
      },
    }));
  },
}));

export default UserStore;
