import { motion } from "motion/react";
import { Github, ExternalLink, Globe } from "lucide-react";
import { projects } from "../data/projectsData";
import { SectionHeading } from "./SectionHeading";

interface ProjectsProps {
  onPreview: (url: string, title: string) => void;
}

export const ProjectsSection = ({ onPreview }: ProjectsProps) => {
  return (
    <section
      id="projects"
      className="py-24 px-6 max-w-7xl mx-auto"
      data-aos="fade-up"
    >
      <SectionHeading title="Featured Projects" subtitle="Recent Work" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="glass rounded-3xl overflow-hidden group border-neutral-500/10"
            data-aos={project.aos}
          >
            {/* Image */}
            <div className="aspect-video bg-neutral-500/10 overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[hsl(var(--background))] via-transparent to-transparent" />

              {/* Tags */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`glass px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-${tag.color}-500`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onPreview(project.demoUrl, project.title)}
                  className={`px-6 py-2 bg-${project.accent}-500 text-neutral-950 font-bold rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg shadow-${project.accent}-500/20`}
                >
                  <Globe size={18} /> Live Demo
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    className={`text-neutral-500 hover:text-${project.accent}-500 transition-colors`}
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.demoUrl}
                    className={`text-neutral-500 hover:text-${project.accent}-500 transition-colors`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <p className="text-neutral-500 leading-relaxed">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
