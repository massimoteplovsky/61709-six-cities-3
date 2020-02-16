export const makeRating = (numericRating) => {
  return (100 / 5 * numericRating).toFixed(0);
};
