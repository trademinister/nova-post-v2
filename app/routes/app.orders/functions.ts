export const toggleInArray = <T>(arr: T[], value: T) => {
  const idx = arr.indexOf(value);
  if (idx === -1) return [...arr, value];
  const next = arr.slice();
  next.splice(idx, 1);
  return next;
};
