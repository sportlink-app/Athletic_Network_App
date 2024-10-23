import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const EmptyData = ({ text, className }) => {
  return (
    <section
      className={`w-full h-[50vh] flex justify-center items-center ${className}`}
    >
      <article className="flex justify-center items-center gap-3 text-slate-500">
        <InfoCircleOutlined className="text-lg" />

        <p className="text-base font-medium !text-slate-500">{text}</p>
      </article>
    </section>
  );
};

EmptyData.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default EmptyData;
