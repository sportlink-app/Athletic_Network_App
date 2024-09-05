import PropTypes from "prop-types";
import Text from "./Text";

const DataField = ({ content, title }) => {
  return (
    <li>
      <Text
        text={title}
        type="subtitle"
        className="font-medium"
        color="text-gray-600"
      />
      <p className="text-sm text-gray-600 mt-1">{content}</p>
    </li>
  );
};

DataField.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default DataField;
