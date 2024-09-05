import PropTypes from "prop-types";
import ProfileAvatar from "../../../components/Avatar";
import Card from "../../../components/Card";
import Tags from "../../../components/Tags";
import { getRandomColor } from "../../../components/utils/randomColor";
import { Link } from "react-router-dom";

function UserCard({ username, gender, isAvailable, city, sports }) {
  const avatarBgColor = getRandomColor(username, gender).replace("#", "");
  const coverBgColor = getRandomColor(username);
  return (
    <Link to={`/explore/${username}`}>
      <Card className="p-0 rounded-2xl overflow-hidden hover:scale-[1.03] hover:shadow-xl duration-500 cursor-pointer">
        <div
          style={{ backgroundColor: coverBgColor }}
          className=" relative w-full h-14 rounded-t-2xl border-4 border-white"
        >
          <ProfileAvatar
            username={username}
            gender={gender}
            size={58}
            bgColor={avatarBgColor}
            dot={true}
            dotColor={`${isAvailable ? "green" : "red"}`}
            className=" absolute -bottom-[29px] left-[8%]"
          />
        </div>
        <div className="mt-10 p-5 pt-0">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-gray-900">{username}</h3>
            <p className="text-sm text-gray-500">{city}</p>
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
  isAvailable: PropTypes.bool,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default UserCard;
