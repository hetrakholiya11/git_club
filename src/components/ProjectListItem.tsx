import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ArrowUpRight, Eye } from 'lucide-react';
import type { Project } from '../data/types';

interface ProjectListItemProps {
  project: Project;
  isSaved: boolean;
  onToggleSave: () => void;
  onQuickView: () => void;
}

export function ProjectListItem({
  project,
  isSaved,
  onToggleSave,
  onQuickView,
}: ProjectListItemProps) {
  const statusClass =
    project.status === 'Completed'
      ? 'status-completed'
      : project.status === 'In Progress'
        ? 'status-in-progress'
        : 'status-planning';

  return (
    <div className="project-list-row group rounded-xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Thumbnail + Titles */}
      <div className="flex items-start sm:items-center gap-4 min-w-0">
        <Link
          to={`/project/${project.id}`}
          className="relative w-20 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-themed-surface border border-themed"
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-lime)] font-semibold">
              {project.category}
            </span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusClass}`}>
              {project.status}
            </span>
          </div>

          <Link to={`/project/${project.id}`} className="block">
            <h3 className="text-sm sm:text-base font-bold text-themed group-hover:text-[var(--color-lime)] transition-colors truncate">
              {project.title}
            </h3>
          </Link>

          <p className="text-xs text-themed-muted truncate mt-0.5 max-w-xl">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Right: Technologies + Team + Actions */}
      <div className="flex items-center justify-between md:justify-end gap-3 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-themed/50">
        {/* Tech tags */}
        <div className="hidden lg:flex items-center gap-1.5 max-w-xs overflow-hidden">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-tag text-[10px]">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="tech-tag text-[10px] opacity-70">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Team Avatars */}
        <div className="flex items-center -space-x-1.5">
          {project.team.slice(0, 2).map((m) => (
            <div
              key={m.name}
              className="w-6 h-6 rounded-full bg-themed-surface border border-themed flex items-center justify-center text-[9px] font-bold text-themed-dim"
              title={m.name}
            >
              {m.avatar}
            </div>
          ))}
          {project.team.length > 2 && (
            <div className="w-6 h-6 rounded-full bg-themed-surface border border-themed flex items-center justify-center text-[9px] font-bold text-themed-dim">
              +{project.team.length - 2}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onQuickView}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-themed-dim hover:text-themed hover:bg-themed-surface transition-colors"
            title="Quick preview"
            aria-label={`Quick view ${project.title}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleSave}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-themed-dim hover:text-[var(--color-lime)] hover:bg-themed-surface transition-colors"
            aria-label={isSaved ? 'Remove bookmark' : 'Bookmark project'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-[var(--color-lime)]" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          <Link
            to={`/project/${project.id}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-themed-dim hover:text-[var(--color-lime)] hover:bg-themed-surface transition-colors"
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
