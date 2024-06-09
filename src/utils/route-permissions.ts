import { constants } from "@/assets/constants/constants";
import { cookieStorageAPI } from "@/services/storages";

export const setRoutePermissions = (route: string): void => {
  const existingRoutes: string[] =
    cookieStorageAPI.get(constants.ROUTE_PERMISSIONS) || [];

  const routeExists = existingRoutes.includes(route);

  if (!routeExists) {
    existingRoutes.push(route);
    cookieStorageAPI.set(constants.ROUTE_PERMISSIONS, existingRoutes);
  }
};

export const getRoutePermissions = (route: string): boolean => {
  const existingRoutes: string[] =
    cookieStorageAPI.get(constants.ROUTE_PERMISSIONS) || [];

  return !!existingRoutes.includes(route);
};

export const deleteRoutePermissions = (route: string): void => {
  let existingRoutes: string[] =
    cookieStorageAPI.get(constants.ROUTE_PERMISSIONS) || [];

  existingRoutes = existingRoutes.filter(
    (existingRoute) => existingRoute !== route
  );

  cookieStorageAPI.set(constants.ROUTE_PERMISSIONS, existingRoutes);
};

export const deleteAllRoutePermissions = (): void => {
  cookieStorageAPI.set(constants.ROUTE_PERMISSIONS, []);
};
