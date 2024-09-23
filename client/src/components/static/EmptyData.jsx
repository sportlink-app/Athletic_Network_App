import { InfoCircleOutlined } from "@ant-design/icons";
import Text from "./Text";
import PropTypes from "prop-types";

const EmptyData = ({ text }) => {
  return (
    <section className="w-full h-[50vh] flex justify-center items-center">
      <article className="flex justify-center items-center gap-2 text-slate-500">
        <InfoCircleOutlined className="text-lg" />
        <Text
          text={text}
          type="subtitle"
          className="capitalize !text-slate-500"
        />
      </article>
    </section>
  );
};

EmptyData.propTypes = {
  text: PropTypes.string,
};

export default EmptyData;
