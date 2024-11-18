export const DEFAULT_GET_API_HEADER = (session_jwt: string) => {
  return {
    Authorization: `Bearer ${session_jwt}`,
  };
};
export const DEFAULT_POST_API_HEADER = (session_jwt: string) => {
  return {
    Authorization: `Bearer ${session_jwt}`,
    "Content-Type": "application/json",
  };
};

export const DEFAULT_FORM_DATA_HEADER = (session_jwt: string) => {
  return {
    Authorization: `Bearer ${session_jwt}`,
  };
};
export const API_BASE_URL = "https://main.d7yplbx88vqq4.amplifyapp.com";
// export const API_BASE_URL = "http://localhost:3000";

export const TEST_APIS = {
  GET_API: "https://reqres.in/api/users?page=2",
  POST_API: "https://reqres.in/api/users",
};

export const USER_APIS = {
  SIGNUP_USER_API: "/user/signup",
  LOGIN_USER_API: "/user/login",
  GET_USER_BY_EMAIL_API: "/user/email",
  GET_USER_BY_ID_API: "/user",
  UPDATE_USER_API: "/user",
  CHANGE_PASSWORD_API: "/user/reset-password",
  LOGOUT_USER_API: "/user/logout",
};

export const PROJECT_APIS = {
  CREATE_PROJECT_API: "/project/create",
  GET_PROJECTS_API: "/project/user/get",
  GET_PROJECT_BY_ID_API: "/project/get",
  DELETE_PROJECT_API: "/project",
  UPDATE_PROJECT_API: "/project",
  UPLOAD_PROJECT_DOCUMENT_API: "/project/docs/upload",
  GET_PROJECT_DOCUMENTS_API: "/project/docs/get",
};

export const APPLIANCE_APIS = {
  ADD_APPLIANCE_API: "/appliance/project",
  GET_APPLIANCES_API: "/appliance/project",
  DELETE_APPLIANCE_API: "/appliance",
  UPDATE_APPLIANCE_API: "/appliance",
};