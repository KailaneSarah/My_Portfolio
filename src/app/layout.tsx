"use client";

import { useEffect, useState } from "react";
import Cursor from "@/components/ui/static/Cursor";
import "../styles/globals.css";
import { FloatingSocials } from "@/components/ui/static/FloatingSocials";

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
      <html lang="pt-BR">
        <body />
      </html>
    );
  }

  return (
    <html lang="pt-BR" data-theme={theme}>
      <body>
        <Cursor />       
        <FloatingSocials />   
        {children}
      </body>
    </html>
  );
}