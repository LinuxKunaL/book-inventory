export const getGenderColor = (gender: string) => {
  switch (gender) {
    case "male":
      return "blue";
    case "female":
      return "pink";
    default:
      return "gray";
  }
};
