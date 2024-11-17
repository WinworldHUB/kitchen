type ProjectFilter = {
  title: string;
  value: number;
};

type ProjectStatusStep = {
  text: string;
  isActive: boolean;
  isDone: boolean;
  status: number;
};

interface DataTableProps<T> {
  title?: string;
  initialData: T[];
}

type MenuItem = {
  id: number;
  label: string;
  icon: React.ReactElement;
  route: string;
};

interface LayoutProps {
  isShowSideMenu?: boolean;
  children?: React.ReactNode;
  username?: string;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

type Project = {
  id: string | null;
  title: string;
  address: string;  // `notNull` in schema
  status: number;
  userId: string;   // Added to match schema
  user: string;     // Added to match schema
  propertyType: string;

  isExistingProject: boolean;
  isInteriorDesignerAppointed?: boolean;
  isPitchedCeiling?: boolean;
  isSkylights?: boolean;
  isStepInKitchen?: boolean;

  architectName?: string;
  builderName?: string;
  interiorDesignerName?: string;
  ceilingHeight?: string;
  numberOfSkylights?: number;
  skylightDetails?: string;
  kitchenStepsDetails?: string;
};

interface ProjectProps {
  project: Project;
  onProjectUpdate: (project: Project) => void;
}

type AddressSummary = {
  status: number;
  message: string;
  noOfItems: number;
  result: Result;
};

type Result = {
  postcode: string;
  district: string;
  ward: string;
  county: string;
  country: string;
  geocode: Geocode;
  addresses: Address[];
};

type Geocode = {
  eastings: string;
  northings: string;
  lattitude: string;
  longitude: string;
};

type Address = {
  building_name: string;
  po_box: string;
  organisation_name: string;
  line_2: string;
  postcode: string;
  postcode_type: string;
  line_3: string;
  department_name: string;
  su_organisation_indicator: string;
  building_number: string;
  udprn: string;
  thoroughfare: string;
  postcode_incode: string;
  line_1: string;
  address: string;
  postcode_outcode: string;
  postcode_compact: string;
  double_dependant_locality: string;
  dependant_thoroughfare: string;
  premise: string;
  sub_building_name: string;
  post_town: string;
  dependant_locality: string;
  delivery_point_suffix: string;
};

type AppVars = {
  isUserLoggedIn?: boolean;
  accessToken?: string;
  accessJWT?: string;
  user_id?: string;
  selectedMenuId?: number;
  activeProjects?: Project[];
  selectedProjectId?: string;
};

interface AppState {
  appState: AppVars;

  updateAppState: (appState: AppVars) => void;
}

type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = GeneralAPIResponse & {
  email: string;
};

type GeneralAPIResponse = {
  success: boolean;
  message: string;
  error?: unknown;
};

type LoginResponse = GeneralAPIResponse & {
  fullName: string;
  user_id: string;
  session_duration: string;
  session_token: string;
  session_jwt: string;
  error: unknown;
};

type SignUpResponse = GeneralAPIResponse & {
  fullName: string;
  pfiId: number;
  user_id: string;
  session_duration: string;
  session_token: string;
  session_jwt: string;
  error: unknown;
};

type User = {
  fullName: string;
  email: string;
  phoneNo?: string;
  address?: string;
};

type ResetPasswordRequest = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

type Contractor = {
  name: string;
  company: string;
  contact: string;
  website: string;
  email: string;
  address: string;
};

type Appliance = {
  name: string;
  brand: string;
  type: string;
  additionalInfo?: string;
  referenceUrl?: string;
};

type Payment = {
  paymentSchedule: string;
  dueDate: string;
  status: string;
};
interface FileData {
  ETag: string;
  ServerSideEncryption: string;
  Location: string;
  Key: string;
  Bucket: string;
}

type UploadFileResponse = GeneralAPIResponse & {
  data: FileData[];
};

type GetDocument = {
  key: string;
  lastModified: string;
  size: number;
};

type ProjectDocsData = {
  userDocs: GetDocument[];
  moietyDocs: GetDocument[];
}

type GetProjectDocsResponse = GeneralAPIResponse & {
  data: ProjectDocsData;
};


type CreateProjectResponse = GeneralAPIResponse & {
  projectId: string;
}

type CreateProjectRequest = {
  title: string;
  address: string;
  propertyType: string;
  isExistingProject: boolean;
}

type GetProjectsResponse = GeneralAPIResponse & {
  projects: Project[]
  user: string
}

type GetProjectResponse = GeneralAPIResponse & {
  project: Project
  user: string
}