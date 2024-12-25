import PropTypes from "prop-types";
import { Avatar, Badge } from "antd";
import { getRandomColor } from "../utils/randomColor";
import { useState, useEffect } from "react";
import SkeletonAvatar from "antd/es/skeleton/Avatar";

// Simple hash function to generate a number from a string
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

// Function to get a random element based on a hash
const getElementByHash = (arr, hash) => arr[Math.abs(hash) % arr.length];

function ProfileAvatar({
  username,
  gender,
  size = 64,
  dot = false,
  offset = [-8, 50],
  count,
  color,
  className = "",
}) {
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");

  const maleHair = ["dougFunny", "dannyPhantom", "fonze", "mrClean"];
  const femaleHair = ["pixie", "full"];
  const mouth = ["laughing", "pucker", "smile", "smirk"];

  const userHash = hashCode(username);

  const hairStyle =
    gender === "female"
      ? getElementByHash(femaleHair, userHash)
      : getElementByHash(maleHair, userHash);

  const mouthStyle = getElementByHash(mouth, userHash);

  const bgColor = getRandomColor(username, gender).replace("#", "");

  useEffect(() => {
    const getAvatarUrl = (username, hairStyle, mouthStyle) => {
      return `https://api.dicebear.com/9.x/micah/svg?seed=${username}&hair=${hairStyle}&backgroundColor=${bgColor}&mouth=${mouthStyle}&facialHairProbability=0`;
    };
    // Simulate a loading delay for fetching avatar URL
    const url = getAvatarUrl(username, hairStyle, mouthStyle);
    setTimeout(() => {
      setAvatarUrl(url);
      setLoading(false);
    }, 1000); // Simulate a 1-second loading delay
  }, [username, hairStyle, mouthStyle, bgColor]);

  return (
    <Badge
      count={count}
      dot={dot}
      color={color}
      offset={offset}
      className={`${className} rounded-full `}
    >
      {loading ? (
        <SkeletonAvatar
          size={size}
          active
          shape="circle"
          className="bg-white rounded-full overflow-hidden"
        />
      ) : (
        <Avatar
          src={avatarUrl}
          size={size}
          className=" border-[2px] border-white"
        />
      )}
    </Badge>
  );
}

ProfileAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  size: PropTypes.number,
  dot: PropTypes.bool,
  count: PropTypes.number,
  color: PropTypes.number,
  offset: PropTypes.array,
  className: PropTypes.string,
};

export default ProfileAvatar;
