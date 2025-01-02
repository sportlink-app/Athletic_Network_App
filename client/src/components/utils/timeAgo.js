// Function to return a human-readable time ago format
export default function timeAgo(dateString) {
  // Convert the input dateString to a Date object
  const date = new Date(dateString);
  // Get the current date and time
  const now = new Date();

  // Calculate the difference between the current time and the input date in seconds
  const seconds = Math.floor((now - date) / 1000);
  // Convert the seconds into minutes
  const minutes = Math.floor(seconds / 60);
  // Convert minutes into hours
  const hours = Math.floor(minutes / 60);
  // Convert hours into days
  const days = Math.floor(hours / 24);
  // Convert days into months (approximately)
  const months = Math.floor(days / 30);
  // Convert days into years (approximately)
  const years = Math.floor(days / 365);

  // Return the formatted time ago string based on the largest unit
  if (years > 0) {
    // If the difference is in years, return the number of years with "year(s)" suffix
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    // If the difference is in months, return the number of months with "month(s)" suffix
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    // If the difference is in days, return the number of days with "day(s)" suffix
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    // If the difference is in hours, return the number of hours with "hour(s)" suffix
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    // If the difference is in minutes, return the number of minutes with "minute(s)" suffix
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    // If the difference is less than a minute, return "just now"
    return `just now`;
  }
}
