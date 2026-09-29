import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  GitFork,
  ArrowRight,
  Target,
  Wrench,
  CheckCircle2,
  Calendar,
  Users,
} from 'lucide-react';
import type { Project } from '../data/types';

interface QuickViewModalProps {
  project: Project | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function QuickViewModal({
  project,
  onClose,
  isSaved,
  onToggleSave,
}: QuickViewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const statusClass =
    project.status === 'Completed'
      ? 'status-completed'
      : project.status === 'In Progress'
        ? 'status-in-progress'
        : 'status-planning';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Quick Preview`}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-themed-card border border-themed rounded-2xl shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px var(--border-light)',
        }}
      >
        {/* Header Image & Overlay */}
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden bg-themed-secondary">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-black/40 to-transparent" />

          {/* Action buttons on top of image */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={onToggleSave}
              className="w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center text-themed hover:text-[var(--color-lime)] transition-colors"
              aria-label={isSaved ? 'Remove from saved' : 'Save project'}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4.5 h-4.5 text-[var(--color-lime)]" />
              ) : (
                <Bookmark className="w-4.5 h-4.5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center text-themed hover:text-[var(--color-lime)] transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-lime)] font-semibold">
                {project.category}
              </span>
              <span className="text-white/40">•</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusClass}`}>
                {project.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tagline */}
          <p className="text-base text-themed font-medium leading-relaxed">
            {project.tagline}
          </p>

          {/* Problem & Solution Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-themed-surface border border-themed/80">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-themed uppercase tracking-wider">
                <Target className="w-4 h-4 text-[var(--color-lime)]" />
                Problem
              </div>
              <p className="text-xs text-themed-muted leading-relaxed line-clamp-4">
                {project.problemStatement}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-themed-surface border border-themed/80">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-themed uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-[var(--color-lime)]" />
                Solution
              </div>
              <p className="text-xs text-themed-muted leading-relaxed line-clamp-4">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features preview */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-themed-dim mb-2.5">
              Key Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.slice(0, 4).map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-themed-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-lime)] flex-shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-themed-dim mb-2.5">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Team and metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-themed">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-themed-dim" />
              <div className="flex items-center gap-1">
                {project.team.map((m) => (
                  <span
                    key={m.name}
                    className="text-xs px-2 py-0.5 rounded bg-themed-surface text-themed border border-themed"
                    title={m.role}
                  >
                    {m.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-themed-dim">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-themed">
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
            </div>

            <Link
              to={`/project/${project.id}`}
              onClick={onClose}
              className="btn-lime px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              Open Full Case Study
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
