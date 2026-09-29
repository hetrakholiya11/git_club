import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GitBranch,
  Bookmark,
  Sun,
  Moon,
  Menu,
  X,
  Search,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  savedCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  onOpenSubmitModal: () => void;
}

export function Navbar({
  savedCount,
  theme,
  onToggleTheme,
  onOpenCommandPalette,
  onOpenSubmitModal,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="navbar fixed top-0 left-0 right-0 z-40 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            id="nav-logo"
            aria-label="Git Club Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--color-lime)] flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
              <GitBranch className="w-4.5 h-4.5 text-[#090b0e]" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-tight text-themed">
                  Git Club
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-themed-surface text-[var(--color-lime)] border border-themed font-semibold">
                  CHARUSAT
                </span>
              </div>
              <span className="text-[9px] font-mono text-themed-dim tracking-widest uppercase mt-0.5">
                Build Archive
              </span>
            </div>
          </Link>

          {/* Desktop Search trigger */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8">
            <button
              onClick={onOpenCommandPalette}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-themed-surface/80 border border-themed text-themed-dim hover:text-themed hover:border-themed-light text-xs font-mono transition-colors"
              aria-label="Quick search (Ctrl+K)"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search builds...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-themed-card border border-themed text-[10px]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              id="nav-projects"
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors ${
                isActive('/')
                  ? 'nav-active bg-themed-surface/80 border border-themed'
                  : 'text-themed-muted hover:text-themed hover:bg-themed-surface/50'
              }`}
            >
              Archive
            </Link>

            <Link
              to="/saved"
              id="nav-saved"
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                isActive('/saved')
                  ? 'nav-active bg-themed-surface/80 border border-themed'
                  : 'text-themed-muted hover:text-themed hover:bg-themed-surface/50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="min-w-[18px] h-4.5 px-1 rounded-full bg-[var(--color-lime)] text-[#090b0e] text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Submit Project CTA */}
            <button
              onClick={onOpenSubmitModal}
              id="nav-submit-btn"
              className="btn-lime px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ml-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Submit Build</span>
            </button>
          </div>

          {/* Right Tools: Theme + Mobile Menu */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenCommandPalette}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-themed-muted hover:text-themed hover:bg-themed-surface transition-colors"
              aria-label="Open command palette"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleTheme}
              id="theme-toggle"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-themed-muted hover:text-themed hover:bg-themed-surface transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-themed-muted hover:text-themed hover:bg-themed-surface transition-colors"
              id="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-themed animate-fade-in space-y-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-themed-surface border border-themed text-xs font-mono text-themed"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--color-lime)]" />
                <span>Search / Command Palette</span>
              </div>
              <span className="text-[10px] text-themed-dim">⌘K</span>
            </button>

            <Link
              to="/"
              id="mobile-nav-projects"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
                isActive('/')
                  ? 'nav-active bg-themed-surface'
                  : 'text-themed-muted hover:text-themed'
              }`}
            >
              Build Archive
            </Link>

            <Link
              to="/saved"
              id="mobile-nav-saved"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
                isActive('/saved')
                  ? 'nav-active bg-themed-surface'
                  : 'text-themed-muted hover:text-themed'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                <span>Saved Projects</span>
              </div>
              {savedCount > 0 && (
                <span className="min-w-[18px] h-4.5 px-1.5 rounded-full bg-[var(--color-lime)] text-[#090b0e] text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenSubmitModal();
              }}
              className="w-full btn-lime py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Submit A Project</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
