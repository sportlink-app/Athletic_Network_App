import { Divider } from "antd";
import ProfileContent from "./ProfileContent";
import { Availability } from "./ProfileData";
import EditProfile from "./modals/EditProfile";
import ProfileAvatar from "../../../components/Avatar";

function Profile() {
  const profileAside = (
    <div className="md:w-40 lg:w-48 lg:sticky top-20 self-center md:self-start flex flex-col items-center gap-3 mt-4 md:mt-0">
      <ProfileAvatar username="seifAaza 37" gender="male" size={140} />

      <h2 className="text-gray-600 text-3xl font-medium capitalize text-center md:w-40 lg:w-48 text-ellipsis overflow-hidden mt-4">
        seifeddine
      </h2>
      <Availability />
    </div>
  );
  return (
    <div className="container mx-auto px-4 mt-10 lg:mt-14 xl:mt-16 w-full flex flex-col md:flex-row md:gap-6 lg:gap-12 xl:gap-16 ">
      <EditProfile />
      {profileAside}
      <Divider type="horizontal" className="w-full border-gray-200 md:hidden" />
      <Divider
        type="vertical"
        className="h-96 border-gray-200 hidden md:block"
      />
      <ProfileContent />
    </div>
  );
}
export default Profile;
