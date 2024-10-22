import PropTypes from "prop-types";
import { Tag } from "antd";
import colors from "./Colors";

// Function to get color by sport name automatically
function getColorBySport(sport) {
  // Ensure sport is a valid string
  if (typeof sport !== "string") {
    return colors[0]; // Return a default color if sport is not a string
  }

  const index =
    sport.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
}

function Tags({ list, className }) {
  // If it's a string, wrap it in an array for consistent rendering logic
  const sports = Array.isArray(list) ? list : [list];

  return (
    <>
      {sports.filter(Boolean).map((sport) => {
        // Filter out any null or undefined values
        const color = getColorBySport(sport);
        return (
          <Tag
            key={sport}
            color={color.name}
            className={`${className} rounded-full h-fit w-fit capitalize`}
          >
            {sport}
          </Tag>
        );
      })}
    </>
  );
}

Tags.propTypes = {
  list: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string), // For multiple tags
    PropTypes.string, // For a single tag
  ]).isRequired,
  className: PropTypes.string,
};

export default Tags;
