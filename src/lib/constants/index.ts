export const EMPTY_STRING = "";

export const DEFAULT_APP_VAR: AppVars = {
  isUserLoggedIn: false,
  accessToken: "",
  selectedMenuId: 0,
  activeProjects: [],
  selectedProjectId: null,
};

export enum PageRoutes {
  Home = "/",
  Archives = "/archives",
  ProjectDetails = "/projectDetails",
  Login = "/signIn",
  SignUp = "/signUp",
  UserProfile = "/userProfile",
}

export const DEFAULT_LOCAL_STORAGE_KEY_FOR_APP_STATE = "W4R_LS_APP_STATE";

export const DEFAULT_PROJECT_ADDRESS =
  "19 Temple Fortune Parade, Finchley Rd, London NW11 0QS";

export const APP_CONVERSION_DATE_FORMAT = "dd/MM/yyyy";
export const APP_SHORT_DATE_FORMAT = "dd MMM yyyy";
export const APP_AWS_DATE_FORMAT = "yyyy-MM-dd";
export const APP_LONG_DATE_FORMAT = "DDDD";
export const APP_ORDER_NUMBER_FORMAT = "yyyy/dd/#";

export const NO_ACTIVE_PROJECTS_MESSAGE =
  "No projects to show, start by creating a project";
export const NO_ARCHIVED_PROJECTS_MESSAGE = "No projects to show";

export const GBP_SYMBOL = "£";
export const DEFAULT_KITCHEN_IMAGE =
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const enum ProjectStatus {
  draft = "Draft",
  designBrief = "Design brief",
  designQuotation = "Design & Quotation",
  order = "Order",
  install = "Install",
  onHold = "On Hold",
  completed = "Completed",
  archived = "Archived",
}

export const PROJECT_FILTERS = [
  ProjectStatus.designBrief,
  ProjectStatus.designQuotation,
  ProjectStatus.order,
  ProjectStatus.install,
  ProjectStatus.completed,
];
