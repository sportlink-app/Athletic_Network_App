import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      type="default"
      shape="round"
      size="large"
      onClick={() => navigate(-1)}
      icon={<ArrowLeftOutlined size={16} />}
      className="back-btn absolute top-5 left-2 sm:left-4 hover:!border-green"
    >
      Back
    </Button>
  );
};

export default BackButton;
