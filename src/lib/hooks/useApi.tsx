import { useContext, useState } from "react";
import {
  API_BASE_URL,
  DEFAULT_FORM_DATA_HEADER,
  DEFAULT_GET_API_HEADER,
  DEFAULT_POST_API_HEADER,
} from "../constants/api-constants";
import { AppContext } from "../contexts/appcontext";
import { getEncodedJson } from "../utils/encrypt.utils";

interface APIState<T> {
  data: T;
  /**
   * API Get method.
   * @param url: Url of the endpoint starting with '/'
   * @returns: Requested object or array of objects
   */
  getData: (url: string) => Promise<T>;
  /**
   * API Post Method.
   * @param url: Url of the endpoint starting with '/'
   * @param body: Object to be passed as parameter for the Post API Method.
   * @returns: Added object with additional details like id, etc...
   */
  postData: (url: string, body: unknown) => Promise<T>;
  /**
   * API Put Method.
   * @param url: Url of the endpoint starting with '/'
   * @param body: Object to be passed as parameter for the Put API Method.
   * @returns: Updated record with additional details like id, etc...
   */
  putData: (url: string, body: unknown) => Promise<T>;
  /**
   * API Delete Method.
   * @param url: Url of the endpoint starting with '/' and ending with id.
   *
   * For example: /api/v1/users/1
   * @returns: Deleted record
   */
  deleteData: (url: string) => Promise<T>;
  /**
   * API Post Method for form data.
   * @param url: Url of the endpoint starting with '/'
   * @param formData: Form data to be passed as parameter for the Post API Method.
   * @returns: Added object with additional details like id, etc...
   */
  postFormData: (url: string, formData: FormData) => Promise<T>;
}

const useApi = <T,>(baseUrl?: string): APIState<T> => {
  const [data, setData] = useState<T>();
  const { appState } = useContext(AppContext);

  /**
   * API Get method.
   * @param url: Url of the endpoint starting with '/'
   * @returns: Requested object or array of objects
   */
  const getData = async (url: string) => {
    try {
      const response = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "GET",
        headers: DEFAULT_GET_API_HEADER(appState.accessJWT),
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
      return data;
    } catch (error) {
      console.error("GET request failed:", error);
      return undefined; // Propagate the error to the caller
    }
  };

  /**
   * API Post Method.
   * @param url: Url of the endpoint starting with '/'
   * @param body: Object to be passed as parameter for the Post API Method.
   * @returns: Added record with additional details like id, etc...
   */
  const postData = async (url: string, body: unknown) => {
    try {
      const response = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "POST",
        body: getEncodedJson(body),
        headers: DEFAULT_POST_API_HEADER(appState.accessJWT),
      });

      if (!response.ok) {
        throw new Error(`Error posting data: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
      return data;
    } catch (error) {
      console.error("POST request failed:", error);
      return undefined;
    }
  };

  /**
   * API Put Method.
   * @param url: Url of the endpoint starting with '/'
   * @param body: Object to be passed as parameter for the Put API Method.
   * @returns: Updated record with additional details like id, etc...
   */
  const putData = async (url: string, body: unknown) => {
    try {
      const response = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "PUT",
        body: getEncodedJson(body),
        headers: DEFAULT_POST_API_HEADER(appState.accessJWT),
      });

      if (!response.ok) {
        throw new Error(`Error updating data: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
      return data;
    } catch (error) {
      console.error("PUT request failed:", error);
      return undefined;
    }
  };

  /**
   * API Delete Method.
   * @param url: Url of the endpoint starting with '/' and ending with id.
   *
   * For example: /api/v1/users/1
   * @returns: Deleted record
   */
  const deleteData = async (url: string) => {
    try {
      const response = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "DELETE",
        headers: DEFAULT_POST_API_HEADER(appState.accessJWT),
      });

      if (!response.ok) {
        throw new Error(`Error deleting data: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
      return data;
    } catch (error) {
      console.error("DELETE request failed:", error);
      return undefined;
    }
  };
  /**
   * API Post Method for multipart form data.
   * @param url: Url of the endpoint starting with '/'
   * @param formData: FormData object containing files or other form fields
   * @returns: Response data from server after file upload
   */
  const postFormData = async (url: string, formData: FormData) => {
    try {
      const response = await fetch(`${baseUrl ?? API_BASE_URL}${url}`, {
        method: "POST",
        body: formData,
        headers: DEFAULT_FORM_DATA_HEADER(appState.accessJWT),
      });

      if (!response.ok) {
        throw new Error(`Error posting form data: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
      return data;
    } catch (error) {
      console.error("POST form data request failed:", error);
      return undefined;
    }
  };

  return { data, getData, postData, putData, deleteData, postFormData };
};

export default useApi;
