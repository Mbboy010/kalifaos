"use client";

import { Sun, Moon } from "lucide-react";

interface ToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Toggle = ({ darkMode, setDarkMode }: ToggleProps) => {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex justify-center items-center h-full mr-2">
      <label
        htmlFor="toggle"
        className="relative inline-flex items-center justify-center w-12 h-6 cursor-pointer"
      >
        <input
          type="checkbox"
          id="toggle"
          className="opacity-0 w-0 h-0"
          checked={darkMode}
          onChange={toggleTheme}
        />
        {/* Background */}
        <span
          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            darkMode ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></span>
        {/* Toggle Indicator (Circle) */}
        <span
          className={`absolute top-0 left-0 w-6 h-6 rounded-full border transition-transform duration-300 transform ${
            darkMode
              ? "translate-x-6 border-blue-700 bg-blue-500"
              : "border-gray-400 bg-white"
          } flex justify-center items-center`}
        >
          {darkMode ? (
            <Moon className="w-3 h-3 text-white" />
          ) : (
            <Sun className="w-3 h-3 text-yellow-500" />
          )}
        </span>
      </label>
    </div>
  );
};

export default Toggle;