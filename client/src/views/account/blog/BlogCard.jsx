import PropTypes from "prop-types";
import ProfileAvatar from "../../../components/Avatar";
import Card from "../../../components/Card";
import Tags from "../../../components/Tags";
import { getRandomColor } from "../../../components/utils/randomColor";

function BlogCard({ username, gender, sport, date, title, content }) {
  const avatarBgColor = getRandomColor(username, gender).replace("#", "");

  // Remove time from the date string
  const formattedDate = date.split(" ").slice(0, 4).join(" ");

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
        <div className="flex items-center justify-start gap-2 mt-1">
          <ProfileAvatar
            username={username}
            gender={gender}
            size={36}
            bgColor={avatarBgColor}
          />
          <p className="text-base text-gray-700 capitalize">{username}</p>
        </div>
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
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BlogCard;
