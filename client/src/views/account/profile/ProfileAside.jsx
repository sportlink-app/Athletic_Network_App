import { useEffect, useState } from "react";
import ProfileAvatar from "../../../components/dynamic/Avatar";
import Text from "../../../components/static/Text";
import { Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import userInfoStore from "../../../store/user/userInfoStore";

const ProfileAside = ({ username, gender }) => {
  const {
    getAvailability,
    availability: storeAvailability,
    updateAvailability,
  } = userInfoStore();

  const [availability, setAvailability] = useState(storeAvailability);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (storeAvailability === null) {
        // Prevent unnecessary calls
        setLoading(true);
        try {
          const response = await getAvailability(username);
          setAvailability(response.availability);
        } catch (error) {
          console.error("Error fetching availability:", error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setAvailability(storeAvailability); // Use existing availability
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [getAvailability, storeAvailability, username]);

  const handleAvailabilityChange = async (checked) => {
    if (!loading) {
      // Prevent unnecessary updates while loading
      setLoading(true);
      await updateAvailability(checked);
      setAvailability(checked);
      setLoading(false);
    }
  };

  return (
    <div className="md:w-40 lg:w-48 lg:sticky top-20 self-center md:self-start flex flex-col items-center gap-3 mt-4 md:mt-0">
      <ProfileAvatar username={username} gender={gender} size={140} />
      <h2 className="text-gray-600 text-3xl font-medium capitalize text-center md:w-40 lg:w-48 text-ellipsis overflow-hidden">
        {username}
      </h2>
      <li className="self-start flex gap-3 items-center ml-6">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={availability}
          onChange={handleAvailabilityChange}
          disabled={loading}
        />
        <Text
          text={`${availability ? "Available" : "Unavailable"}`}
          type="subtitle"
          className={`${
            !availability && "!text-red-400"
          } "font-medium capitalize"`}
        />
      </li>
    </div>
  );
};

ProfileAside.propTypes = {
  username: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default ProfileAside;
