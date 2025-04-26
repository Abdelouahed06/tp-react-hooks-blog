import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`btn btn-${theme === 'light' ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label={`Passer au thème ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      <i className={`bi bi-${theme === 'light' ? 'moon' : 'sun'}`}></i>
    </button>
  );
}