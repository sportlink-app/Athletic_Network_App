import DataField from "../../../../components/DataField";
import { Divider } from "antd";
import Text from "../../../../components/Text";
import Tags from "../../../../components/Tags";
import PropTypes from "prop-types";

function ProfileContent({ bio, sports, city }) {
  return (
    <div className="w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col gap-4 mt-32 mb-8">
      <DataField title="Bio" content={bio || "No bio available"} />
      <Divider type="horizontal" className="w-full border-gray-200 my-4" />
      <li>
        <Text
          text="Sports"
          type="subtitle"
          className="font-medium"
          color="text-gray-600"
        />
        <div className="flex flex-wrap gap-x-1 gap-y-3 mt-2">
          <Tags
            list={sports.length > 0 ? sports : ["No sports available"]}
            className="py-1 px-4 text-sm"
          />
        </div>
      </li>
      <Divider type="horizontal" className="w-full border-gray-200 my-4" />
      <DataField title="City" content={city || "No city available"} />
    </div>
  );
}

ProfileContent.propTypes = {
  bio: PropTypes.string,
  sports: PropTypes.array,
  city: PropTypes.string,
};

export default ProfileContent;
