export const compareObjectsByProp = (prop, direction = 1) => (first, second) => {
  const a = first[prop];
  const b = second[prop];

  if (a > b) {
    return 1 * direction;
  } else if (a < b) {
    return -1 * direction;
  }
  return 0;
};
