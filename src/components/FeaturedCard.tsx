import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ArrowUpRight, Star, Eye } from 'lucide-react';
import type { Project } from '../data/types';

interface FeaturedCardProps {
  project: Project;
  isSaved: boolean;
  onToggleSave: () => void;
  onQuickView?: () => void;
  variant: 'large' | 'medium';
}

export function FeaturedCard({
  project,
  isSaved,
  onToggleSave,
  onQuickView,
  variant,
}: FeaturedCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isLarge = variant === 'large';

  return (
    <div
      className={`featured-card group relative rounded-2xl border border-themed overflow-hidden bg-themed-card ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/10] md:aspect-[16/11]' : 'aspect-[16/10]'}`}>
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

        {/* Editorial Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-black/40 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[var(--color-lime)] text-[#090b0e] px-2.5 py-1 rounded-lg shadow-md font-bold">
            <Star className="w-3 h-3" fill="currentColor" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Spotlight</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white/90 border border-white/10">
            {project.category}
          </span>
        </div>

        {/* Quick View + Bookmark Actions */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView();
              }}
              className="w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-[var(--color-lime)] transition-colors"
              aria-label={`Quick preview for ${project.title}`}
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave();
            }}
            className="w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-[var(--color-lime)] transition-colors"
            aria-label={isSaved ? 'Remove from saved' : 'Save project'}
            id={`save-featured-${project.id}`}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4.5 h-4.5 text-[var(--color-lime)]" />
            ) : (
              <Bookmark className="w-4.5 h-4.5" />
            )}
          </button>
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              project.status === 'Completed'
                ? 'status-completed'
                : project.status === 'In Progress'
                  ? 'status-in-progress'
                  : 'status-planning'
            }`}>
              {project.status}
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-xs font-mono text-white/70">
              {project.team.length} contributors
            </span>
          </div>

          <Link to={`/project/${project.id}`} className="block group/link">
            <h3
              className={`font-bold text-white mb-2 leading-tight group-hover/link:text-[var(--color-lime)] transition-colors flex items-center gap-2 ${
                isLarge ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl'
              }`}
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-white/60 group-hover/link:text-[var(--color-lime)] transition-colors flex-shrink-0" />
            </h3>
          </Link>

          <p
            className={`text-white/80 leading-relaxed mb-4 max-w-2xl ${
              isLarge ? 'text-sm sm:text-base line-clamp-2' : 'text-xs sm:text-sm line-clamp-2'
            }`}
          >
            {project.tagline}
          </p>

          {/* Tech + Link */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, isLarge ? 5 : 3).map((tech) => (
                <span key={tech} className="tech-tag text-[10px] bg-black/60 border-white/20 text-white">
                  {tech}
                </span>
              ))}
              {project.technologies.length > (isLarge ? 5 : 3) && (
                <span className="text-[10px] font-mono text-white/60 self-center">
                  +{project.technologies.length - (isLarge ? 5 : 3)} more
                </span>
              )}
            </div>

            <Link
              to={`/project/${project.id}`}
              className="text-xs font-mono font-semibold text-[var(--color-lime)] hover:underline flex items-center gap-1"
            >
              Inspect Case Study →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
