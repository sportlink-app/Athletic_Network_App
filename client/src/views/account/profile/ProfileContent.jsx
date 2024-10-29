import { Divider } from "antd";
import DeactivateAccount from "./DeactivateAccount";
import DataField from "../../../components/static/DataField";
import Tags from "../../../components/static/Tags";
import {
  BulbOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

function ProfileContent({ bio, sports, email, city, tel }) {
  return (
    <form className="container mx-auto flex gap-4">
      <div className="pb-12">
        <DataField
          title="Bio"
          content={bio}
          icon={<BulbOutlined className="text-sm pt-[2px]" />}
        />
        <Divider
          type="horizontal"
          className="w-full border-gray-200 my-6 xl:my-8"
        />
        <li>
          <span className="w-fit flex justify-center items-center gap-[.35rem] text-gray-600">
            <HeartOutlined className="text-sm pt-[2px]" />
            <p className="text-sm  mt-1 md:max-w-sm lg:max-w-lg xl:max-w-xl">
              Sports
            </p>
          </span>
          <div className="flex flex-wrap gap-x-1 gap-y-3 mt-2">
            <Tags
              list={sports.map((sport) => sport.name)}
              className="py-1 px-4 text-sm"
            />
          </div>
        </li>
        <Divider
          type="horizontal"
          className="w-full border-gray-200 my-6 xl:my-8"
        />
        <ul className="flex flex-wrap gap-8 md:gap-16 sm:gap-20 lg:gap-24 xl:gap-32">
          <DataField
            title="Email"
            content={email}
            icon={<MailOutlined className="text-sm pt-[2px]" />}
          />
          <DataField
            title="City"
            content={city}
            icon={<EnvironmentOutlined className="text-sm pt-[2px]" />}
          />
          <DataField
            title="Tel"
            content={tel}
            icon={<PhoneOutlined className="text-sm pt-[2px]" />}
          />
        </ul>
        <Divider
          type="horizontal"
          className="w-full border-gray-200 my-6 xl:my-8"
        />
        <DeactivateAccount />
      </div>
    </form>
  );
}

ProfileContent.propTypes = {
  bio: PropTypes.string,
  gender: PropTypes.string,
  sports: PropTypes.array,
  email: PropTypes.string,
  city: PropTypes.string,
  tel: PropTypes.string,
};

export default ProfileContent;
