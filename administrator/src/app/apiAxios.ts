import baseAxios, {
  AxiosInstance,
  // AxiosInterceptorManager,
  // AxiosRequestConfig,
  // AxiosResponse,
} from "axios";
// import { getCookie, setCookie } from "util/cookie";

// type CustomResponseFormat<T = any> = {
//   response: T;
//   ACCESS_TOKEN?: string;
//   REFRESH_TOKEN?: string;
// };
// interface CustomInstance extends AxiosInstance {
//   interceptors: {
//     request: AxiosInterceptorManager<AxiosRequestConfig>;
//     response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>;
//   };
//   getUri(config?: AxiosRequestConfig): string;
//   request<T>(config: AxiosRequestConfig): Promise<T>;
//   get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
//   delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
//   head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
//   options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
//   post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//   put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//   patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
// }

export const baseURL = `${process.env.REACT_APP_API}/api`;
const ACCESS_TOKEN = "access-token";
const REFRESH_TOKEN = "refresh-token";

const apiAxios: AxiosInstance = baseAxios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
// refresh token으로 요청을 보내고, access token을 계속 갱신받는다.?
// apiAxios.interceptors.request.use((request) => {
//   if (getCookie(REFRESH_TOKEN) !== undefined)
//     apiAxios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
//       REFRESH_TOKEN
//     )}`;
//   return request;
// });

// apiAxios.interceptors.response.use((response) => {
//   console.log("interceptor", response);
//   if (response.headers[ACCESS_TOKEN] !== undefined) {
//     console.log(response.headers[ACCESS_TOKEN]);
//     // setCookie(ACCESS_TOKEN, response.headers[ACCESS_TOKEN])
//   }

//   if (response.headers[REFRESH_TOKEN] !== undefined) {
//     console.log(response.headers[REFRESH_TOKEN]);
//     // setCookie(REFRESH_TOKEN, response.headers[REFRESH_TOKEN])
//   }

//   return response;
// });

export default apiAxios;
