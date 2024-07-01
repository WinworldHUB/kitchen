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
  description?: string;
  status: string;
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
