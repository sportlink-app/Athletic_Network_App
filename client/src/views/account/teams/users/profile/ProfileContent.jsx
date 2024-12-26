import DataField from "../../../../../components/static/DataField";
import { Divider } from "antd";
import Tags from "../../../../../components/static/Tags";
import {
  BulbOutlined,
  HeartOutlined,
  TeamOutlined,
  FormOutlined,
  UserAddOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

function ProfileContent({ bio, sports, joinedAt }) {
  const formattedDate = joinedAt.split(" ").slice(0, 4).join(" ");
  return (
    <div className="w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col gap-4 xl:gap-6 mt-32 mb-8">
      <div className="flex justify-between mt-2 xl:mt-4">
        <div className="flex flex-col items-center gap-[.15rem]">
          <div className="flex gap-1 md:gap-2">
            <TeamOutlined className="text-gray-600 md:text-lg" />
            <span className="text-xl md:text-2xl font-medium text-gray-600">
              28
            </span>
          </div>
          <h2 className="text-gray-600 text-sm md:text-base">Teams Created</h2>
        </div>
        <div className="flex flex-col items-center gap-[.15rem]">
          <div className="flex gap-1 md:gap-2">
            <UserAddOutlined className="text-gray-600 md:text-lg" />
            <span className="text-xl md:text-2xl font-medium text-gray-600">
              8
            </span>
          </div>
          <h2 className="text-gray-600 text-sm md:text-base">Teams Joined</h2>
        </div>
        <div className="flex flex-col items-center gap-[.15rem]">
          <div className="flex gap-1 md:gap-2">
            <FormOutlined className="text-gray-600 text-sm md:text-base" />
            <span className="text-xl md:text-2xl font-medium text-gray-600">
              2
            </span>
          </div>
          <h2 className="text-gray-600 text-sm md:text-base">Blog Posted</h2>
        </div>
      </div>

      <Divider type="horizontal" className="w-full border-gray-200 my-2" />

      <DataField
        title="Bio"
        content={bio}
        icon={<BulbOutlined className="text-sm pt-[2px]" />}
      />

      <Divider type="horizontal" className="w-full border-gray-200 my-2" />
      <li>
        <span className="w-fit flex justify-center items-center gap-2">
          <HeartOutlined className="text-sm pt-[2px]" />
          <p className="text-sm  mt-1 md:max-w-sm lg:max-w-lg xl:max-w-xl">
            Sports
          </p>
        </span>
        <div className="flex flex-wrap gap-x-1 gap-y-3 mt-2">
          <Tags
            list={sports.length > 0 ? sports : ["No sports available"]}
            className="py-1 px-4 text-sm mt-1"
          />
        </div>
      </li>
      <Divider type="horizontal" className="w-full border-gray-200 my-2" />

      <div className=" w-fit flex justify-center items-center gap-2 text-gray-800">
        <CarryOutOutlined className="text-[.95rem] pt-[2px]" />
        <p className="text-sm mt-1">Joined in {formattedDate}</p>
      </div>
    </div>
  );
}

ProfileContent.propTypes = {
  city: PropTypes.string,
  bio: PropTypes.string,
  sports: PropTypes.array,
  joinedAt: PropTypes.string,
};

export default ProfileContent;
