import { useState, useEffect } from "react";
import sportStore from "../../store/sport/sportStore";

const useSports = () => {
  const [sports, setSports] = useState([]);
  const { getSports } = sportStore();

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sportsData = await getSports();
        setSports(sportsData);
      } catch (error) {
        console.error("Failed to fetch sports:", error.message);
      }
    };

    fetchSports();
  }, [getSports]);

  return sports;
};

export default useSports;
