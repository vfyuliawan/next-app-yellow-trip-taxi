import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Swal from "sweetalert2";

const timeOut = 90000; 

export const baseUrl = (): string => {
  const dev = `https://extra-brooke-yeremiadio-46b2183e.koyeb.app`;
  const uat = `https://extra-brooke-yeremiadio-46b2183e.koyeb.app`;
  return dev;
};

export enum CallBackError {
  NetworkError = "Network Error",
}

export const header = async (isNeedToken:boolean) => { 
  const token = "Bearer" + " " + localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    // language: "IDN",
    Authorization: isNeedToken ? token : "" ,
  };
};

axios.interceptors.request.use((request) => {
  console.debug("-------------------------------------------------------");
  console.debug("METHOD : ", request.method);
  console.debug("URL : ", request.url);
  console.debug("REQUEST HEADER : ", request.headers);
  console.debug("REQUEST BODY : ", JSON.stringify(request.data));
  console.debug("");
  console.debug("REQUEST...");
  console.debug("-------------------------------------------------------");
  return request;
});

axios.interceptors.response.use(
  (response) => {
    const resultResponse: AxiosResponse = response;
    console.debug("");
    console.debug("-------------------------------------------------------");
    console.debug("RESPONSE : ");
    console.debug("RESPONSE REQUEST URL: ", resultResponse.request._url);
    console.debug("RESPONSE STATUS : ", response.status);
    console.debug("RESPONSE HEADER : ", response.headers);
    console.debug("RESPONSE BODY : ", JSON.stringify(response.data));
    console.debug("-------------------------------------------------------");
    return response;
  },
  (error) => {
    const errorResponse: AxiosResponse = error.response;
    console.debug("");
    console.debug("-------------------------------------------------------");
    if (error.message !== "Network Error") {
      console.debug("RESPONSE REQUEST URL: ", errorResponse.request._url);
    }
    console.debug("RESPONSE STATUS : ", error.response.status);
    console.debug("RESPONSE HEADER : ", error.response.headers);
    console.debug("RESPONSE BODY : ", error.response.data);
    console.debug("-------------------------------------------------------");

    return Promise.reject(error);
  }
);

export type ErrorMessageType = (msg?: AxiosError) => string;

async function RequestData(
  config: AxiosRequestConfig,
  isErrorCreate: boolean,
  errorMessage?: ErrorMessageType,
  dismissable?: boolean
): Promise<any> {
  try {
    const resp = await axios(config);
    console.log(resp.status, "response status");

    if (resp.status === 200 || resp.status === 201) {
      if (resp.data.code === "00") {
        return JSON.stringify(resp.data);
      }
      return JSON.stringify(resp.data);
    }

    if (resp.status === 400) {
      const errorMessage = resp.data.message || "Invalid request data";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return null;
    }

    if ([401, 403, 404, 500, 503].includes(resp.status)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return null;
    }

    return null;
  } catch (error: any) {
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data.error.message|| error.message;
    
      if (statusCode === 400) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: errorMessage || "Invalid identifier or password",
        });
      } else if(statusCode === 401){
        Swal.fire({
          icon: "info",
          title: "Info",
          text: "Anda Perlu Login Untuk Mengakses Dashboard",
        });

      } else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage || "Something went wrong",
        });
      }
    } else if (error.message === "Network Error") {
      // Handle network errors
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your internet connection.",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else {
      // General error handling
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: error.message || "An unexpected error occurred.",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }

    return null;
  } finally {
    console.debug("::FINISH::");
    console.debug("-------------------------------------------------------");
    console.debug("");
  }
}

interface FetchInterface {
  path: string;
  isErrorCreate?: boolean;
  dismissable?: boolean;
  isNeedToken: boolean;
  reqBody: {};
  errorMessage?: ErrorMessageType;
}

export async function post(props: FetchInterface) {
  return RequestData(
    {
      method: "POST",
      url: baseUrl() + props.path,
      headers: await header(props.isNeedToken),
      data: props.reqBody,
      timeout: timeOut,
      timeoutErrorMessage: "Request Timeout",
    },
    props.isErrorCreate ?? false,
    props.errorMessage,
    props.dismissable
  );
}

interface FetchInterfaceGet {
  path: string;
  params?: object;
  isNeedToken: boolean;
  isError?: boolean;
}

export async function getImage(props: FetchInterfaceGet) {
  return RequestData(
    {
      method: "GET",
      url: props.path,
      headers: await header(props.isNeedToken),
      timeout: timeOut,
      timeoutErrorMessage: "Request Timeout",
      params: props.params,
    },
    props.isError ?? false
  );
}

export async function get(props: FetchInterfaceGet) {
  return RequestData(
    {
      method: "GET",
      url: baseUrl() + props.path,
      headers: await header(props.isNeedToken),
      timeout: timeOut,
      timeoutErrorMessage: "Request Timeout",
      params: props.params,
    },
    props.isError ?? false
  );
}

export async function put(props: FetchInterface) {
    return RequestData(
    {
      method: "PUT",
      url: baseUrl() + props.path,
      headers: await header(props.isNeedToken),
      data: props.reqBody,
      timeout: timeOut,
      timeoutErrorMessage: "Request Timeout",
    },
    props.isErrorCreate ?? false
  );
}

export async function patch(props: FetchInterface) {
  return RequestData(
    {
      method: "PATCH",
      url: baseUrl() + props.path,
      headers: await header(props.isNeedToken),
      data: props.reqBody,
      timeout: timeOut,
      timeoutErrorMessage: "Request Timeout",
    },
    props.isErrorCreate ?? false
  );
}

export async function deleted(props: FetchInterface) {
  return RequestData(
    {
      method: "DELETE",
      url: baseUrl() + props.path,
      headers: await header(props.isNeedToken),
      data: props.reqBody,
      timeout: timeOut,
      timeoutErrorMessage: "Request Timeout",
    },
    props.isErrorCreate ?? false
  );
}
