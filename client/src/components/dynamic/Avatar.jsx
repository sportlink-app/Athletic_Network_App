import PropTypes from "prop-types";
import { Avatar, Badge } from "antd";
import { getRandomColor } from "../utils/randomColor";
import { useState, useEffect } from "react";
import SkeletonAvatar from "antd/es/skeleton/Avatar";

// Simple hash function to generate a numeric hash from a string
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash); // Efficient hash computation
  }
  return hash;
};

// Utility function to select an array element based on hash
const getElementByHash = (arr, hash) => arr[Math.abs(hash) % arr.length]; // Ensures index is within bounds

function ProfileAvatar({
  username, // Required: Unique identifier for user
  gender, // Required: Used to determine hair style
  size = 64, // Optional: Avatar size, default is 64px
  dot = false, // Optional: Whether to show a status dot
  offset = [-8, 50], // Optional: Badge offset
  count, // Optional: Badge count
  color, // Optional: Badge color
  className = "", // Optional: Additional CSS classes
}) {
  const [loading, setLoading] = useState(true); // Loading state for avatar
  const [avatarUrl, setAvatarUrl] = useState(""); // Stores generated avatar URL

  // Predefined hair and mouth styles for avatars
  const maleHair = ["dougFunny", "dannyPhantom", "fonze", "mrClean"];
  const femaleHair = ["pixie", "full"];
  const mouth = ["laughing", "pucker", "smile", "smirk"];

  const userHash = hashCode(username); // Generate a unique hash for the username

  // Determine hair and mouth styles based on user hash and gender
  const hairStyle =
    gender === "female"
      ? getElementByHash(femaleHair, userHash)
      : getElementByHash(maleHair, userHash);

  const mouthStyle = getElementByHash(mouth, userHash);

  // Generate a background color based on username and gender
  const bgColor = getRandomColor(username, gender).replace("#", "");

  // Fetch avatar URL when dependencies change
  useEffect(() => {
    const getAvatarUrl = (username, hairStyle, mouthStyle) => {
      return `https://api.dicebear.com/9.x/micah/svg?seed=${username}&hair=${hairStyle}&backgroundColor=${bgColor}&mouth=${mouthStyle}&facialHairProbability=0`;
    };

    // Simulate a loading delay for avatar generation
    const url = getAvatarUrl(username, hairStyle, mouthStyle);
    setTimeout(() => {
      setAvatarUrl(url); // Set generated avatar URL
      setLoading(false); // Update loading state
    }, 1000); // Simulated delay (1 second)
  }, [username, hairStyle, mouthStyle, bgColor]);

  return (
    <Badge
      count={count} // Display badge count, if provided
      dot={dot} // Show a dot badge if true
      color={color} // Set badge color
      offset={offset} // Set badge offset
      className={`${className} rounded-full`} // Additional styles
    >
      {loading ? (
        // Show skeleton avatar while loading
        <SkeletonAvatar
          size={size}
          active
          shape="circle"
          className="bg-white rounded-full overflow-hidden"
        />
      ) : (
        // Show actual avatar once loaded
        <Avatar
          src={avatarUrl}
          size={size}
          className=" border-[2px] border-white"
        />
      )}
    </Badge>
  );
}

// Define component prop types for validation
ProfileAvatar.propTypes = {
  username: PropTypes.string.isRequired, // Username is mandatory
  gender: PropTypes.string.isRequired, // Gender is mandatory
  size: PropTypes.number, // Optional avatar size
  dot: PropTypes.bool, // Optional badge dot
  count: PropTypes.number, // Optional badge count
  color: PropTypes.number, // Optional badge color
  offset: PropTypes.array, // Optional badge offset
  className: PropTypes.string, // Optional additional CSS classes
};

export default ProfileAvatar;
