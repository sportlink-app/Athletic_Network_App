import PropTypes from "prop-types";
import ProfileAvatar from "./Avatar";
import Card from "../static/Card";
import Tags from "../static/Tags";
import { getRandomColor } from "../utils/randomColor";
import { Link } from "react-router-dom";
import authStore from "../../store/user/authStore";

function BlogCard({ username, gender, sport, date, title, content, btn }) {
  // Generate a background color for the avatar based on username and gender
  const avatarBgColor = getRandomColor(username, gender).replace("#", "");

  // Format the date string to exclude the time portion
  const formattedDate = date.split(" ").slice(0, 4).join(" ");

  const { authenticatedUsername } = authStore(); // Retrieve authenticated user's information

  return (
    <Card className="break-inside-avoid mb-[1em] h-fit p-4 rounded-2xl overflow-hidden">
      <div className="w-full flex flex-col gap-2 rounded-t-2xl border-4 border-white">
        {/* Header: Tags and Date */}
        <div className="flex justify-between">
          <Tags list={sport} /> {/* Display a list of tags */}
          <p className="text-right text-xs text-gray-500 capitalize">
            {formattedDate} {/* Display the formatted date */}
          </p>
        </div>
        {/* Title */}
        <h3 className="text-base xl:text-lg font-medium text-gray-900 mt-1 lg:mt-2">
          {title} {/* Display the blog title */}
        </h3>
        {/* Content */}
        <p className="text-sm text-gray-600">{content}</p>{" "}
        {/* Display the blog content */}
        {/* Footer: Avatar and Username */}
        {!btn && (
          <div className="flex items-center justify-start gap-2 mt-1">
            <ProfileAvatar
              username={username} // Pass username to generate avatar
              gender={gender} // Pass gender for styling
              size={36} // Set avatar size
              bgColor={avatarBgColor} // Pass background color
            />
            <Link to={`/user/${username}`}>
              {" "}
              {/* Link to the user's profile */}
              <p className="text-base text-gray-700 capitalize hover:underline">
                {username} {/* Display the username */}
              </p>
            </Link>
          </div>
        )}
        {/* Button for authenticated user */}
        {btn && authenticatedUsername === username && btn}
      </div>
    </Card>
  );
}

// Define component prop types for validation
BlogCard.propTypes = {
  username: PropTypes.string, // Username of the blog author
  gender: PropTypes.string, // Gender of the blog author
  sport: PropTypes.string, // Sport tags or categories
  date: PropTypes.string, // Date of the blog post
  title: PropTypes.string, // Blog post title
  content: PropTypes.string, // Blog post content
  btn: PropTypes.node, // Optional button or element for actions
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Key for list rendering
};

export default BlogCard;
