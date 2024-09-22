import { Button, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MainButton({
  text,
  href,
  onClick,
  type = "primary",
  shape = "round",
  icon,
  iconPosition = "end",
  danger = false,
  bgColor,
  className,
}) {
  const colors = ["#00E0B5", "#31E528"];
  const gradient = `linear-gradient(116deg, ${colors.join(", ")})`;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorText: "white",
            colorPrimary: bgColor === "light" ? "white" : gradient,
            colorPrimaryHover: bgColor === "light" ? "#f3f4f6" : gradient,
            colorPrimaryActive: bgColor === "light" ? "white" : gradient,
            lineWidth: 0,
          },
        },
      }}
    >
      <Link to={href} className={className}>
        <Button
          danger={danger}
          size="large"
          onClick={onClick}
          type={type}
          shape={shape}
          icon={icon}
          iconPosition={iconPosition}
          className={`text-lg md:text-base capitalize h-fit w-fit hover:-translate-y-[.15rem] duration-500 hover:!text-white ${bgColor}`}
        >
          {text}
        </Button>
      </Link>
    </ConfigProvider>
  );
}

MainButton.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  shape: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.string,
  danger: PropTypes.bool,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};

export default MainButton;
