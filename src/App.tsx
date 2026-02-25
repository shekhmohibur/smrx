import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import emailjs from "@emailjs/browser";
import { 
  Github, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Layers, 
  MessageSquare, 
  Mic,
  Terminal,
  CheckCircle2,
  Mail,
  ChevronDown,
  PlayCircle,
  X,
  Send,
  Globe,
  Sun,
  Moon,
  Monitor,
  Phone,
  Facebook,
  MessageCircle
} from 'lucide-react';
import { projects } from "./data/projectsData";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AOS from 'aos';
import 'aos/dist/aos.css';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = theme === 'system' ? systemTheme : theme;
    
    root.classList.remove('light', 'dark');
    root.classList.add(activeTheme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themes = [
    { name: 'light', icon: <Sun size={14} /> },
    { name: 'dark', icon: <Moon size={14} /> },
    { name: 'system', icon: <Monitor size={14} /> },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Sun size={18} /> : theme === 'dark' ? <Moon size={18} /> : <Monitor size={18} />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-90" onClick={() => setIsOpen(false)} />
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
                      : "hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "glass-dark py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          SMR<span className="text-emerald-500">.</span>V2
        </motion.div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
          {['About', 'Video Resume', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-emerald-400 transition-colors"
            >
              {item}
            </a>
          ))}
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

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 space-y-2">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-neutral-500 font-mono text-sm uppercase tracking-widest"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const LivePreviewModal = ({ isOpen, onClose, url, title }: { isOpen: boolean, onClose: () => void, url: string, title: string }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8"
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl h-full max-h-[90vh] glass-dark rounded-3xl overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm font-mono text-neutral-400 truncate max-w-50 md:max-w-none">{title} — Live Preview</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 bg-white">
            <iframe 
              src={url} 
              className="w-full h-full border-none"
              title={title}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
const [repos, setRepos] = useState([]);
  useEffect(() => {
    fetch("https://api.github.com/users/shekhmohibur/repos")
      .then((res) => res.json())
      .then((data) => {
        // Optional: filter, sort, limit
        const filtered = data
  .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  .slice(0, 6);

        setRepos(filtered);
      });
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      delay: 100,
    });
  }, []);

  const handlePreview = (url: string, title: string) => {
    setPreviewUrl(url);
    setPreviewTitle(title);
  };

