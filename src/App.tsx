import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Navbar,
  LivePreviewModal,
  HeroSection,
  AboutSection,
  VideoResumeSection,
  SkillsSection,
  ProjectsSection,
  GitHubSection,
  ContactSection,
  Footer,
} from "./components";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/shekhmohibur/repos")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime(),
          )
          .slice(0, 6);

        setRepos(filtered);
      });
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      delay: 100,
    });
  }, []);

  const handlePreview = (url: string, title: string) => {
    setPreviewUrl(url);
    setPreviewTitle(title);
  };

  return (
    <div className="relative w-full min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] selection:bg-emerald-500/30 transition-colors duration-300">
      <Navbar />

      <LivePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        url={previewUrl || ""}
        title={previewTitle}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-60 origin-left"
        style={{ scaleX }}
      />

      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <VideoResumeSection />
        <SkillsSection />
        <ProjectsSection onPreview={handlePreview} />
        <GitHubSection repos={repos} />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
