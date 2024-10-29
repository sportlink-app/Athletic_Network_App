import PropTypes from "prop-types";
import Text from "./Text";

const DataField = ({ content, title, icon }) => {
  return (
    <li className="text-gray-600">
      <span className=" w-fit flex justify-center items-center gap-[.35rem]">
        {icon}
        <p className="text-sm  mt-1 md:max-w-sm lg:max-w-lg xl:max-w-xl">
          {title}
        </p>
      </span>
      <Text
        text={content}
        type="subtitle"
        className="font-medium ml-1"
        color="text-gray-600"
      />
    </li>
  );
};

DataField.propTypes = {
  icon: PropTypes.node,
  content: PropTypes.string,
  title: PropTypes.string,
};

export default DataField;
