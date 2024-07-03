import PropTypes from "prop-types";

const Card = ({ children, className = "p-3 sm:p-4 md:p-5 rounded-3xl" }) => {
  return (
    <div
      className={`bg-white border-solid border-[.8px] border-gray-300 ${className}`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
