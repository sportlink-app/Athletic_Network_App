import { Button, ConfigProvider } from "antd";
import PropTypes from "prop-types";

function MainButton(props) {
  const colors = ["#00E0B5", "#31E528"];
  const gradient = `linear-gradient(116deg, ${colors.join(", ")})`;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorText: "white",
            colorPrimary: props.bgColor === "light" ? "white" : gradient,
            colorPrimaryHover: props.bgColor === "light" ? "white" : gradient,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button
        size="large"
        href={props.href}
        onClick={props.onClick}
        type={props.type}
        shape={props.shape}
        icon={props.icon}
        iconPosition="end"
        className={`capitalize h-fit w-fit hover:-translate-y-1 duration-500 ${props.bgColor} ${props.className}`}
      >
        {props.text}
      </Button>
    </ConfigProvider>
  );
}

MainButton.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  shape: PropTypes.string,
  icon: PropTypes.node,
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};

export default MainButton;
