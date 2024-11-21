import { ProjectStatus } from "../constants";

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


  export const getProjectStatus = (status: string) => {
    switch (status) {
      case ProjectStatus.draft:
        return { color: "#6c757d" }; // Gray for Draft
      case ProjectStatus.designBrief:
        return { color: "#007bff" }; // Blue for Design Brief
      case ProjectStatus.designQuotation:
        return { color: "#17a2b8" }; // Teal for Design Quotation
      case ProjectStatus.onHold:
        return { color: "#ffc107" }; // Yellow for On Hold
      case ProjectStatus.completed:
        return { color: "#28a745" }; // Green for Completed
      default:
        return { color: "transparent" }; // Transparent for unknown status
    }
  };
  