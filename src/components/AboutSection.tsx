import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 px-6 max-w-7xl mx-auto"
      data-aos="fade-up"
    >
      <SectionHeading title="About Me" subtitle="The Journey" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
          data-aos="fade-right"
        >
          <p className="text-lg text-neutral-500 leading-relaxed">
            I'm a 23-year-old developer with a Diploma in Engineering from
            Rangpur Polytechnic Institute. My passion lies in bridging the gap
            between design and technology.
          </p>
          <p className="text-lg text-neutral-500 leading-relaxed">
            I specialize in building responsive, accessible, and animated web
            applications using the MERN stack. I believe that every interaction
            should be meaningful and every pixel should have a purpose.
          </p>
          <div className="flex gap-6 pt-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-emerald-500">23</span>
              <span className="text-xs text-neutral-500 uppercase tracking-widest">
                Years Old
              </span>
            </div>
            <div className="w-px h-12 bg-neutral-500/20" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-cyan-400">Diploma</span>
              <span className="text-xs text-neutral-500 uppercase tracking-widest">
                Engineering
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-square max-w-md mx-auto"
          data-aos="fade-left"
        >
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative glass rounded-3xl overflow-hidden h-full flex items-center justify-center">
            <img
              src="https://avatars.githubusercontent.com/u/119482264?s=400&u=528b8a3ab360e942989b48ebb5c448eabb6657ac&v=4"
              alt="Sheikh Mahibur Rahman"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 left-8 right-8 glass p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-neutral-950 font-bold overflow-hidden">
                  <img
                    src="https://avatars.githubusercontent.com/u/119482264?s=40"
                    alt="S"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm">Sheikh Mahibur</div>
                  <div className="text-[10px] text-neutral-500">
                    MERN Stack Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
