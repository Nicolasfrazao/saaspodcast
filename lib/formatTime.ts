/**
 * Format a time in seconds as a string in the format MM:SS.
 *
 * @param {number} seconds - The time in seconds to format.
 * @returns {string} The formatted time string.
 */
export const formatTime = (seconds: number) => {
  // Calculate the number of minutes by dividing the total seconds by 60.
  const minutes = Math.floor(seconds / 60);

  // Calculate the number of seconds remaining after subtracting the minutes.
  const remainingSeconds = Math.floor(seconds % 60);

  // If the remaining seconds is less than 10, add a leading zero to the string.
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  // Return the formatted string in the format MM:SS.
  return `${minutes}:${formattedSeconds}`;
};

