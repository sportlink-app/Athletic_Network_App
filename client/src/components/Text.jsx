import PropTypes from "prop-types";

const Text = (props) => {
  const { type, text } = props;

  let className = "";
  if (type === "title") {
    className =
      "text-3xl md:text-4xl font-bold capitalize tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan to-green";
  } else if (type === "subtitle") {
    className = "mt-6 text-lg leading-8 text-gray-600";
  }

  return <h1 className={className}>{text}</h1>;
};

Text.propTypes = {
  type: PropTypes.oneOf(["title", "subtitle"]),
  text: PropTypes.string,
};

Text.defaultProps = {
  type: "title",
};

export default Text;
