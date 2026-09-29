import { GitBranch, Heart, Terminal, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-themed bg-themed-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-lime)] flex items-center justify-center text-[#090b0e] shadow-md">
                <GitBranch className="w-4.5 h-4.5" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-sm font-black tracking-tight text-themed">
                  Git Club // Build Archive
                </span>
                <span className="block text-[10px] font-mono text-themed-dim uppercase tracking-wider">
                  CHARUSAT Developer Community
                </span>
              </div>
            </div>
            <p className="text-xs text-themed-muted max-w-sm leading-relaxed">
              An open platform chronicling open-source innovation, hackathon solutions, and research systems engineered by CHARUSAT students.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-lime)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-lime)] animate-pulse-lime" />
              <span>Platform Online // Spring 2026 Archive Cycle</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-themed font-semibold">
              Explore Archive
            </h4>
            <ul className="space-y-2 text-xs font-mono text-themed-muted">
              <li>
                <Link to="/" className="hover:text-[var(--color-lime)] transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-[var(--color-lime)] transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <span className="text-themed-dim">Demo Milestone Tracker</span>
              </li>
            </ul>
          </div>

          {/* Standards & Philosophy */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-themed font-semibold">
              Community Standard
            </h4>
            <div className="text-xs text-themed-muted space-y-2">
              <p className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[var(--color-lime)]" />
                <span>100% Student Engineered</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-lime)]" />
                <span>Curated & Peer Reviewed</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-themed/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-themed-dim">
          <p>
            &copy; {new Date().getFullYear()} Git Club CHARUSAT. All demonstration entries curated for developer showcase.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-current" /> by CHARUSAT student builders
          </p>
        </div>
      </div>
    </footer>
  );
}
