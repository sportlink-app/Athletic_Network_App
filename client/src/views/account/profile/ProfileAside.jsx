import { useEffect, useState } from "react";
import ProfileAvatar from "../../../components/Avatar";
import Text from "../../../components/Text";
import { Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import userInfoStore from "../../../store/user/userInfoStore";

function ProfileAside({ username, gender }) {
  const {
    getAvailability,
    availability: storeAvailability,
    updateAvailability,
  } = userInfoStore();
  const [availability, setAvailability] = useState(storeAvailability);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await getAvailability(username);
        setAvailability(response.availability);
      } catch (error) {
        console.error("Error fetching availability:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [getAvailability]);

  const handleAvailabilityChange = async (checked) => {
    try {
      setLoading(true);
      await updateAvailability(checked);
      setAvailability(checked);
    } catch (error) {
      console.error("Error updating availability:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-40 lg:w-48 lg:sticky top-20 self-center md:self-start flex flex-col items-center gap-3 mt-4 md:mt-0">
      <ProfileAvatar username={username} gender={gender} size={140} />
      <h2 className="text-gray-600 text-3xl font-medium capitalize text-center md:w-40 lg:w-48 text-ellipsis overflow-hidden mt-4">
        {username}
      </h2>
      <li className="self-end flex gap-3 items-center mr-6">
        <Text
          text={`${availability ? "Available" : "Unavailable"}`}
          type="subtitle"
          className={`${
            !availability && "!text-red-400"
          }  "font-medium capitalize "`}
        />
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={availability}
          onChange={handleAvailabilityChange}
          disabled={loading}
        />
      </li>
    </div>
  );
}

ProfileAside.propTypes = {
  username: PropTypes.string,
  gender: PropTypes.string,
};

export default ProfileAside;
