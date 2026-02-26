import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { cn } from "../utils/cn";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "glass-dark py-3" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          SMR
        </motion.div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
          {["About", "Video Resume", "Skills", "Projects", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-emerald-400 transition-colors"
              >
                {item}
              </a>
            ),
          )}
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            href="https://github.com/shekhmohibur"
            target="_blank"
            className="glass px-4 py-2 rounded-full text-xs flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Github size={14} /> GitHub
          </motion.a>
        </div>
      </div>
    </nav>
  );
};
