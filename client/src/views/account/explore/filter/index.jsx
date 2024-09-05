import { Button } from "antd";
import { Availability, City, Sport } from "./FilterData";
import { SearchOutlined } from "@ant-design/icons";

function Filter() {
  return (
    <ul className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-4 rounded-full w-full md:w-fit">
      <span className="flex items-center gap-4 sm:gap-6">
        <City />
        <Sport />
      </span>
      <span className="flex items-center gap-6 sm:gap-8">
        <Availability />
        <Button shape="circle" icon={<SearchOutlined />} size="middle" />
      </span>
    </ul>
  );
}
export default Filter;
