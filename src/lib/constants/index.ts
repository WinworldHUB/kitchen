export const EMPTY_STRING = "";

export const DEFAULT_APP_VAR: AppVars = {
  isUserLoggedIn: false,
  accessToken: "",
  user_id: "",
  accessJWT: "",
  selectedMenuId: 0,
  activeProjects: [],
  selectedProjectId: null,
};

export const DEFAULT_USER_STATE: User = {
  fullName: "",
  email: "",
  phoneNo: "",
  address: "",
};

export enum PageRoutes {
  Home = "/",
  Archives = "/archives",
  Overview = "/projectDetails/overview/:projectId",
  Contractors = "/projectDetails/contractors/:projectId",
  DesignBrief = "/projectDetails/designBrief/:projectId",
  Payments = "/projectDetails/payments/:projectId",
  Documents = "/projectDetails/documents/:projectId",
  ProjectReports = "/projectDetails/projectReports/:projectId",
  Login = "/signIn",
  SignUp = "/signUp",
  UserProfile = "/userProfile",
  ForgotPassword = "/forgotPassword",
  Appliances = "/projectDetails/appliances/:projectId",
}

export const DEFAULT_LOCAL_STORAGE_KEY_FOR_APP_STATE = "MOIETY_APP_STATE";
export const DEFAULT_LOCAL_STORAGE_KEY_FOR_USER_STATE = "MOIETY_USER_STATE";
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

export enum ProjectStatus {
  draft = -1,
  designBrief = 0,
  designQuotation = 1,
  order = 2,
  install = 3,
  onHold = 4,
  completed = 5,
  archived = 6,
}

export const PROJECT_FILTERS: ProjectFilter[] = [
  {
    title: "Design Brief",
    value: ProjectStatus.designBrief,
  },
  {
    title: "Design Quotation",
    value: ProjectStatus.designQuotation,
  },
  {
    title: "Order",
    value: ProjectStatus.order,
  },
  {
    title: "Install",
    value: ProjectStatus.install,
  },
  {
    title: "Completed",
    value: ProjectStatus.completed,
  },
];

export const PROJECT_STATUS_STEPS_DATA = [
  {
    text: "Brief",
    isActive: true,
    isDone: true,
    status: ProjectStatus.designBrief,
  },
  {
    text: "Quotation",
    isActive: true,
    isDone: true,
    status: ProjectStatus.designQuotation,
  },
  {
    text: "Order",
    isActive: true,
    isDone: false,
    status: ProjectStatus.order,
  },
  {
    text: "Install",
    isActive: false,
    isDone: false,
    status: ProjectStatus.install,
  },
];

export const STYTCH_PROJECT_ID = {
  MINOR: "project-",
  MODE: "test-",
  MAJOR: "bb21c0a2-7d1a-4629-963b-771202ed4ed4",
};

export const STYTCH_SECRET_KEY = {
  MINOR: "secret-",
  MODE: "test-",
  MAJOR: "BjkyOoedFzPUTvFA3uZx1QlvzeTpONOoqOs=",
};

export const ENCODER_SECRET_KEY = "2ff493499f93c38bbd00f4a64941dc4e";

export const architectFormControls = [
  {
    controlId: "architectName",
    label: "Name",
    placeholder: "John Doe",
    type: "text",
  },
  {
    controlId: "architectCompany",
    label: "Company",
    placeholder: "Example XYZ",
    type: "text",
  },
  {
    controlId: "architectContact",
    label: "Contact",
    placeholder: "123456789",
    type: "text",
  },
  {
    controlId: "architectWebsite",
    label: "Website",
    placeholder: "www.example.com",
    type: "text",
  },
  {
    controlId: "architectEmail",
    label: "Email",
    placeholder: "john@example.com",
    type: "email",
  },
  {
    controlId: "architectAddress",
    label: "Address",
    placeholder: "XYZ street, XYZ area, 123456",
    type: "text",
  },
];

export const builderFormControls = [
  {
    controlId: "builderName",
    label: "Name",
    placeholder: "John Doe",
    type: "text",
  },
  {
    controlId: "builderCompany",
    label: "Company",
    placeholder: "Example XYZ",
    type: "text",
  },
  {
    controlId: "builderContact",
    label: "Contact",
    placeholder: "123456789",
    type: "text",
  },
  {
    controlId: "builderWebsite",
    label: "Website",
    placeholder: "www.example.com",
    type: "text",
  },
  {
    controlId: "builderEmail",
    label: "Email",
    placeholder: "john@example.com",
    type: "email",
  },
  {
    controlId: "builderAddress",
    label: "Address",
    placeholder: "XYZ street, XYZ area, 123456",
    type: "text",
  },
];

export const interiorDesignerFormControls = [
  {
    controlId: "interiorDesignerName",
    label: "Name",
    placeholder: "John Doe",
    type: "text",
  },
  {
    controlId: "interiorDesignerCompany",
    label: "Company",
    placeholder: "Example XYZ",
    type: "text",
  },
  {
    controlId: "interiorDesignerContact",
    label: "Contact",
    placeholder: "123456789",
    type: "text",
  },
  {
    controlId: "interiorDesignerWebsite",
    label: "Website",
    placeholder: "www.example.com",
    type: "text",
  },
  {
    controlId: "interiorDesignerEmail",
    label: "Email",
    placeholder: "john@example.com",
    type: "email",
  },
  {
    controlId: "interiorDesignerAddress",
    label: "Address",
    placeholder: "XYZ street, XYZ area, 123456",
    type: "text",
  },
];

export const DATA_TABLE_DEFAULT_STYLE = {
  rows: {
    style: {
      minHeight: "64px", // override the row height
    },
  },
  headCells: {
    style: {
      backgroundColor: "var(--bs-white)",
      color: "black",
      fontWeight: "bold",
      fontSize: "24px",
    },
  },
  cells: {
    style: {
      fontSize: "18px",
    },
  },
};


export const APPLIANCE_LIST: string[] = [
  "Ovens",
  "Coffee Machine",
  "Warming Drawer",
  "Range Cooker",
  "Hob",
  "Extractor",
  "Fridge",
  "Freezer",
  "Wine Cooler",
  "Dishwasher",
  "Washing Machine",
  "Tumble Dryer",
  "Washer/Dryer"
];


export const PROPERTY_LIST: string[] = [
  "Flat",
  "Detached",
  "Semi-detached",
  "Terraced",
  "Cottage",
  "Bungalow"
];


export enum ProjectType {
  NewExtension = "New/Extension",
  ExistingRenovation = "Existing/Renovation",
}