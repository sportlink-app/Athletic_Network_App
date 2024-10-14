import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authStore from "../store/user/authStore";
import { Spin } from "antd";

function CheckAuth({ children }) {
  const {
    isAuthenticated,
    setAuthState,
    isProfileCompleted,
    setProfileCompletedState,
  } = authStore();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          // Decode the token to get user info, including isProfileCompleted
          const decodedToken = jwtDecode(token);
          const profileCompleted = decodedToken.isProfileCompleted;

          // Set auth state and profile completion state
          setAuthState(true);
          setProfileCompletedState(profileCompleted);

          setLoading(false);
        } catch (error) {
          // If token decoding fails, treat the user as not authenticated
          setAuthState(false);
          setLoading(false);
          navigate("/login");
        }
      } else {
        // No token, user is not authenticated
        setAuthState(false);
        setLoading(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  // Handle navigation based on auth state and profile completion
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!isProfileCompleted) {
      navigate("/complete-profile");
    }
  }, [isAuthenticated, isProfileCompleted, navigate]);

  // Show a loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="h-[calc(100vh-59.19px)] grid place-items-center">
        <Spin size="large" className="green-spin" />
      </div>
    );
  }

  // Render the children components if authenticated and profile is completed
  return isAuthenticated && isProfileCompleted ? children : null;
}

CheckAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CheckAuth;
