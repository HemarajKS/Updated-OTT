"use client";

import Snackbar from "@/components/Snackbar/Snackbar";
import { AuthProvider } from "@/contexts/auth-context/authContext";
import { SnackbarProvider } from "@/contexts/snackbar-context/snackbar-context";
import { FC, ReactNode } from "react";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <SnackbarProvider>
        {children}
        <Snackbar />
      </SnackbarProvider>
    </AuthProvider>
  );
};

export default Providers;
