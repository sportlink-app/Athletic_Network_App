import PropTypes from "prop-types";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`pt-4 pb-16 md:pb-20 lg:pb-24 px-2 relative overflow-hidden text-center ${className}`}
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
