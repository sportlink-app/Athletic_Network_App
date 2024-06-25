import { Divider } from "antd";
import DeactivateAccount from "./modals/DeactivateAccount";
import { Bio, City, Tel, Sports } from "./ProfileData";

function ProfileContent() {
  return (
    <form className="container mx-auto flex gap-4">
      <div className="pb-12">
        <Bio />
        <Divider type="horizontal" className="w-full border-gray-200 my-6" />
        <Sports />
        <Divider type="horizontal" className="w-full border-gray-200 my-6" />
        <City />
        <Divider type="horizontal" className="w-full border-gray-200 my-6" />
        <Tel />
        <Divider type="horizontal" className="w-full border-gray-200 my-6" />
        <DeactivateAccount />
      </div>
    </form>
  );
}

export default ProfileContent;
