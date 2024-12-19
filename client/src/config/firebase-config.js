import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAquTYgHoXOGt0E9u330rSsBofOgb1o69w",
  authDomain: "sportlink-ffa29.firebaseapp.com",
  projectId: "sportlink-ffa29",
  storageBucket: "sportlink-ffa29.appspot.com",
  messagingSenderId: "83811382443",
  appId: "1:83811382443:web:de8fd25e5db2e140bc73ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
