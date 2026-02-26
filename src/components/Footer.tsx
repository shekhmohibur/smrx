import { Github, Facebook, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-neutral-500/10 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-neutral-500">
          © 2026 Shekh Mohibur Rahman. Learning from mistakes and building the
          future.
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com/shekhmohibur"
            target="_blank"
            className="text-neutral-500 hover:text-emerald-500 transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://facebook.com/mdmohib01"
            target="_blank"
            className="text-neutral-500 hover:text-blue-600 transition-colors"
          >
            <Facebook size={18} />
          </a>
          <a
            href="mailto:mohibur.rahman2003@gmail.com"
            className="text-neutral-500 hover:text-emerald-500 transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
