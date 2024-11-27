import { PaymentStatus, ProjectStatus } from "../constants";


type ProjectStatusTheme = {
  color: string;
  backgroundColor?: string;
}


export const getStatusColor = (status: string) => {
  switch (status) {
    case PaymentStatus.Completed:
      return { color: "#219653" };
    case PaymentStatus.PaymentDue:
      return { color: "#ff0000" };
    case PaymentStatus.Pending:
      return { color: "#ffc107" };
    default:
      return { color: "transparent" };
  }
};
export const getProjectStatus = (status: string): ProjectStatusTheme => {
  switch (status) {
    case ProjectStatus.draft:
      return { color: "#fff", backgroundColor: "#6c757d" }; // White text for better contrast
    case ProjectStatus.designBrief:
      return { color: "#fff", backgroundColor: "#007bff" }; // White text
    case ProjectStatus.designQuotation:
      return { color: "#fff", backgroundColor: "#17a2b8" }; // White text
    case ProjectStatus.onHold:
      return { color: "#000", backgroundColor: "#ffc107" }; // Black text
    case ProjectStatus.completed:
      return { color: "#fff", backgroundColor: "#28a745" }; // White text
    default:
      return { color: "#000", backgroundColor: "transparent" }; // Black text
  }
};
