import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  Layers,
  Users,
  Zap,
  CheckCircle2,
  Sparkles,
  Command,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Bookmark,
  BookmarkCheck,
  Star,
} from 'lucide-react';
import type { Project } from '../data/types';

interface HeroSectionProps {
  projects: Project[];
  onOpenCommandPalette: () => void;
  onOpenSubmitModal: () => void;
  onQuickView: (project: Project) => void;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
}

export function HeroSection({
  projects,
  onOpenCommandPalette,
  onOpenSubmitModal,
  onQuickView,
  isSaved,
  toggleSave,
}: HeroSectionProps) {
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);

  // Statistics derived directly from dataset
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const allTech = [...new Set(projects.flatMap((p) => p.technologies))];
    const allMembers = [
      ...new Set(projects.flatMap((p) => p.team.map((m) => m.name))),
    ];
    const completedCount = projects.filter(
      (p) => p.status === 'Completed'
    ).length;
    const completionRate =
      totalProjects > 0 ? Math.round((completedCount / totalProjects) * 100) : 0;

    return {
      totalProjects,
      totalTech: allTech.length,
      totalMembers: allMembers.length,
      completionRate,
    };
  }, [projects]);

  // Featured projects for the hero spotlight
  const featuredList = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    return featured.length > 0 ? featured : projects.slice(0, 3);
  }, [projects]);

  const currentSpotlight = featuredList[activeSpotlightIndex % featuredList.length];

  const handleNextSpotlight = () => {
    setActiveSpotlightIndex((prev) => (prev + 1) % featuredList.length);
  };

  const handlePrevSpotlight = () => {
    setActiveSpotlightIndex(
      (prev) => (prev - 1 + featuredList.length) % featuredList.length
    );
  };

  const scrollToProjects = () => {
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 grid-texture overflow-hidden border-b border-themed">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[var(--color-lime)]/[0.035] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[var(--color-lime)]/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Beacon / Breadcrumb */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-themed-surface border border-themed animate-fade-in-up stagger-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-lime)] animate-pulse-lime" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-themed font-medium">
                CHARUSAT Git Club // Build Archive 2026
              </span>
            </div>

            {/* Oversized Editorial Headline */}
            <div className="animate-fade-in-up stagger-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-themed">
                Where Student Developers{' '}
                <span className="inline-block relative">
                  <span className="relative z-10 text-[var(--color-lime)]">
                    Build The Future.
                  </span>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-2.5 bg-[var(--color-lime)]/20 -rotate-1 rounded"
                    aria-hidden="true"
                  />
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-themed-muted max-w-xl leading-relaxed animate-fade-in-up stagger-3">
              An open-source showcase of breakthrough applications, machine learning models, and IoT systems engineered by student innovators at CHARUSAT.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 animate-fade-in-up stagger-4">
              <button
                onClick={scrollToProjects}
                id="explore-projects-btn"
                className="btn-lime px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <span>Explore Archive</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCommandPalette}
                id="hero-command-btn"
                className="btn-outline px-4 py-3 rounded-xl text-sm font-mono flex items-center gap-2 hover:border-[var(--color-lime)] hover:text-[var(--color-lime)]"
                title="Search with Command Palette"
              >
                <Command className="w-4 h-4 text-themed-dim" />
                <span className="text-xs">Quick Search</span>
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-themed-surface border border-themed font-mono">
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={onOpenSubmitModal}
                id="hero-submit-btn"
                className="btn-outline px-4 py-3 rounded-xl text-xs font-mono flex items-center gap-1.5 text-themed-muted hover:text-themed"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-lime)]" />
                <span>Submit Build</span>
              </button>
            </div>

            {/* Dataset Statistics Bar */}
            <div className="pt-6 border-t border-themed/80 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up stagger-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-themed-surface flex items-center justify-center flex-shrink-0 border border-themed">
                  <Layers className="w-4 h-4 text-[var(--color-lime)]" />
                </div>
                <div>
                  <p className="text-xl font-bold font-mono text-themed">
                    {stats.totalProjects}
                  </p>
                  <p className="text-[11px] text-themed-dim font-mono uppercase tracking-wider">
                    Projects
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-themed-surface flex items-center justify-center flex-shrink-0 border border-themed">
                  <Zap className="w-4 h-4 text-[var(--color-lime)]" />
                </div>
                <div>
                  <p className="text-xl font-bold font-mono text-themed">
                    {stats.totalTech}
                  </p>
                  <p className="text-[11px] text-themed-dim font-mono uppercase tracking-wider">
                    Tech Stacks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-themed-surface flex items-center justify-center flex-shrink-0 border border-themed">
                  <Users className="w-4 h-4 text-[var(--color-lime)]" />
                </div>
                <div>
                  <p className="text-xl font-bold font-mono text-themed">
                    {stats.totalMembers}
                  </p>
                  <p className="text-[11px] text-themed-dim font-mono uppercase tracking-wider">
                    Builders
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-themed-surface flex items-center justify-center flex-shrink-0 border border-themed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xl font-bold font-mono text-themed">
                    {stats.completionRate}%
                  </p>
                  <p className="text-[11px] text-themed-dim font-mono uppercase tracking-wider">
                    Live / Ready
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Feature Card */}
          {currentSpotlight && (
            <div className="lg:col-span-5 animate-fade-in-up stagger-3">
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[var(--color-lime)]/20 via-themed/40 to-transparent">
                <div className="bg-themed-card rounded-2xl border border-themed overflow-hidden shadow-2xl">
                  {/* Spotlight Top Bar */}
                  <div className="px-4 py-3 bg-themed-secondary border-b border-themed flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-lime)]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>Spotlight of the Week</span>
                      </div>
                    </div>

                    {/* Spotlight mini switcher */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-themed-dim mr-1">
                        {activeSpotlightIndex + 1} / {featuredList.length}
                      </span>
                      <button
                        onClick={handlePrevSpotlight}
                        className="w-6 h-6 rounded bg-themed-surface flex items-center justify-center text-themed-dim hover:text-themed border border-themed"
                        aria-label="Previous spotlight"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleNextSpotlight}
                        className="w-6 h-6 rounded bg-themed-surface flex items-center justify-center text-themed-dim hover:text-themed border border-themed"
                        aria-label="Next spotlight"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Spotlight Image & Overlays */}
                  <div className="relative aspect-[16/10] overflow-hidden group">
                    <img
                      src={currentSpotlight.thumbnail}
                      alt={currentSpotlight.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-black/30 to-transparent" />

                    {/* Interactive buttons on image */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => onQuickView(currentSpotlight)}
                        className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1 hover:bg-[var(--color-lime)] hover:text-[#090b0e] transition-colors"
                        aria-label="Quick view spotlight"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Preview
                      </button>

                      <button
                        onClick={() => toggleSave(currentSpotlight.id)}
                        className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-[var(--color-lime)] transition-colors"
                        aria-label={isSaved(currentSpotlight.id) ? 'Remove bookmark' : 'Bookmark spotlight'}
                      >
                        {isSaved(currentSpotlight.id) ? (
                          <BookmarkCheck className="w-4 h-4 text-[var(--color-lime)]" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-lime)] text-[#090b0e] font-bold">
                        {currentSpotlight.category}
                      </span>
                    </div>
                  </div>

                  {/* Spotlight Details */}
                  <div className="p-5 space-y-3">
                    <Link to={`/project/${currentSpotlight.id}`} className="block group/spot">
                      <h3 className="text-lg font-bold text-themed group-hover/spot:text-[var(--color-lime)] transition-colors">
                        {currentSpotlight.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-themed-muted line-clamp-2 leading-relaxed">
                      {currentSpotlight.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentSpotlight.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="tech-tag text-[10px]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-themed flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center -space-x-1.5">
                          {currentSpotlight.team.slice(0, 3).map((m) => (
                            <div
                              key={m.name}
                              className="w-5 h-5 rounded-full bg-themed-surface border border-themed text-[8px] font-bold flex items-center justify-center text-themed-dim"
                              title={m.name}
                            >
                              {m.avatar}
                            </div>
                          ))}
                        </div>
                        <span className="text-[11px] text-themed-dim">
                          {currentSpotlight.team.length} contributors
                        </span>
                      </div>

                      <Link
                        to={`/project/${currentSpotlight.id}`}
                        className="text-xs font-mono font-bold text-[var(--color-lime)] flex items-center gap-1 hover:underline"
                      >
                        Read Case Study
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
