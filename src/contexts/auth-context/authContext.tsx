"use client";
import { apiEndpoints } from "@/assets/constants/api-endpoints";
import { apiMethods, constants } from "@/assets/constants/constants";
import { frontendRoutes } from "@/assets/constants/frontend-routes";
import strings from "@/assets/strings/strings.json";
import { request } from "@/services/api";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSnackbar } from "../snackbar-context/snackbar-context";

import { getUpdatedParams } from "@/utils/getUpdatedParams";
import { cookieStorageAPI } from "@/services/storages";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, refreshToken: string, type: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const { openSnackbar } = useSnackbar();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const login = (token: string, refreshToken: string, type: string) => {
    setIsLoggedIn(true);

    cookieStorageAPI.set("token", { token: token, auth: true });
    cookieStorageAPI.set("refreshToken", refreshToken);

    router.replace(redirectPath ? redirectPath : frontendRoutes.DASHBOARD);
    router.refresh();
  };

  const logout = () => {
    const tokenData: { token: string; auth: boolean } = cookieStorageAPI.get(
      "token"
    ) || {
      token: "",
      auth: false,
    };
    const token = tokenData?.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    setIsLoggedIn(false);

    request(apiEndpoints.logout, apiMethods.GET, headers)
      .then((data: any) => {
        if (data.resultInfo.code === constants.SUCCCESS) {
          cookieStorageAPI.remove("token");
          cookieStorageAPI.remove("refreshToken");

          // router.refresh();
          // router.push(frontendRoutes.LOGIN);
          window.location.reload();
        }
      })
      .catch((error: any) => {
        openSnackbar(error.message || strings.logoutFailed, "error");
      })
      .finally(() => {});
  };

  useEffect(() => {
    const tokenData: { token: string; auth: boolean } = cookieStorageAPI.get(
      "token"
    ) || {
      token: "",
      auth: false,
    };

    if (tokenData?.token && tokenData?.auth) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
