"use client";
import { SnackbarContextType } from "@/interfaces/interfaces";
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

const SnackbarContext = createContext<SnackbarContextType>({
  open: false,
  message: "",
  openSnackbar: () => {},
  closeSnackbar: () => {},
});

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<any>("info");

  const openSnackbar = (newMessage: string, severity: string) => {
    setMessage(newMessage);
    setOpen(true);
    setSeverity(severity);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  const value = {
    open,
    message,
    severity,
    openSnackbar,
    closeSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
