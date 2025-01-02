import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const BackButton = ({ className }) => {
  // Using the useNavigate hook from react-router-dom to navigate programmatically
  const navigate = useNavigate();

  return (
    <Button
      type="default"
      shape="round"
      size="large"
      onClick={() => navigate(-1)}
      icon={<ArrowLeftOutlined size={16} />}
      className={`${className} back-btn hover:!border-green w-fit`}
    >
      Back
    </Button>
  );
};

// Defining prop types for validation
BackButton.propTypes = {
  className: PropTypes.string, // Optional className for styling the button
};

export default BackButton;
