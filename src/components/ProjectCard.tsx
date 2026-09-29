import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ArrowUpRight, Eye } from 'lucide-react';
import type { Project } from '../data/types';

interface ProjectCardProps {
  project: Project;
  isSaved: boolean;
  onToggleSave: () => void;
  onQuickView?: () => void;
  index?: number;
}

export function ProjectCard({
  project,
  isSaved,
  onToggleSave,
  onQuickView,
  index = 0,
}: ProjectCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const statusClass =
    project.status === 'Completed'
      ? 'status-completed'
      : project.status === 'In Progress'
        ? 'status-in-progress'
        : 'status-planning';

  const delay = Math.min(index, 7);

  return (
    <div
      className={`project-card group rounded-2xl border border-themed bg-themed-card overflow-hidden animate-fade-in-up opacity-0 stagger-${delay + 1}`}
    >
      {/* Image Container with Hover Reveal */}
      <div className="relative aspect-[16/10] overflow-hidden bg-themed-secondary">
        {!imgLoaded && <div className="absolute inset-0 img-loading" />}
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`card-image w-full h-full object-cover transition-opacity duration-300 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Quick View Button on Image Hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-200 pointer-events-none">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView();
              }}
              className="pointer-events-auto px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 hover:bg-[var(--color-lime)] hover:text-[#090b0e] transition-colors shadow-lg"
              aria-label={`Quick preview for ${project.title}`}
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
          )}
        </div>

        {/* Bookmark & Detail Arrow (Top Corners) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[var(--color-lime)] font-semibold border border-white/10">
            {project.category}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave();
            }}
            className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-[var(--color-lime)] transition-colors"
            aria-label={isSaved ? 'Remove from saved' : 'Save project'}
            id={`save-${project.id}`}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-[var(--color-lime)]" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between">
        <div>
          {/* Status row */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusClass}`}>
              {project.status}
            </span>
            <span className="text-[11px] font-mono text-themed-dim">
              {new Date(project.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          {/* Title */}
          <Link to={`/project/${project.id}`} className="block group/link">
            <h3 className="text-base font-bold text-themed mb-1.5 group-hover/link:text-[var(--color-lime)] transition-colors leading-snug flex items-center justify-between gap-2">
              <span className="truncate">{project.title}</span>
              <ArrowUpRight className="w-4 h-4 text-themed-dim opacity-0 group-hover:opacity-100 group-hover:text-[var(--color-lime)] -translate-x-1 group-hover:translate-x-0 transition-all flex-shrink-0" />
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-themed-muted mb-4 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        <div>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="tech-tag text-[10px]">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="tech-tag text-[10px] opacity-70">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Footer: Team & Case Study Link */}
          <div className="flex items-center justify-between pt-3 border-t border-themed/60">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center -space-x-2">
                {project.team.slice(0, 3).map((member) => (
                  <div
                    key={member.name}
                    className="w-6 h-6 rounded-full bg-themed-surface flex items-center justify-center text-[9px] font-bold text-themed-muted border border-themed"
                    title={`${member.name} — ${member.role}`}
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-themed-dim ml-1">
                {project.team.length} {project.team.length === 1 ? 'member' : 'members'}
              </span>
            </div>

            <Link
              to={`/project/${project.id}`}
              className="text-xs font-mono font-medium text-themed-muted group-hover:text-[var(--color-lime)] transition-colors flex items-center gap-1"
            >
              Case Study
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
