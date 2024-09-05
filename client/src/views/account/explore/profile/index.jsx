import { useParams } from "react-router-dom";
import { Button, Divider } from "antd";
import ProfileAvatar from "../../../../components/Avatar";
import { SendOutlined } from "@ant-design/icons";
import { getRandomColor } from "../../../../components/utils/randomColor";
import Text from "../../../../components/Text";
import Tags from "../../../../components/Tags";
import DataField from "../../../../components/DataField";

function UserProfile() {
  const { username } = useParams();
  const availability = (isAvailable) => {
    <li className="flex gap-2 justify-center items-center">
      <Text
        text={isAvailable ? "available" : "unavailable"}
        type="subtitle"
        className={`${!isAvailable && "text-red-400"} font-medium capitalize`}
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
    </li>;
  };
  const profileAside = (
    <div className="h-[248px] !w-1/2 lg:!w-1/3 xl:!w-1/5 self-center md:self-start mt-4 md:mt-0 relative">
      <div className="md:absolute -top-32 flex flex-col items-center gap-3">
        <ProfileAvatar username={username} gender="male" size={140} />
        <h2 className="text-gray-600 text-3xl font-medium capitalize text-center md:w-40 lg:w-48 text-ellipsis overflow-hidden mt-4">
          {username}
        </h2>
        {availability(false)}
      </div>
    </div>
  );
  const profileContent = (
    <form className="container mx-auto flex gap-4">
      <div className="pb-12">
        <DataField title="Bio" content="bio" />
        <Divider
          type="horizontal"
          className="w-full border-gray-200 my-6 xl:my-8"
        />
        <li>
          <Text
            text="Sports"
            type="subtitle"
            className="font-medium"
            color="text-gray-600"
          />
          <div className="flex flex-wrap gap-x-1 gap-y-3 mt-2">
            <Tags list={["sport", "sport"]} className="py-1 px-4 text-sm" />
          </div>
        </li>
      </div>
    </form>
  );
  const coverBgColor = getRandomColor(username);
  return (
    <section>
      <div
        style={{ backgroundColor: coverBgColor }}
        className="w-full h-24 md:h-32 xl:h-36"
      ></div>
      <div className="container mx-auto px-4 mt-10 lg:mt-14 xl:mt-16 w-full flex flex-col md:flex-row md:gap-6 lg:gap-8 xl:gap-10 ">
        <Button
          type="primary"
          shape="round"
          size="large"
          className=" self-end md:self-start md:order-last bg-green hover:!bg-green/70"
          icon={<SendOutlined size={16} />}
          iconPosition="end"
        >
          Invite
        </Button>
        {profileAside}
        <Divider
          type="horizontal"
          className="w-full border-gray-200 md:hidden"
        />
        <Divider
          type="vertical"
          className="h-96 xl:h-[30rem] border-gray-200 hidden md:block self-center"
        />
        {profileContent}
      </div>
    </section>
  );
}

export default UserProfile;
