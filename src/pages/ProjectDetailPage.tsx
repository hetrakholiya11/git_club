import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  GitFork,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Users,
  Lightbulb,
  Target,
  Wrench,
  CheckCircle2,
  Share2,
  Check,
  Clock,
  Maximize2,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';
import { projects, getProjectTimeline } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectDetailPageProps {
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  allProjects?: typeof projects;
}

export function ProjectDetailPage({
  toggleSave,
  isSaved,
  allProjects = projects,
}: ProjectDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [heroImgLoaded, setHeroImgLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const project = allProjects.find((p) => p.id === id);

  // Scroll to top on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveScreenshot(0);
    setHeroImgLoaded(false);
  }, [id]);

  // Prev / Next project in archive
  const { prevProject, nextProject } = useMemo(() => {
    if (!project) return { prevProject: null, nextProject: null };
    const index = allProjects.findIndex((p) => p.id === project.id);
    return {
      prevProject: index > 0 ? allProjects[index - 1] : null,
      nextProject: index < allProjects.length - 1 ? allProjects[index + 1] : null,
    };
  }, [project, allProjects]);

  // Related projects
  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return allProjects
      .filter((p) => p.id !== project.id && p.category === project.category)
      .slice(0, 3);
  }, [project, allProjects]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center animate-fade-in max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-themed-surface border border-themed flex items-center justify-center mx-auto mb-4 text-[var(--color-lime)]">
            <Layers className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-themed mb-2">
            Project Not Found
          </h2>
          <p className="text-sm text-themed-muted mb-6">
            The project you&apos;re looking for doesn&apos;t exist or may have been updated in this archive session.
          </p>
          <Link
            to="/"
            className="btn-lime px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  const saved = isSaved(project.id);
  const statusClass =
    project.status === 'Completed'
      ? 'status-completed'
      : project.status === 'In Progress'
        ? 'status-in-progress'
        : 'status-planning';

  const allImages = [project.thumbnail, ...project.screenshots];
  const timelineMilestones = getProjectTimeline(project);

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="pt-16 pb-20 animate-fade-in">
      {/* Hero Banner with Cinematic Overlay */}
      <div className="relative h-[320px] sm:h-[420px] md:h-[480px] overflow-hidden bg-themed-secondary">
        {!heroImgLoaded && <div className="absolute inset-0 img-loading" />}
        <img
          src={project.thumbnail}
          alt={project.title}
          onLoad={() => setHeroImgLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            heroImgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-black/60 to-black/30" />

        {/* Top Floating Navigation */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20">
          <button
            onClick={() => navigate(-1)}
            id="back-btn"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-mono font-medium hover:bg-[var(--color-lime)] hover:text-[#090b0e] transition-colors border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-mono hover:text-[var(--color-lime)] transition-colors border border-white/10"
              title="Share project link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleSave(project.id)}
              id="detail-save-btn"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-mono hover:text-[var(--color-lime)] transition-colors border border-white/10"
            >
              {saved ? (
                <BookmarkCheck className="w-4 h-4 text-[var(--color-lime)]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span>{saved ? 'Saved' : 'Bookmark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10">
        {/* Header Metadata Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-themed-card border border-themed shadow-2xl mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-lime)] font-bold">
              {project.category}
            </span>
            <span className="text-themed-dim">•</span>
            <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${statusClass}`}>
              {project.status}
            </span>
            <span className="text-themed-dim">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-themed-dim">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <span className="text-themed-dim">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-themed-dim">
              <Clock className="w-3.5 h-3.5" />
              <span>4 min read</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-themed leading-tight mb-3">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-themed-muted max-w-3xl leading-relaxed mb-6">
            {project.tagline}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            ) : (
              <span className="px-4 py-2.5 rounded-xl text-xs font-mono border border-themed text-themed-dim opacity-60 flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Demo Offline (Lab Deployment)
              </span>
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-5 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2"
              >
                <GitFork className="w-4 h-4" />
                GitHub Repository
              </a>
            ) : (
              <span className="px-4 py-2.5 rounded-xl text-xs font-mono border border-themed text-themed-dim opacity-60 flex items-center gap-2">
                <GitFork className="w-3.5 h-3.5" />
                Private Campus Repo
              </span>
            )}
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Editorial Case Study Columns */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Section */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[var(--color-lime)]" />
                <h2 className="text-lg font-bold text-themed">Executive Overview</h2>
              </div>
              <p className="text-sm sm:text-base text-themed-muted leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* Problem & Solution Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem */}
              <div className="p-5 sm:p-6 rounded-2xl bg-themed-surface border border-themed space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-themed">
                  <Target className="w-4 h-4 text-rose-400" />
                  <span>The Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-themed-muted leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>

              {/* Solution */}
              <div className="p-5 sm:p-6 rounded-2xl bg-themed-surface border border-themed space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-themed">
                  <Wrench className="w-4 h-4 text-[var(--color-lime)]" />
                  <span>The Architecture Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-themed-muted leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-lime)]" />
                <h2 className="text-lg font-bold text-themed">Key Capabilities & Features</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-themed-surface/60 border border-themed/80 flex items-start gap-3 text-xs sm:text-sm text-themed-muted"
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--color-lime)] mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots Gallery & Lightbox Trigger */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-themed">Interface Gallery & Previews</h2>
                <span className="text-xs font-mono text-themed-dim">
                  {activeScreenshot + 1} of {allImages.length}
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-themed group bg-themed-surface">
                <img
                  src={allImages[activeScreenshot]}
                  alt={`${project.title} screenshot ${activeScreenshot + 1}`}
                  className="w-full aspect-video object-cover"
                />

                {/* Lightbox trigger button */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1.5 hover:bg-[var(--color-lime)] hover:text-[#090b0e] transition-colors"
                  aria-label="Expand image to fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </button>

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveScreenshot((prev) =>
                          prev === 0 ? allImages.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveScreenshot((prev) =>
                          prev === allImages.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails row */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveScreenshot(i)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        i === activeScreenshot
                          ? 'border-[var(--color-lime)] scale-105'
                          : 'border-themed opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`Select screenshot ${i + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Development Timeline (Clearly Labeled Demonstration Data) */}
            <section className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-themed">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--color-lime)]" />
                  <h2 className="text-lg font-bold text-themed">
                    Development Timeline & Milestones
                  </h2>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-themed-surface text-[var(--color-lime)] border border-themed">
                  DEMONSTRATION TIMELINE DATA
                </span>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-themed">
                {timelineMilestones.map((m, idx) => {
                  const isDone = m.status === 'completed';
                  const isCurrent = m.status === 'in-progress';
                  return (
                    <div key={idx} className="relative group">
                      {/* Timeline dot beacon */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-400 text-black'
                            : isCurrent
                              ? 'bg-[var(--color-lime)] border-[var(--color-lime)] ring-4 ring-[var(--color-lime)]/20 animate-pulse'
                              : 'bg-themed-surface border-themed text-themed-dim'
                        }`}
                      />

                      <div className="p-4 sm:p-5 rounded-xl bg-themed-surface/70 border border-themed space-y-1.5 transition-colors hover:border-themed-light">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-mono uppercase font-bold text-[var(--color-lime)]">
                            {m.phase}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-themed-dim">
                              {m.date}
                            </span>
                            <span
                              className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                isDone
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : isCurrent
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    : 'bg-themed-card text-themed-dim border border-themed'
                              }`}
                            >
                              {m.status}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-themed">
                          {m.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-themed-muted leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Card */}
            <div className="rounded-2xl border border-themed bg-themed-card p-6 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-themed-dim">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Members Card */}
            <div className="rounded-2xl border border-themed bg-themed-card p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--color-lime)]" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-themed-dim">
                  Core Engineering Team
                </h3>
              </div>
              <div className="space-y-3">
                {project.team.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-themed-surface border border-themed flex items-center justify-center text-xs font-bold text-themed">
                      {m.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-themed">{m.name}</p>
                      <p className="text-xs text-themed-dim font-mono">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metadata Spec */}
            <div className="rounded-2xl border border-themed bg-themed-card p-6 space-y-3 text-xs">
              <h3 className="text-xs font-mono uppercase tracking-wider text-themed-dim mb-2">
                Project Specification
              </h3>
              <div className="divide-y divide-themed">
                <div className="py-2 flex justify-between">
                  <span className="text-themed-dim">Category</span>
                  <span className="font-mono text-themed">{project.category}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-themed-dim">Repository</span>
                  <span className="font-mono text-themed">
                    {project.githubUrl ? 'Public Open Source' : 'Campus Private'}
                  </span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-themed-dim">Deployment</span>
                  <span className="font-mono text-themed">
                    {project.liveUrl ? 'Active Demo' : 'Internal Cluster'}
                  </span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-themed-dim">Status</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${statusClass}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next Project Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-8 border-t border-themed">
          {prevProject ? (
            <Link
              to={`/project/${prevProject.id}`}
              className="p-4 rounded-xl bg-themed-card border border-themed hover:border-[var(--color-lime)] transition-colors group flex items-center gap-3"
            >
              <ChevronLeft className="w-5 h-5 text-themed-dim group-hover:text-[var(--color-lime)]" />
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase text-themed-dim">Previous Project</p>
                <p className="text-sm font-bold text-themed truncate group-hover:text-[var(--color-lime)]">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              to={`/project/${nextProject.id}`}
              className="p-4 rounded-xl bg-themed-card border border-themed hover:border-[var(--color-lime)] transition-colors group flex items-center justify-end gap-3 text-right"
            >
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase text-themed-dim">Next Project</p>
                <p className="text-sm font-bold text-themed truncate group-hover:text-[var(--color-lime)]">
                  {nextProject.title}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-themed-dim group-hover:text-[var(--color-lime)]" />
            </Link>
          )}
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="pt-12 border-t border-themed">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-lime)] font-bold">
                  Explore More
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-themed">
                  Related in {project.category}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((rp, i) => (
                <ProjectCard
                  key={rp.id}
                  project={rp}
                  isSaved={isSaved(rp.id)}
                  onToggleSave={() => toggleSave(rp.id)}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close enlarged preview"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={allImages[activeScreenshot]}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
