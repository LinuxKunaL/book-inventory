export const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "green";
    case "pending":
      return "yellow";
    default:
      return "red";
  }
};
