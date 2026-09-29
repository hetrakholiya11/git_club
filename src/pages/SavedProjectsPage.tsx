import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Trash2,
  ArrowLeft,
  Search,
  Download,
  Check,
  Sparkles,
} from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { QuickViewModal } from '../components/QuickViewModal';
import type { Project } from '../data/types';

interface SavedProjectsPageProps {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  clearAll: () => void;
  allProjects?: Project[];
}

export function SavedProjectsPage({
  savedIds,
  toggleSave,
  isSaved,
  clearAll,
  allProjects = projects,
}: SavedProjectsPageProps) {
  const [search, setSearch] = useState('');
  const [exported, setExported] = useState(false);
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);

  const savedProjects = useMemo(
    () => allProjects.filter((p) => savedIds.includes(p.id)),
    [allProjects, savedIds]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return savedProjects;
    const q = search.toLowerCase();
    return savedProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }, [savedProjects, search]);

  const recommendedProjects = useMemo(() => {
    return allProjects.filter((p) => !savedIds.includes(p.id)).slice(0, 3);
  }, [allProjects, savedIds]);

  const handleExport = () => {
    try {
      const exportData = savedProjects.map((p) => ({
        id: p.id,
        title: p.title,
        tagline: p.tagline,
        category: p.category,
        technologies: p.technologies,
        url: window.location.origin + `/project/${p.id}`,
      }));
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gitclub-saved-projects-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-themed mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-themed-dim hover:text-themed mb-3 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Archive</span>
            </Link>

            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-themed">
                Saved Projects
              </h1>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-lime)] text-[#090b0e]">
                {savedProjects.length}
              </span>
            </div>
            <p className="text-sm text-themed-muted mt-1.5">
              Your personal offline collection of saved builds and case studies.
            </p>
          </div>

          {/* Action Tools */}
          {savedProjects.length > 0 && (
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleExport}
                className="btn-outline px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5"
                title="Export list as JSON"
              >
                {exported ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Exported!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to remove all saved projects?')) {
                    clearAll();
                  }
                }}
                id="clear-all-saved-btn"
                className="btn-outline px-3.5 py-2 rounded-xl text-xs font-mono text-rose-400 hover:border-rose-400/50 hover:bg-rose-400/10 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter within Saved */}
        {savedProjects.length > 3 && (
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-themed-dim pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your saved projects..."
              className="editorial-input w-full pl-10 pr-4 py-2 rounded-xl text-xs"
            />
          </div>
        )}

        {/* Saved Projects Grid or Empty */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSaved={isSaved(project.id)}
                onToggleSave={() => toggleSave(project.id)}
                onQuickView={() => setQuickViewProject(project)}
                index={i}
              />
            ))}
          </div>
        ) : savedProjects.length > 0 ? (
          <div className="py-16 text-center text-themed-dim">
            <p className="text-sm">No saved projects match &quot;{search}&quot;</p>
            <button
              onClick={() => setSearch('')}
              className="text-xs text-[var(--color-lime)] hover:underline mt-2 inline-block font-mono"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          /* Rich Empty State */
          <div className="py-16 text-center animate-fade-in max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-themed-surface border border-themed flex items-center justify-center mx-auto mb-4 text-themed-dim">
              <Bookmark className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-themed mb-2">
              No saved projects yet
            </h2>
            <p className="text-sm text-themed-muted mb-6 leading-relaxed">
              Explore the archive and click the bookmark icon on any card to save projects for quick reference and offline inspection.
            </p>
            <Link
              to="/"
              className="btn-lime px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Explore The Archive
            </Link>

            {/* Quick Suggestions */}
            {recommendedProjects.length > 0 && (
              <div className="mt-16 text-left border-t border-themed pt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[var(--color-lime)]" />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-themed font-semibold">
                    Recommended Builds To Check Out
                  </h3>
                </div>
                <div className="space-y-3">
                  {recommendedProjects.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-xl bg-themed-card border border-themed flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <Link
                          to={`/project/${p.id}`}
                          className="text-sm font-semibold text-themed hover:text-[var(--color-lime)] transition-colors truncate block"
                        >
                          {p.title}
                        </Link>
                        <p className="text-xs text-themed-muted truncate">
                          {p.category} • {p.technologies.slice(0, 3).join(', ')}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleSave(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-themed-surface text-xs font-mono hover:text-[var(--color-lime)] transition-colors border border-themed flex-shrink-0"
                      >
                        + Save
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProject && (
        <QuickViewModal
          project={quickViewProject}
          onClose={() => setQuickViewProject(null)}
          isSaved={isSaved(quickViewProject.id)}
          onToggleSave={() => toggleSave(quickViewProject.id)}
        />
      )}
    </div>
  );
}
