import { Code2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface GitHubSectionProps {
  repos: any[];
}

export const GitHubSection = ({ repos }: GitHubSectionProps) => {
  return (
    <section
      id="github"
      className="py-24 px-6 max-w-7xl mx-auto"
      data-aos="fade-up"
    >
      <SectionHeading title="GitHub Activity" subtitle="Open Source" />
      <div
        className="glass p-8 md:p-12 rounded-3xl border-neutral-500/10"
        data-aos="zoom-in"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center text-neutral-400 overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/119482264?s=80"
                alt="S"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold">shekhmohibur</h3>
              <p className="text-neutral-500 font-mono text-sm">
                github.com/shekhmohibur
              </p>
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
            <div
              key={repo.name}
              className="p-6 glass rounded-2xl border-neutral-500/10 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <Code2 size={20} className="text-emerald-500" />
                <span className="text-[10px] font-mono text-neutral-500">
                  {repo.language}
                </span>
              </div>
              <h4 className="font-bold mb-2">{repo.name}</h4>
              <div className="flex items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  ★ {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  ⑂ {repo.forks_count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
