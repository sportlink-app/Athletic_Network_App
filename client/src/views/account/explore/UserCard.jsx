import ProfileAvatar from "../../../components/dynamic/Avatar";
import Card from "../../../components/static/Card";
import Tags from "../../../components/static/Tags";
import { getRandomColor } from "../../../components/utils/randomColor";
import { Link } from "react-router-dom";
import { SendOutlined, EnvironmentOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button } from "antd";

function UserCard({ username, gender, availability, city, sports }) {
  const avatarBgColor = getRandomColor(username, gender).replace("#", "");
  const coverBgColor = getRandomColor(username);

  // Handle button click without triggering the link navigation
  const handleInviteClick = (e) => {
    e.stopPropagation(); // Prevent link from being triggered
    e.preventDefault(); // Prevent default link behavior
    console.log("Invite button clicked!");
  };

  return (
    <Link to={`/explore/${username}`}>
      <Card className="h-full p-0 rounded-2xl overflow-hidden hover:scale-[1.03] hover:shadow-xl duration-500 cursor-pointer">
        <div
          style={{ backgroundColor: coverBgColor }}
          className="relative w-full h-14 rounded-t-2xl border-4 border-white"
        >
          <ProfileAvatar
            username={username}
            gender={gender}
            size={58}
            bgColor={avatarBgColor}
            dot={true}
            dotColor={`${availability ? "green" : "red"}`}
            className="absolute -bottom-[29px] left-[8%]"
          />
          <Button
            onClick={handleInviteClick}
            type="primary"
            shape="round"
            size="middle"
            className="absolute -bottom-4 right-5 !bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
            icon={<SendOutlined size={16} />}
          >
            Invite
          </Button>
        </div>
        <div className="mt-10 p-5 pt-0">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-gray-900">{username}</h3>
            <span className="flex justify-center items-center gap-1">
              <EnvironmentOutlined className="text-xs" />
              <p className="text-sm text-gray-500">{city}</p>
            </span>
          </div>
          <div className="flex flex-wrap gap-y-2 mt-4">
            <Tags list={sports} />
          </div>
        </div>
      </Card>
    </Link>
  );
}

UserCard.propTypes = {
  username: PropTypes.string,
  gender: PropTypes.string,
  city: PropTypes.string,
  sports: PropTypes.arrayOf(PropTypes.string),
  availability: PropTypes.bool,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default UserCard;
