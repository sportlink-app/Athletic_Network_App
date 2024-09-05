import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import authStore from "../store/user/authStore"; // Ensure the correct import path
import { Spin } from "antd";

function CheckAuth(props) {
  const { isProfileCompleted, isAuthenticated } = authStore();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (!isAuthenticated) {
      setLoading(false);
      navigate("/account");
    } else if (!isProfileCompleted) {
      setLoading(false);
      navigate("/complete-profile");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isProfileCompleted, navigate]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-59.19px)] grid place-items-center">
        <Spin size="large" className="green-spin" />
      </div>
    );
  }

  // Render the children only if the profile is complete
  return <div>{props.children}</div>;
}

CheckAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CheckAuth;
