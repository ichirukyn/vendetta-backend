export const rangeWithNumber = (num: number, range: number) => {
  if (num === 0) return 0;
  
  const min = num * (1 - range);
  const max = num * (1 + range);
  const result = Math.random() * (max - min) + min
  return Math.round(result);
};
