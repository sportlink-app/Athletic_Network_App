import PropTypes from "prop-types";

// 'Container' component wraps content with padding, positioning, and text centering.
const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`pt-4 pb-16 md:pb-20 lg:pb-24 px-2 relative overflow-hidden text-center ${className}`}
    >
      {children}
    </div>
  );
};

// Prop validation for 'children' and 'className'
Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Container;
