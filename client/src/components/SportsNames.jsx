import { useState, useEffect } from "react";
import sportStore from "../store/sport/sportStore";

const useSports = () => {
  const [sports, setSports] = useState([]);
  const { getSports } = sportStore(); // Correct reference to 'getSports'

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sportsData = await getSports(); // Fetch sports from the store
        setSports(sportsData); // Update state with fetched sports
      } catch (error) {
        console.error("Failed to fetch sports:", error.message); // Handle error
      }
    };

    fetchSports(); // Call the async function
  }, [getSports]); // Proper dependency array

  return sports; // Return the sports array
};

export default useSports;