const handleContactSubmit = async (e) => {
  e.preventDefault();

  try {
    await emailjs.send(
      "smrxMail",     // from EmailJS
      "template_9psctrt",    // main email template (to you)
      {
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
      },
      "w8Il48fkVMoHG4FM3"      // EmailJS public key
    );

    // Optional: success feedback
    alert("Message sent successfully!");

    // Reset form
    setContactForm({
      name: "",
      email: "",
      message: "",
    });

  } catch (error) {
    console.error("EmailJS error:", error);
    alert("Something went wrong. Please try again.");
  }
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
        
        {/* Hero Section */}
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
              A frontend-focused MERN Stack developer crafting smooth, high-performance digital experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="#projects" className="px-8 py-3 bg-emerald-500 text-neutral-950 font-bold rounded-full hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20">
                View Projects
              </a>
              <a href="#contact" className="px-8 py-3 glass font-bold rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
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

        {/* About Section */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto" data-aos="fade-up">
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
                I'm a 23-year-old developer with a Diploma in Engineering from Rangpur Polytechnic Institute. My passion lies in bridging the gap between design and technology.
              </p>
              <p className="text-lg text-neutral-500 leading-relaxed">
                I specialize in building responsive, accessible, and animated web applications using the MERN stack. I believe that every interaction should be meaningful and every pixel should have a purpose.
              </p>
              <div className="flex gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-emerald-500">23</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest">Years Old</span>
                </div>
                <div className="w-px h-12 bg-neutral-500/20" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-cyan-400">Diploma</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest">Engineering</span>
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
                      <img src="https://avatars.githubusercontent.com/u/119482264?s=40" alt="S" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Sheikh Mahibur</div>
                      <div className="text-[10px] text-neutral-500">MERN Stack Developer</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Resume Section */}
        <section id="video-resume" className="py-24 px-6 bg-neutral-500/5" data-aos="zoom-in">
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
                <source src="https://youtu.be/a39rulFFJlM?si=UQYJUAncGoF2gLOc" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Overlay for "Replace Me" - Hidden when video is active but kept as a small hint */}
              <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-mono text-neutral-500 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                Click to Watch
              </div>
            </motion.div>
            <p className="text-center mt-6 text-neutral-500 text-sm italic">
              *Click the video to watch my story and learn more about my journey as a developer.*
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto" data-aos="fade-up">
          <SectionHeading title="Tech Stack" subtitle="Tools & Technologies" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'React', icon: <Cpu /> },
              { name: 'Node.js', icon: <Terminal /> },
              { name: 'Express', icon: <Layers /> },
              { name: 'MongoDB', icon: <Layers /> },
              { name: 'Tailwind', icon: <Cpu /> },
              { name: 'Framer Motion', icon: <Cpu /> },
              { name: 'TypeScript', icon: <Code2 /> },
              { name: 'Vite', icon: <Terminal /> },
              { name: 'Git', icon: <Github /> },
              { name: 'DaisyUI', icon: <Layers /> },
              { name: 'Animate.css', icon: <Cpu /> },
              { name: 'Redux', icon: <Layers /> },
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                className="glass p-6 rounded-2xl flex flex-col items-center gap-4 text-center group transition-all"
                data-aos="flip-left"
                data-aos-delay={i * 50}
              >
                <div className="text-neutral-500 group-hover:text-emerald-500 transition-colors">
                  {React.cloneElement(skill.icon as React.ReactElement, { size: 32 })}
                </div>
                <span className="text-sm font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
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
              onClick={() => handlePreview(project.demoUrl, project.title)}
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

        {/* GitHub Section */}
        <section id="github" className="py-24 px-6 max-w-7xl mx-auto" data-aos="fade-up">
          <SectionHeading title="GitHub Activity" subtitle="Open Source" />
          <div className="glass p-8 md:p-12 rounded-3xl border-neutral-500/10" data-aos="zoom-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center text-neutral-400 overflow-hidden">
                  <img src="https://avatars.githubusercontent.com/u/119482264?s=80" alt="S" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">shekhmohibur</h3>
                  <p className="text-neutral-500 font-mono text-sm">github.com/shekhmohibur</p>
                </div>
              </div>
              <a 
                href="https://github.com/shekhmohibur" 
                target="_blank"
                className="px-6 py-2 glass rounded-full text-sm font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Follow on GitHub
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <div key={repo.name} className="p-6 glass rounded-2xl border-neutral-500/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <Code2 size={20} className="text-emerald-500" />
                    <span className="text-[10px] font-mono text-neutral-500">{repo.language}</span>
                  </div>
                  <h4 className="font-bold mb-2">{repo.name}</h4>
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">★ {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1">⑂ {repo.forks_count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto" data-aos="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8" data-aos="fade-right">
              <SectionHeading title="Let's Build Something Great" subtitle="Contact" />
              <p className="text-xl text-neutral-500 leading-relaxed">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-emerald-500">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">Email</div>
                    <a href="mailto:mohibur.rahman2003@gmail.com" className="font-bold hover:text-emerald-500 transition-colors">mohibur.rahman2003@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-blue-500">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">Phone / WhatsApp</div>
                    <a href="tel:+8801849314613" className="font-bold hover:text-blue-500 transition-colors">+8801849314613</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-green-500">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">WhatsApp Direct</div>
                    <a href="https://wa.me/8801849314613" target="_blank" className="font-bold hover:text-green-500 transition-colors">Chat on WhatsApp</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-blue-600">
                    <Facebook size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">Facebook</div>
                    <a href="https://facebook.com/mdmohib01" target="_blank" className="font-bold hover:text-blue-600 transition-colors">fb.com/mdmohib01</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-cyan-500">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">GitHub</div>
                    <a href="https://github.com/shekhmohibur" target="_blank" className="font-bold hover:text-cyan-500 transition-colors">github.com/shekhmohibur</a>
                  </div>
                </div>
              </div>
            </div>

            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleContactSubmit}
              className="glass p-8 md:p-12 rounded-3xl space-y-6 border-neutral-500/10"
              data-aos="fade-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full bg-neutral-500/5 border border-neutral-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full bg-neutral-500/5 border border-neutral-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full bg-neutral-500/5 border border-neutral-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-emerald-500 text-neutral-950 font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20"
              >
                Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-neutral-500/10 text-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-neutral-500">
              © 2026 Shekh Mohibur Rahman. Learning from mistakes and building the future.
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/shekhmohibur" target="_blank" className="text-neutral-500 hover:text-emerald-500 transition-colors"><Github size={18} /></a>
              <a href="https://facebook.com/mdmohib01" target="_blank" className="text-neutral-500 hover:text-blue-600 transition-colors"><Facebook size={18} /></a>
              <a href="mailto:mohibur.rahman2003@gmail.com" className="text-neutral-500 hover:text-emerald-500 transition-colors"><Mail size={18} /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
