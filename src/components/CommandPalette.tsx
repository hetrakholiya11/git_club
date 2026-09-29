import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bookmark,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  Command,
  X,
  Code2,
} from 'lucide-react';
import { projects } from '../data/projects';
import type { ProjectCategory } from '../data/types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (category: ProjectCategory | null) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

interface PaletteAction {
  id: string;
  type: 'project' | 'category' | 'nav' | 'theme';
  title: string;
  subtitle?: string;
  icon: typeof Search;
  action: () => void;
  badge?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectCategory,
  theme,
  onToggleTheme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Can be triggered externally
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Generate actions
  const actions: PaletteAction[] = [];

  const q = query.trim().toLowerCase();

  // 1. Projects
  projects.forEach((p) => {
    const match =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.toLowerCase().includes(q)) ||
      p.team.some((m) => m.name.toLowerCase().includes(q));

    if (match) {
      actions.push({
        id: `project-${p.id}`,
        type: 'project',
        title: p.title,
        subtitle: `${p.category} • ${p.technologies.slice(0, 3).join(', ')}`,
        icon: Code2,
        action: () => {
          navigate(`/project/${p.id}`);
          onClose();
        },
        badge: p.status,
      });
    }
  });

  // 2. Categories
  const categories: ProjectCategory[] = [
    'AI/ML',
    'Web Development',
    'App Development',
    'IoT',
    'Design',
    'Automation',
  ];

  categories.forEach((cat) => {
    if (!q || cat.toLowerCase().includes(q) || 'category'.includes(q)) {
      actions.push({
        id: `cat-${cat}`,
        type: 'category',
        title: `Filter: ${cat}`,
        subtitle: `Show only ${cat} projects in archive`,
        icon: Sparkles,
        action: () => {
          if (onSelectCategory) {
            onSelectCategory(cat);
          }
          navigate('/');
          onClose();
        },
        badge: 'Category',
      });
    }
  });

  // 3. Navigation
  if (!q || 'saved bookmarks'.includes(q)) {
    actions.push({
      id: 'nav-saved',
      type: 'nav',
      title: 'View Saved Bookmarks',
      subtitle: 'Open your saved project collection',
      icon: Bookmark,
      action: () => {
        navigate('/saved');
        onClose();
      },
      badge: 'Page',
    });
  }

  // 4. Theme
  if (!q || 'theme dark light mode'.includes(q)) {
    actions.push({
      id: 'theme-toggle',
      type: 'theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: 'Toggle platform visual appearance',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        onToggleTheme();
        onClose();
      },
      badge: 'System',
    });
  }

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (actions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % actions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + actions.length) % actions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = actions[selectedIndex];
      if (current) {
        current.action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-2xl bg-themed-card border border-themed rounded-2xl shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px var(--border-light)',
        }}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-themed bg-themed-surface">
          <Search className="w-5 h-5 text-themed-dim flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search projects, tech, category..."
            className="w-full bg-transparent text-sm text-themed placeholder:text-themed-dim focus:outline-none"
            aria-autocomplete="list"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-themed-dim hover:text-themed p-1"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-mono text-themed-dim bg-themed-card px-2 py-0.5 rounded border border-themed">
              <span>ESC</span>
            </div>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 divide-y divide-themed/40"
          role="listbox"
        >
          {actions.length > 0 ? (
            actions.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={item.action}
                  className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-themed-surface text-themed'
                      : 'text-themed-muted hover:bg-themed-surface/60'
                  }`}
                  style={
                    isSelected
                      ? {
                          borderLeft: '3px solid var(--color-lime)',
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-[var(--color-lime)] text-[#090b0e]'
                          : 'bg-themed-surface text-themed-dim'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-medium truncate ${
                          isSelected ? 'text-themed font-semibold' : 'text-themed'
                        }`}
                      >
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="text-xs text-themed-dim truncate">{item.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.badge && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-themed-surface text-themed-dim border border-themed">
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <ArrowRight className="w-4 h-4 text-[var(--color-lime)]" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-themed-dim">
              <Command className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No matching projects or commands found</p>
              <p className="text-xs mt-1 text-themed-dim/80">Try searching for tech like &quot;React&quot;, &quot;Python&quot;, or &quot;IoT&quot;</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-themed-secondary border-t border-themed flex items-center justify-between text-[11px] font-mono text-themed-dim">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-themed-surface border border-themed">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-themed-surface border border-themed">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-themed-surface border border-themed">↵</kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-themed-surface border border-themed">ESC</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
