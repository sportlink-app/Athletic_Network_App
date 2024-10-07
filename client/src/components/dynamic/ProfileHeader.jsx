import Text from "../static/Text";
import ProfileAvatar from "./Avatar";
import { EnvironmentOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

function ProfileHeader({ username, gender, city, availability }) {
  const availabilityStatus = (isAvailable) => {
    return (
      <li className="flex gap-2 justify-center items-center">
        <Text
          text={isAvailable ? "available" : "unavailable"}
          type="subtitle"
          className={`${
            !isAvailable && "!text-red-400"
          } font-medium capitalize`}
        />

        <span className="relative flex h-3 w-3">
          {isAvailable && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
          )}
          <span
            className={`${
              isAvailable ? "bg-green" : "bg-red-400"
            } relative inline-flex rounded-full h-3 w-3`}
          ></span>
        </span>
      </li>
    );
  };
  return (
    <div className="!w-1/2 lg:!w-1/3 xl:!w-1/5 self-center mt-4 md:mt-0 relative">
      <div className="absolute left-1/2 flex -translate-x-1/2 -translate-y-[53%] flex-col items-center">
        <ProfileAvatar username={username} gender={gender} size={120} />
        <ul className="flex flex-col gap-2 justify-center items-center mt-4">
          <h2 className="text-gray-600 text-4xl font-medium capitalize">
            {username}
          </h2>
          <span className="w-fit flex justify-center items-center gap-[.35rem] h-6">
            {city && (
              <>
                <EnvironmentOutlined className="text-sm" />
                <p className="text-slate-500"> {city}</p>
              </>
            )}
          </span>
          <span className="h-6">
            {city && availabilityStatus(availability)}
          </span>
        </ul>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  username: PropTypes.string,
  gender: PropTypes.string,
  city: PropTypes.string,
  availability: PropTypes.bool,
};

export default ProfileHeader;
