import PropTypes from "prop-types";
import Text from "./Text";

// 'DataField' component renders a list item with an icon, title, and content.
const DataField = ({ content, title, icon }) => {
  return (
    <li className="text-gray-600">
      {/* Icon and title are displayed together */}
      <span className="w-fit flex justify-center items-center gap-2">
        {icon}
        <p className="text-base mt-1 md:max-w-sm lg:max-w-lg xl:max-w-xl capitalize">
          {title}
        </p>
      </span>
      {/* 'Text' component renders the content with specific styling */}
      <Text
        text={content}
        type="subtitle"
        className="ml-1 mt-[.15rem] max-w-2xl"
        color="text-gray-900"
      />
    </li>
  );
};

// Prop validation for 'icon', 'content', and 'title'
DataField.propTypes = {
  icon: PropTypes.node,
  content: PropTypes.string,
  title: PropTypes.string,
};

export default DataField;
