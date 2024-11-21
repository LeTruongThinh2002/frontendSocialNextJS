"use client";
import store, { persistor } from "@/redux/store";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </PersistGate>
    </Provider>
  );
}
