import { useState, useEffect } from "react";
import sportStore from "../../store/sport/sportStore";
import { useNavigate } from "react-router-dom";

const useSports = () => {
  const [sports, setSports] = useState([]);
  const { getSports } = sportStore();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sportsData = await getSports();
        setSports(sportsData);
      } catch (error) {
        navigate("/server-error");
      }
    };

    fetchSports();
  }, [getSports]);

  return sports;
};

export default useSports;
