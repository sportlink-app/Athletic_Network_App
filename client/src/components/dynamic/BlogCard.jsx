import PropTypes from "prop-types";
import ProfileAvatar from "./Avatar";
import Card from "../static/Card";
import Tags from "../static/Tags";
import { getRandomColor } from "../utils/randomColor";
import { Link } from "react-router-dom";
import authStore from "../../store/user/authStore";

function BlogCard({ username, gender, sport, date, title, content, btn }) {
  const avatarBgColor = getRandomColor(username, gender).replace("#", "");

  // Remove time from the date string
  const formattedDate = date.split(" ").slice(0, 4).join(" ");

  const { authenticatedUsername } = authStore();
  return (
    <Card className="break-inside-avoid mb-[1em] h-fit p-4 rounded-2xl overflow-hidden ">
      <div className=" w-full flex flex-col gap-2 rounded-t-2xl border-4 border-white">
        <div className="flex justify-between">
          <Tags list={sport} />
          <p className="text-right text-xs text-gray-500 capitalize">
            {formattedDate}
          </p>
        </div>
        <h3 className="text-base xl:text-lg font-medium text-gray-900">
          {title}
        </h3>
        <p className="text-sm text-gray-600 capitalize">{content}</p>
        {!btn && (
          <div className="flex items-center justify-start gap-2 mt-1">
            <ProfileAvatar
              username={username}
              gender={gender}
              size={36}
              bgColor={avatarBgColor}
            />
            <Link to={`/explore/${username}`}>
              <p className="text-base text-gray-700 capitalize hover:underline">
                {username}
              </p>
            </Link>
          </div>
        )}

        {btn && authenticatedUsername === username && btn}
      </div>
    </Card>
  );
}

BlogCard.propTypes = {
  username: PropTypes.string,
  gender: PropTypes.string,
  sport: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  btn: PropTypes.node,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BlogCard;
