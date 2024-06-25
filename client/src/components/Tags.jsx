import PropTypes from "prop-types";
import { Tag } from "antd";
import colors from "./Colors";

function Tags({ list, className }) {
  return (
    <>
      {list.map((sport) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <Tag
            key={sport}
            color={randomColor.name}
            className={`${className} rounded-full  capitalize`}
          >
            {sport}
          </Tag>
        );
      })}
    </>
  );
}

Tags.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

export default Tags;
