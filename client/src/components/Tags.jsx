import PropTypes from "prop-types";
import { Tag } from "antd";
import colors from "./Colors";

// Function to get color by sport name automatically
function getColorBySport(sport) {
  const index =
    sport.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
}

function Tags({ list, className }) {
  return (
    <>
      {list.map((sport) => {
        const color = getColorBySport(sport);
        return (
          <Tag
            key={sport}
            color={color.name}
            className={`${className} rounded-full capitalize`}
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
