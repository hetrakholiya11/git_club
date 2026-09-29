import { useState, useMemo } from 'react';
import { SearchX, Sparkles, Filter } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { FeaturedCard } from '../components/FeaturedCard';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectListItem } from '../components/ProjectListItem';
import { FilterBar } from '../components/FilterBar';
import { QuickViewModal } from '../components/QuickViewModal';
import type { Project, ProjectCategory, SortOption, ViewMode } from '../data/types';

interface HomePageProps {
  projects: Project[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  onOpenCommandPalette: () => void;
  onOpenSubmitModal: () => void;
  selectedCategory: ProjectCategory | null;
  onCategoryChange: (c: ProjectCategory | null) => void;
}

export function HomePage({
  projects,
  toggleSave,
  isSaved,
  onOpenCommandPalette,
  onOpenSubmitModal,
  selectedCategory,
  onCategoryChange,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);

  // Available unique technologies
  const availableTechnologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  // Featured projects for the spotlight grid
  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured),
    [projects]
  );

  // Toggle technology filter
  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  // Filtered & Sorted projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)) ||
          p.team.some((m) => m.name.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Technologies (must include all selected technologies)
    if (selectedTechnologies.length > 0) {
      result = result.filter((p) =>
        selectedTechnologies.every((st) => p.technologies.includes(st))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'newest':
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'tech-count':
        result.sort((a, b) => b.technologies.length - a.technologies.length);
        break;
    }

    return result;
  }, [projects, searchQuery, selectedCategory, selectedTechnologies, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== null ||
    selectedTechnologies.length > 0;

  const clearFilters = () => {
    setSearchQuery('');
    onCategoryChange(null);
    setSelectedTechnologies([]);
    setSortBy('featured');
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        projects={projects}
        onOpenCommandPalette={onOpenCommandPalette}
        onOpenSubmitModal={onOpenSubmitModal}
        onQuickView={(p) => setQuickViewProject(p)}
        isSaved={isSaved}
        toggleSave={toggleSave}
      />

      {/* Featured Editorial Spotlight Grid */}
      <section className="py-16 md:py-20 border-b border-themed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-[var(--color-lime)]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-lime)] font-semibold">
                  Curated Highlights
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-themed">
                Featured Projects
              </h2>
            </div>
            <p className="text-xs font-mono text-themed-dim">
              STANDOUT COMMUNITY BUILDS // PEER REVIEWED
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <FeaturedCard
                key={project.id}
                project={project}
                variant={i === 0 ? 'large' : 'medium'}
                isSaved={isSaved(project.id)}
                onToggleSave={() => toggleSave(project.id)}
                onQuickView={() => setQuickViewProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Discovery & Main Archive */}
      <section id="projects-section" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Filter className="w-4 h-4 text-[var(--color-lime)]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-lime)] font-semibold">
                  Comprehensive Directory
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-themed">
                Explore The Build Archive
              </h2>
            </div>
            <p className="text-xs font-mono text-themed-dim">
              FILTER BY CATEGORY, TECH STACK, OR SEARCH
            </p>
          </div>

          {/* Smart Discovery Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            selectedTechnologies={selectedTechnologies}
            onToggleTechnology={toggleTechnology}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            availableTechnologies={availableTechnologies}
            categoryCounts={categoryCounts}
            resultCount={filteredProjects.length}
            totalCount={projects.length}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            onOpenCommandPalette={onOpenCommandPalette}
          />

          {/* Project List / Grid */}
          {filteredProjects.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredProjects.map((project, i) => (
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
            ) : (
              <div className="space-y-3 mt-8">
                {filteredProjects.map((project) => (
                  <ProjectListItem
                    key={project.id}
                    project={project}
                    isSaved={isSaved(project.id)}
                    onToggleSave={() => toggleSave(project.id)}
                    onQuickView={() => setQuickViewProject(project)}
                  />
                ))}
              </div>
            )
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 animate-fade-in text-center">
              <div className="w-16 h-16 rounded-2xl bg-themed-surface border border-themed flex items-center justify-center mb-4">
                <SearchX className="w-7 h-7 text-themed-dim" />
              </div>
              <h3 className="text-xl font-bold text-themed mb-2">
                No matching projects found
              </h3>
              <p className="text-sm text-themed-muted max-w-md mb-6 leading-relaxed">
                We couldn&apos;t find any builds matching your active filters or search terms. Try clearing some tags or resetting the filters.
              </p>
              <button
                onClick={clearFilters}
                className="btn-lime px-6 py-2.5 rounded-xl text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProject && (
        <QuickViewModal
          project={quickViewProject}
          onClose={() => setQuickViewProject(null)}
          isSaved={isSaved(quickViewProject.id)}
          onToggleSave={() => toggleSave(quickViewProject.id)}
        />
      )}
    </>
  );
}
