import colors from "../Colors";

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function getRandomColor(username, gender = "unknown") {
  const combinedString = username + gender;
  const hash = hashString(combinedString);
  const randomIndex = Math.abs(hash) % colors.length;
  return colors[randomIndex].value;
}

export { hashString, getRandomColor };
