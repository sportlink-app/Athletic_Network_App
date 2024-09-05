import { Divider } from "antd";
import DeactivateAccount from "./modals/DeactivateAccount";
import DataField from "../../../components/DataField";
import Tags from "../../../components/Tags";
import Text from "../../../components/Text";
import userInfoStore from "../../../store/user/userInfoStore";

function ProfileContent() {
  const { bio, sports, email, city, tel } = userInfoStore();
  return (
    <form className="container mx-auto flex gap-4">
      <div className="pb-12">
        <DataField title="Bio" content={bio} />
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
            <Tags list={sports} className="py-1 px-4 text-sm" />
          </div>
        </li>
        <Divider
          type="horizontal"
          className="w-full border-gray-200 my-6 xl:my-8"
        />
        <ul className="flex flex-wrap gap-8 md:gap-16 sm:gap-20 lg:gap-24 xl:gap-32">
          <DataField title="Email" content={email} />
          <DataField title="City" content={city} />
          <DataField title="Tel" content={tel} />
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

export default ProfileContent;
