
import React from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ isDark, toggle }) => (
  <button onClick={toggle} className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
    {isDark ? <Sun size={18} /> : <Moon size={18} />}
  </button>
);

export default ThemeToggle;
