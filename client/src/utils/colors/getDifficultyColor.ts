export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "blue";
    case "intermediate":
      return "orange";
    case "advanced":
      return "red";
    default:
      return "gray";
  }
};
