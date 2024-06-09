import * as localStorageFunctions from "./localStorage";
import * as sessionStorageFunctions from "./sessionStorage";
import * as cookieStorageFunctions from "./cookieStorage";

export const localStorageAPI = {
  get: localStorageFunctions.get,
  set: localStorageFunctions.set,
  remove: localStorageFunctions.remove,
  clear: localStorageFunctions.clear,
};

export const sessionStorageAPI = {
  get: sessionStorageFunctions.get,
  set: sessionStorageFunctions.set,
  remove: sessionStorageFunctions.remove,
  clear: sessionStorageFunctions.clear,
};

export const cookieStorageAPI = {
  get: cookieStorageFunctions.get,
  set: cookieStorageFunctions.set,
  remove: cookieStorageFunctions.remove,
  clear: cookieStorageFunctions.clear,
  check: cookieStorageFunctions.check,
};
