import PropTypes from "prop-types";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`py-12 md:py-16 lg:py-20 px-2 relative overflow-hidden text-center ${className}`}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Container;
