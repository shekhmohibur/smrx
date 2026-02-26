import React from "react";
import { motion } from "motion/react";
import { Cpu, Terminal, Layers, Code2, Github } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export const SkillsSection = () => {
  const skills = [
    { name: "React", icon: <Cpu /> },
    { name: "Node.js", icon: <Terminal /> },
    { name: "Express", icon: <Layers /> },
    { name: "MongoDB", icon: <Layers /> },
    { name: "Tailwind", icon: <Cpu /> },
    { name: "Framer Motion", icon: <Cpu /> },
    { name: "Vite", icon: <Terminal /> },
    { name: "Git", icon: <Github /> },
    { name: "DaisyUI", icon: <Layers /> },
    { name: "Animate.css", icon: <Cpu /> },
  ];

  return (
    <section
      id="skills"
      className="py-24 px-6 max-w-7xl mx-auto"
      data-aos="fade-up"
    >
      <SectionHeading title="Tech Stack" subtitle="Tools & Technologies" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{
              y: -5,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
            }}
            className="glass p-6 rounded-2xl flex flex-col items-center gap-4 text-center group transition-all"
            data-aos="flip-left"
            data-aos-delay={i * 50}
          >
            <div className="text-neutral-500 group-hover:text-emerald-500 transition-colors">
              {React.cloneElement(skill.icon as React.ReactElement, {
                size: 32,
              })}
            </div>
            <span className="text-sm font-medium">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
