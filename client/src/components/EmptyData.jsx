import { InfoCircleOutlined } from "@ant-design/icons";
import Text from "./Text";

const EmptyData = () => {
  return (
    <section className="w-full h-[50vh] flex justify-center items-center">
      <article className="flex justify-center items-center gap-2 text-slate-500">
        <InfoCircleOutlined className="text-lg" />
        <Text
          text="No Results Found!"
          type="subtitle"
          className="font-medium capitalize !text-slate-500"
        />
      </article>
    </section>
  );
};

export default EmptyData;
