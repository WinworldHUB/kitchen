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
// export const API_BASE_URL = "https://main.d7yplbx88vqq4.amplifyapp.com";
export const API_BASE_URL = "http://localhost:3000";

export const TEST_APIS = {
  GET_API: "https://reqres.in/api/users?page=2",
  POST_API: "https://reqres.in/api/users",
};

export const PRODUCTS_APIS = {
  GET_ALL_PRODUCTS_API: "/products",
  ADD_PRODUCT_API: "/products",
  IMPORT_PRODUCTS_API: "/products/imports",
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

export const ORDERS_APIS = {
  GET_ALL_ORDERS_API: "/orders",
  ADD_ORDER_API: "/orders",
  UPDATE_ORDER_API: "/orders",
};

export const INVOICES_APIS = {
  GET_ALL_INVOICES_API: "/invoices",
  UPDATE_INVOICE_API: "/invoices",
};

export const COGNITO_ERROR_CODE = [
  "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED",
];
