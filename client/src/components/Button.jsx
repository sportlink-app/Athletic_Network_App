import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider } from "antd";

function MainButton(props) {
  const colors = ["#00E0B5", "#31E528"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorText: "white",
            colorPrimary: `${
              props.bgColor === "light"
                ? "white"
                : `linear-gradient(116deg, ${colors.join(", ")})`
            }`,
            colorPrimaryHover: `${
              props.bgColor === "light"
                ? "white"
                : `linear-gradient(116deg, ${colors.join(", ")})`
            }`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button
        size="large"
        href={props.href}
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

export default MainButton;
