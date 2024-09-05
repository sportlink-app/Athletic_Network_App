import { create } from "zustand";

// Minimum bio word count validation
const bioMinWords = 10;
// Phone number validation regex
const telRegex = /^0\d{8,}$/;
// Email validation regex

const userInfoStore = create((set, get) => ({
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
    gender: "male",
    bio: "",
    sports: [],
    city: "",
    tel: "",
  },
  isLoading: false,

  isFormComplete: () => {
    const { bio, tel, sports, city } = get().updateForm;
    const bioValid = bio.split(/\s+/).length >= bioMinWords; // Check for minimum word count
    const telValid = telRegex.test(tel);
    const sportsValid = sports.length > 0; // Ensure sports is not empty
    const cityValid = city.trim() !== ""; // Ensure city is not empty

    return bioValid && telValid && sportsValid && cityValid;
  },

  updateValidationErrors: () => {
    const { bio, tel, sports, city } = get().updateForm;

    const errors = {
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
    console.log(get().updateForm);
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

export default userInfoStore;
