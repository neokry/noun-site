export const compareAddress = (a: string, b: string): boolean => {
  if (!a || !b) return false;
  return a.toLowerCase().localeCompare(b.toLowerCase()) === 0;
};
