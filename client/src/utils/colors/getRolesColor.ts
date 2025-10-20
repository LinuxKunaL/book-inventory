export const getRolesColor = (role: string) => {
  switch (role) {
    case "proprietor":
      return "blue";
    case "volunteer":
      return "orange";
    case "distributor":
      return "green";
    default:
      return "gray";
  }
};
