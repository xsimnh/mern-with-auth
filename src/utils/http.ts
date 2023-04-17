import { queryString } from "./url";

export const enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface RequestOptions extends RequestInit {
  url?: string;
  data?: BodyInit | null;
  params?: Record<string, any>;
  method?: HttpMethod;
}

export interface RequestError {
  name: string;
  code: number;
  message: string;
}

export type ReturnRequest<T> = Promise<T | void> & { cancel: () => void };

function sendRequest<T>(_options: RequestOptions) {
  const controller = new AbortController();
  const { url: _url, data, params, ...rest } = _options;
  const options: RequestOptions = Object.assign(
    {
      method: HttpMethod.GET,
      headers: {
        "Accept": "application/json",
        "Content-Type":
          data instanceof FormData ? "application/x-www-form-urlencoded" : "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : undefined,
      cache: "no-store",
      // credentials: "include",
      signal: controller.signal,
    },
    rest
  );
  let url = _url;
  if (params) {
    url += _url.indexOf("?") > -1 ? "&" : "?";
    url += queryString.stringify(params);
  }
  const request: ReturnRequest<T> = window
    .fetch(url, options)
    .then(async (response: Response) => {
      if (!response.ok) {
        throw { code: response.status, message: response.statusText };
      }
      const contentType = response.headers.get("content-type");
      if (contentType.includes("application/json")) {
        return response.json();
      }
      const contentDisposition = response.headers.get("content-disposition");
      let filename: string | null;
      if (contentDisposition) {
        filename = contentDisposition.split("filename*=UTF-8''")[1];
        if (filename) {
          filename = decodeURIComponent(filename);
        } else {
          filename = /filename="(.*)"/.exec(contentDisposition)[1];
        }
      }
      const blob = await response.blob();
      return { filename, blob };
    })
    .then((response: { filename?: string; blob?: Blob; code?: number; data?: T }) => {
      if (response.filename) {
        const link = document.createElement("a");
        link.download = response.filename;
        link.href = URL.createObjectURL(response.blob);
        link.click();
        URL.revokeObjectURL(link.href);
        return;
      }
      if (response.code === 200) {
        return response.data;
      }
      throw response;
    })
    .catch((error: RequestError | DOMException) => {
      if (error.name === "AbortError") {
        console.error(error.message);
      } else {
        errorHandler(error);
      }
    }) as ReturnRequest<T>;
  request.cancel = () => {
    controller.abort();
  };
  return request;
}

function errorHandler(error: RequestError) {
  const { code, message } = error;
  switch (code) {
    case 401:
    case 403:
    case 404:
    case 405:
    case 500:
      console.error("fetch error, code: " + code + ", message: " + message);
      break;
    default:
      throw error;
  }
}

export const http = {
  send: sendRequest,
  get: <T>(url: string, params?: Record<string, any>) => {
    return sendRequest<T>({ method: HttpMethod.GET, url, params });
  },
  post: <T>(url: string, data?: BodyInit | null, params?: Record<string, any>) => {
    return sendRequest<T>({ method: HttpMethod.POST, url, data, params });
  },
  put: <T>(url: string, data?: BodyInit | null, params?: Record<string, any>) => {
    return sendRequest<T>({ method: HttpMethod.PUT, url, data, params });
  },
  delete: <T>(url: string, data?: BodyInit | null, params?: Record<string, any>) => {
    return sendRequest<T>({ method: HttpMethod.DELETE, url, data, params });
  },
};
