export const getProgressColor = (progress: number) => {
  if (progress > 85) return "green";
  if (progress < 50) return "blue";
  if (progress < 75) return "orange";
  return "red";
};
