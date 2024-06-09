import { apiEndpoints } from "@/assets/constants/api-endpoints";
import strings from "@/assets/strings/strings.json";
import { cookieStorageAPI } from "../storages";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_AUTH;

const refreshToken = async () => {
  const response = await fetch(`${baseUrl}${apiEndpoints.refreshToken}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "refresh-token": cookieStorageAPI.get("refreshToken"),
    },
  });

  if (!response.ok) {
    const responseData = await response.json();
    if (
      response.status === 401 &&
      responseData.resultInfo.code === "UNAUTHORIZED_ACCESS_IN_APPLICATIONS"
    ) {
      cookieStorageAPI.remove("token");
      cookieStorageAPI.remove("refreshToken");
      window.location.reload();
      throw new Error(strings.somethingWentWrong);
    }

    throw new Error(strings.somethingWentWrong);
  }

  const data = await response.json();
  const token = data?.data?.token;
  if (token) {
    cookieStorageAPI.set("token", { token: token, auth: true });
    return token;
  } else {
    cookieStorageAPI.remove("token");
    cookieStorageAPI.remove("refreshToken");
    window.location.reload();
    throw new Error(strings.somethingWentWrong);
  }
};

export const request = async (
  url: string,
  method: string,
  headers: Record<string, string> = {},
  body: any = null
): Promise<any> => {
  const makeRequest = async (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any
  ): Promise<any> => {
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const responseData = await response.json();

    if (!response.ok) {
      if (
        response.status === 401 &&
        responseData.code === "UNAUTHORIZED_ACCESS_IN_APPLICATIONS"
      ) {
        const newToken = await refreshToken();
        headers.Authorization = `Bearer ${newToken}`;

        // Retry the request with the new token
        return makeRequest(url, method, headers, body);
      } else {
        throw new Error(
          responseData?.resultInfo?.message || strings.somethingWentWrong
        );
      }
    }

    return responseData;
  };

  try {
    return await makeRequest(url, method, headers, body);
  } catch (error) {
    throw error;
  }
};
