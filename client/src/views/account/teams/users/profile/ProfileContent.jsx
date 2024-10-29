import DataField from "../../../../../components/static/DataField";
import { Divider } from "antd";
import Tags from "../../../../../components/static/Tags";
import { BulbOutlined, HeartOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

function ProfileContent({ bio, sports }) {
  return (
    <div className="w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col gap-4 mt-36 mb-8">
      <DataField
        title="Bio"
        content={bio}
        icon={<BulbOutlined className="text-sm pt-[2px]" />}
      />
      <Divider type="horizontal" className="w-full border-gray-200 my-4" />
      <li>
        <span className="w-fit flex justify-center items-center gap-[.35rem]">
          <HeartOutlined className="text-sm pt-[2px]" />
          <p className="text-sm  mt-1 md:max-w-sm lg:max-w-lg xl:max-w-xl">
            Sports
          </p>
        </span>
        <div className="flex flex-wrap gap-x-1 gap-y-3 mt-2">
          <Tags
            list={sports.length > 0 ? sports : ["No sports available"]}
            className="py-1 px-4 text-sm"
          />
        </div>
      </li>

      <Divider type="horizontal" className="w-full border-gray-200 my-4" />
    </div>
  );
}

ProfileContent.propTypes = {
  bio: PropTypes.string,
  sports: PropTypes.array,
};

export default ProfileContent;
