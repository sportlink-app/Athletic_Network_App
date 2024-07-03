import PropTypes from "prop-types";
import { Avatar, Badge } from "antd";
import { getRandomColor } from "./utils/randomColor";

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
  className = "",
  dot = false,
  dotColor,
}) {
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

  const getAvatarUrl = (username, hairStyle, mouthStyle) => {
    return `https://api.dicebear.com/9.x/micah/svg?seed=${username}&hair=${hairStyle}&backgroundColor=${bgColor}&mouth=${mouthStyle}&facialHairProbability=0`;
  };

  const avatarUrl = getAvatarUrl(username, hairStyle, mouthStyle);

  return (
    <Badge dot={dot} color={dotColor} offset={[-8, 50]} className={className}>
      <Avatar
        src={avatarUrl}
        size={size}
        className="border-[1px] border-white"
      />
    </Badge>
  );
}

ProfileAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  gender: PropTypes.oneOf(["male", "female"]).isRequired,
  bgColor: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  dot: PropTypes.bool,
  dotColor: PropTypes.string,
};

export default ProfileAvatar;
