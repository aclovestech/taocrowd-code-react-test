export function timeAgoInYears(dateString) {
  const launchDate = new Date(dateString);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = now.getTime() - launchDate.getTime();

  // Define milliseconds in a year (approximate, ignoring leap seconds, etc.)
  // 1000 ms/s * 60 s/min * 60 min/hr * 24 hr/day * 365.25 days/year (to account for leap years over time)
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;

  // Calculate the difference in years
  const diffInYears = diffInMs / msPerYear;

  // Get the whole number of years
  const years = Math.floor(diffInYears);

  // Handle future dates or very recent dates if necessary,
  // but based on the example, we'll assume past dates
  if (years >= 0) {
    return `${years} years ago`;
  } else {
    // Handle future dates if needed, e.g., "In X years" or just the date
    return 'Date in the future'; // Or return a different format
  }
}
