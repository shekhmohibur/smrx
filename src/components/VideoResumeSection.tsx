import { motion } from "motion/react";
import { SectionHeading } from "./SectionHeading";

export const VideoResumeSection = () => {
  return (
    <section
      id="video-resume"
      className="py-24 px-6 bg-neutral-500/5"
      data-aos="zoom-in"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Video Resume" subtitle="Watch My Story" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full max-w-4xl mx-auto aspect-video glass rounded-3xl overflow-hidden shadow-2xl group bg-black"
        >
          <video
            className="w-full h-full object-cover"
            controls
            poster="https://i.imgur.com/kr3MkUP.png"
            preload="metadata"
          >
            <source
              src="https://youtu.be/a39rulFFJlM?si=UQYJUAncGoF2gLOc"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Overlay for "Replace Me" - Hidden when video is active but kept as a small hint */}
          <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-mono text-neutral-500 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
            Click to Watch
          </div>
        </motion.div>
        <p className="text-center mt-6 text-neutral-500 text-sm italic">
          *Click the video to watch my story and learn more about my journey as
          a developer.*
        </p>
      </div>
    </section>
  );
};
