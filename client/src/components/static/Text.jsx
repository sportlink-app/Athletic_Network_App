import PropTypes from "prop-types";

const Text = ({
  type = "title",
  text,
  color = "bg-clip-text text-transparent bg-gradient-to-r from-cyan to-green",
  className,
}) => {
  let style = "";
  if (type === "title") {
    style =
      "text-3xl md:text-4xl xl:text-[2.5rem] font-bold capitalize tracking-tight";
  } else if (type === "subtitle") {
    style = " text-lg leading-8 ";
  }

  return <h2 className={`${style} ${color} ${className}`}>{text}</h2>;
};

Text.propTypes = {
  type: PropTypes.oneOf(["title", "subtitle"]),
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Text;
