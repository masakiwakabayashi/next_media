import React, { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300
        ${theme === "light" ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"}
      `}
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};
