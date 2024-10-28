export const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return { color: "#219653"};
      case "Payment Due":
        return { color: "#ff0000"}; 
      case "Pending":
        return { color: "#ffc107" }; 
      default:
        return { color: "transparent" };
    }
  };
  