import "@/styles/globals.css";
import { useEffect, useContext } from 'react';
import type { AppProps } from "next/app";
import { ThemeProvider, ThemeContext } from "@/contexts/ThemeContext";

const BodyClass = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('BodyClass must be used within a ThemeProvider');
  }

  const { theme } = context;

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return null;
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <BodyClass />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
