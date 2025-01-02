import PropTypes from "prop-types";

// Functional component 'Card' accepts two props: 'children' and 'className'
// Default value for 'className' is set to "p-3 sm:p-4 md:p-5 rounded-3xl"
const Card = ({ children, className = "p-3 sm:p-4 md:p-5 rounded-3xl" }) => {
  return (
    // The outer div has styles for background, border, and custom padding (className)
    <div
      className={`bg-white border-solid border-[.8px] border-gray-300 ${className}`}
    >
      {children} {/* Render children content passed to the Card component */}
    </div>
  );
};

// Prop validation using PropTypes to ensure the correct type for each prop
Card.propTypes = {
  children: PropTypes.node, // 'children' should be any valid React node
  className: PropTypes.string, // 'className' should be a string
};

export default Card; // Export the Card component for use in other parts of the application
