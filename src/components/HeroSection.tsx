import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass px-4 py-1.5 rounded-full text-xs font-mono text-emerald-400 border-emerald-500/20 inline-block mb-4"
        >
          Available for new opportunities
        </motion.div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
          Shekh <span className="text-gradient">Mohibur</span> Rahman
        </h1>
        <p className="text-lg md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          A frontend-focused MERN Stack developer crafting smooth,
          high-performance digital experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="https://smrx.vercel.app/smr-cv.pdf"
            download="smr-cv.pdf"
            className="px-8 py-3 bg-emerald-500 text-neutral-950 font-bold rounded-full hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="px-8 py-3 glass font-bold  rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
          >
            Let's Talk
          </a>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};
