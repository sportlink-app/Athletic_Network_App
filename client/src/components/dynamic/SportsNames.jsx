import { useState, useEffect } from "react";
import sportStore from "../../store/sport/sportStore";
import { useNavigate } from "react-router-dom";

const useSports = () => {
  // State to hold the sports data
  const [sports, setSports] = useState([]);

  // Accessing the `getSports` function from the sportStore
  const { getSports } = sportStore();

  // React Router's navigation hook for redirection
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch sports data from the store
    const fetchSports = async () => {
      try {
        const sportsData = await getSports();
        setSports(sportsData); // Update the state with the fetched data
      } catch (error) {
        // Handle errors by navigating to a server error page (commented out)
        // navigate("/server-error");
      }
    };

    fetchSports(); // Trigger the data fetch when the component mounts
  }, [getSports, navigate]);

  return sports; // Return the sports data for use in components
};

export default useSports;
