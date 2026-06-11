"use client";

import { useEffect, useState } from "react";
import Cursor from "@/components/ui/static/Cursor";
import "../styles/globals.css";
import { FloatingSocials } from "@/components/ui/static/FloatingSocials";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return (
      <html lang="en">
        <body suppressHydrationWarning />
      </html>
    );
  }

  return (
    <html lang="en" data-theme={theme}>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <Cursor />
          <FloatingSocials />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}