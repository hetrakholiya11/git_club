import { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Tag,
  Command,
} from 'lucide-react';
import type { ProjectCategory, SortOption, ViewMode } from '../data/types';

const CATEGORIES: ProjectCategory[] = [
  'AI/ML',
  'Web Development',
  'App Development',
  'IoT',
  'Design',
  'Automation',
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured First' },
  { value: 'newest', label: 'Newest First' },
  { value: 'alphabetical', label: 'Title (A → Z)' },
  { value: 'tech-count', label: 'Most Technologies' },
];

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ProjectCategory | null;
  onCategoryChange: (c: ProjectCategory | null) => void;
  selectedTechnologies: string[];
  onToggleTechnology: (t: string) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
  availableTechnologies: string[];
  categoryCounts: Record<string, number>;
  resultCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onOpenCommandPalette?: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTechnologies,
  onToggleTechnology,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  availableTechnologies,
  categoryCounts,
  resultCount,
  totalCount,
  hasActiveFilters,
  onClearFilters,
  onOpenCommandPalette,
}: FilterBarProps) {
  const [showTechDrawer, setShowTechDrawer] = useState(false);

  // Top popular technologies for quick chips
  const popularTech = availableTechnologies.slice(0, 8);

  return (
    <div className="space-y-4">
      {/* Search + Controls Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-themed-dim pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by name, description, or stack..."
            id="search-input"
            className="editorial-input w-full pl-10 pr-20 py-2.5 rounded-xl text-sm placeholder:text-themed-dim"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="w-5 h-5 rounded-full bg-themed-surface flex items-center justify-center text-themed-dim hover:text-themed transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            ) : onOpenCommandPalette ? (
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-themed-surface border border-themed text-[10px] font-mono text-themed-dim hover:text-themed transition-colors"
                title="Open Command Palette"
              >
                <Command className="w-3 h-3" />
                <span>K</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 bg-themed-surface rounded-xl border border-themed px-3">
          <SlidersHorizontal className="w-4 h-4 text-themed-dim flex-shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            id="sort-select"
            className="bg-transparent text-xs sm:text-sm text-themed py-2.5 focus:outline-none cursor-pointer"
            aria-label="Sort projects"
          >
            {SORT_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-themed-card text-themed"
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Grid / List Switcher */}
        <div
          className="flex items-center rounded-xl bg-themed-surface border border-themed p-1 gap-1 self-start sm:self-auto"
          role="group"
          aria-label="View mode toggle"
        >
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
              viewMode === 'grid'
                ? 'bg-[var(--color-lime)] text-[#090b0e]'
                : 'text-themed-dim hover:text-themed'
            }`}
            title="Grid view"
            aria-label="Switch to grid view"
            aria-pressed={viewMode === 'grid'}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
              viewMode === 'list'
                ? 'bg-[var(--color-lime)] text-[#090b0e]'
                : 'text-themed-dim hover:text-themed'
            }`}
            title="List view"
            aria-label="Switch to list view"
            aria-pressed={viewMode === 'list'}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          id="filter-all"
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
            selectedCategory === null
              ? 'category-active'
              : 'border-themed text-themed-muted hover:text-themed hover:border-themed-light bg-themed-surface/50'
          }`}
        >
          <span>All Projects</span>
          <span className="text-[10px] font-mono opacity-70">
            ({totalCount})
          </span>
        </button>

        {CATEGORIES.map((cat) => {
          const count = categoryCounts[cat] || 0;
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(isSelected ? null : cat)}
              id={`filter-${cat.toLowerCase().replace(/[^a-z]/g, '-')}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'category-active'
                  : 'border-themed text-themed-muted hover:text-themed hover:border-themed-light bg-themed-surface/50'
              }`}
            >
              <span>{cat}</span>
              <span className="text-[10px] font-mono opacity-70">
                ({count})
              </span>
            </button>
          );
        })}

        {/* Toggle Tech filter button */}
        <button
          onClick={() => setShowTechDrawer(!showTechDrawer)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors flex items-center gap-1.5 ${
            selectedTechnologies.length > 0 || showTechDrawer
              ? 'border-[var(--color-lime)] text-[var(--color-lime)] bg-[var(--color-lime)]/10'
              : 'border-themed text-themed-dim hover:text-themed hover:border-themed-light bg-themed-surface/30'
          }`}
          aria-expanded={showTechDrawer}
        >
          <Tag className="w-3 h-3" />
          <span>Tech Filter</span>
          {selectedTechnologies.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-[var(--color-lime)] text-[#090b0e] text-[10px] font-bold flex items-center justify-center">
              {selectedTechnologies.length}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Technologies Bar */}
      {(showTechDrawer || selectedTechnologies.length > 0) && (
        <div className="p-3.5 rounded-xl bg-themed-surface border border-themed animate-fade-in space-y-2">
          <div className="flex items-center justify-between text-xs text-themed-dim">
            <span className="font-mono uppercase tracking-wider text-[10px]">
              Filter by Technology ({selectedTechnologies.length} selected)
            </span>
            {selectedTechnologies.length > 0 && (
              <button
                onClick={() => selectedTechnologies.forEach((t) => onToggleTechnology(t))}
                className="text-[11px] text-[var(--color-lime)] hover:underline"
              >
                Clear Tech
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {(showTechDrawer ? availableTechnologies : popularTech).map((tech) => {
              const active = selectedTechnologies.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => onToggleTechnology(tech)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                    active
                      ? 'bg-[var(--color-lime)] text-[#090b0e] border-[var(--color-lime)] font-bold'
                      : 'border-themed text-themed-muted hover:text-themed hover:border-themed-light bg-themed-card'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active filters status & result count */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-themed-dim">
          Showing{' '}
          <span className="font-mono font-bold text-themed">{resultCount}</span> of{' '}
          <span className="font-mono text-themed-dim">{totalCount}</span> projects
        </p>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            id="clear-filters-btn"
            className="text-xs font-mono text-[var(--color-lime)] hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Reset all filters
          </button>
        )}
      </div>
    </div>
  );
}
