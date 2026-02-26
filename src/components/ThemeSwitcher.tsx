import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "../utils/cn";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const activeTheme = theme === "system" ? systemTheme : theme;

    root.classList.remove("light", "dark");
    root.classList.add(activeTheme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themes = [
    { name: "light", icon: <Sun size={14} /> },
    { name: "dark", icon: <Moon size={14} /> },
    { name: "system", icon: <Monitor size={14} /> },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Sun size={18} />
        ) : theme === "dark" ? (
          <Moon size={18} />
        ) : (
          <Monitor size={18} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-90"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 glass-dark p-1 rounded-xl min-w-30 z-100 shadow-xl"
            >
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setTheme(t.name as any);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs capitalize transition-colors",
                    theme === t.name
                      ? "bg-emerald-500 text-neutral-950 font-bold"
                      : "hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100",
                  )}
                >
                  {t.icon} {t.name}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
