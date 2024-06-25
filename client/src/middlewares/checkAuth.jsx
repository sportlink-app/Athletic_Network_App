import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import authStore from "../store/authStore";

function checkAuth(props) {
  const { isAuthenticated } = authStore();

  // State to track loading state
  const [loading, setLoading] = useState(false);

  // Hook for navigating between pages
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check authorization
    const checkAuth = async () => {
      // Set loading to true to indicate that the check is in progress
      setLoading(true);

      // If accessToken exists, set loading to false and navigate to the admin page
      if (isAuthenticated) {
        setLoading(false);
        navigate("/admin");
      }
    };

    // Invoke the checkAuth function
    checkAuth();
  }, []);

  // If loading is null, render a loading spinner (Progress component)
  if (loading === null) {
    return <div>load ...</div>;
  }

  // Render the children (typically the content to be displayed for authenticated or unauthenticated users)
  return <div>{props.children}</div>;
}

// Prop types for the checkAuth component
checkAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default checkAuth;
