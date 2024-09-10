import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
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
      const profileCompleted = Cookies.get("isProfileCompleted");

      if (token) {
        setAuthState(true);
        setProfileCompletedState(profileCompleted === "true");
        setLoading(false);
      } else {
        setAuthState(false);
        setLoading(false);
        navigate("/account/login");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account/login");
    } else if (!isProfileCompleted) {
      navigate("/account/complete-profile");
    }
  }, [isAuthenticated, isProfileCompleted, navigate]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-59.19px)] grid place-items-center">
        <Spin size="large" className="green-spin" />
      </div>
    );
  }

  return isAuthenticated && isProfileCompleted ? children : null;
}

CheckAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CheckAuth;
