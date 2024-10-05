import colors from "../static/Colors";

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

// Function to lighten the color
function lightenColor(hex, percent) {
  const num = parseInt(hex.slice(1), 16); // Convert hex to decimal
  const amt = Math.round(2.55 * percent); // Amount to lighten (0-100%)
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  // Ensure RGB values are within the 0-255 range
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 0 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

// Function to darken the color
function darkenColor(hex, percent) {
  const num = parseInt(hex.slice(1), 16); // Convert hex to decimal
  const amt = Math.round(2.55 * percent); // Amount to darken (0-100%)
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;

  // Ensure RGB values are within the 0-255 range
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 0 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

export { hashString, getRandomColor, lightenColor, darkenColor };
