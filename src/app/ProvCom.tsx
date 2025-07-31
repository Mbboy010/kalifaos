"use client";

import Footer from '../components/footer/Footer';
import Navigate from "../components/navigate/Navigate";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../components/redux/hooks';
import { setColor } from "@/components/redux/slicer/color";
import RouteTracker from "./View"

export function ProvCom({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isColor = useAppSelector((state) => state.color.value);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true; // Default to dark on server
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true; // Default to dark if no theme saved
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      if (!isColor) dispatch(setColor(true));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      if (isColor) dispatch(setColor(false));
    }
    console.log(darkMode)
    console.log(isColor)
  }, [darkMode, dispatch, isColor]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Navigate setDarkMode={setDarkMode} darkMode={darkMode} />
      <RouteTracker />
      {children}
     <Footer />

    </div>
  );
}