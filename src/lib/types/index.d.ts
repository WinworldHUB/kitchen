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
  status: string;
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
  isAdmin?: boolean;
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
  phoneNo: string;
  role: string;
};

type SignUpResponse = GeneralAPIResponse & {
  fullName: string;
  pfiId: number;
  user_id: string;
  session_duration: string;
  session_token: string;
  session_jwt: string;
  error: unknown;
  phoneNo: string;
  role: string;
};

type User = {
  fullName: string;
  email: string;
  phoneNo?: string;
  address?: string;
  role?: string;
};

type ResetPasswordRequest = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

type Contractor = {
  id?: string;
  name: string;
  company: string;
  contact: string;
  website: string;
  email: string;
  address: string;
  contractorType: string;
};

type Appliance = {
  id?: string;
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

type AddApplicanceRequest = {
  name: string;
  brand: string;
  type: string;
  additionalInfo?: string;
  referenceUrl?: string;
}

type GetProjectAppliancesResponse = GeneralAPIResponse & {
  appliances: Appliance[]
}


type DeleteAppliancesRequest = {
  applianceIds: string[];
};

interface ApplianceGroup {
  name: string;
  quantity: number;
  details: string[];
}


type EditApplianceRequest = {
  name: string;
  brand: string;
  type: string;
  additionalInfo?: string;
  referenceUrl?: string;
};

type GetUserResponse = GeneralAPIResponse & {
  fullName: string;
  email: string;
  phoneNo: string;
  role: string;
};

type UserProject = {
  id: string;
  title: string;
  address: string;
  userName: string;
  status: string;
}



type AddContractorRequest = {
  contractors: Contractor[];
}

type GetContractorsResponse = GeneralAPIResponse & {
  contractors: Contractor[];
}

type UpdateContractorRequest = {
  contractors: Contractor[];
}

type FileFormData = {
  measurements: File[];
  siteVideosAndPics: File[];
};