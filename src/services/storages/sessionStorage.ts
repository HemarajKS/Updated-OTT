import { decryptData, encryptData } from "../crypto/crypto";

export const get = <T extends any>(key: string): T | null => {
  const data: string | null = sessionStorage.getItem(key) || "";
  const decryptedData: any = decryptData(data as string);
  return decryptedData ? (JSON.parse(decryptedData) as T | null) : null;
};

export const set = (key: string, data: any): void => {
  const stringData = JSON.stringify(data);
  const encryptedData = encryptData(stringData);
  sessionStorage.setItem(key, encryptedData);
};

export const remove = (key: string): void => {
  sessionStorage.removeItem(key);
};

export const clear = (): void => {
  sessionStorage.clear();
};
