/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param {number} n - The number to be rounded.
 * @param {number} dp - The number of decimal places to round to.
 * @return {number} The rounded number.
 */
export const round = (n, dp) => {
  // Convert the number 1 to a string and pad it with zeros to the desired number of decimal places
  const h = +"1".padEnd(dp + 1, "0"); // 10 or 100 or 1000 or etc

  // Round the number to the desired number of decimal places and return the result
  return Math.round(n * h) / h;
};
