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
  isEditable?: boolean;
  data: T[];
  onCreateClick?: VoidFunction;
  onRowClicked?: Dispatch<SetStateAction<Order>>;
  onDataImport?: (data: T[]) => void;
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
  id: string;
  featuredImage?: string;
  title: string;
  address?: string;
  phone?: string;

  isExistingProject?: boolean;
  isKnockDownWall?: boolean;
  isArchitectAppointed?: boolean;
  isPlanningApproved?: boolean;
  isBuilderAppointed?: boolean;
  isInteriorDesignerAppointed?: boolean;
  isPitchedCeiling?: boolean;
  isSkylights?: boolean;
  isStepInKitchen?: boolean;

  knockDownWallDetails?: string;
  architectName?: string;
  builderName?: string;
  interiorDesignerName?: string;
  ceilingHeight?: string;
  numberOfSkylights?: string;
  skylightDetails?: string;
  kitchenStepsDetails?: string;

  propertyType?: string;
  status: number;
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
  selectedMenuId?: number;
  activeProjects?: Project[];
  selectedProjectId?: string;
};

interface AppState {
  appState: AppVars;

  updateAppState: (appState: AppVars) => void;
}
