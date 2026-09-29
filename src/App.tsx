import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { SavedProjectsPage } from './pages/SavedProjectsPage';
import { CommandPalette } from './components/CommandPalette';
import { ProjectSubmitModal } from './components/ProjectSubmitModal';
import { projects as initialProjects } from './data/projects';
import { useSavedProjects } from './hooks/useSavedProjects';
import { useTheme } from './hooks/useTheme';
import type { Project, ProjectCategory } from './data/types';

const SUBMITTED_STORAGE_KEY = 'gitclub-submitted-projects';

export function App() {
  const { savedIds, toggleSave, isSaved, clearAll } = useSavedProjects();
  const { theme, toggleTheme } = useTheme();

  // Combine initial projects with any submitted projects stored in this session/browser
  const [allProjects, setAllProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(SUBMITTED_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...initialProjects];
        }
      }
    } catch {
      // ignore
    }
    return initialProjects;
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);

  // Global Ctrl/Cmd + K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleProjectSubmit = useCallback((newProject: Project) => {
    setAllProjects((prev) => {
      const updated = [newProject, ...prev];
      try {
        const customOnly = updated.filter((p) => p.id.startsWith('custom-'));
        localStorage.setItem(SUBMITTED_STORAGE_KEY, JSON.stringify(customOnly));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-themed text-themed selection:bg-[var(--color-lime)] selection:text-[#090b0e]">
      <Navbar
        savedCount={savedIds.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                projects={allProjects}
                toggleSave={toggleSave}
                isSaved={isSaved}
                onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProjectDetailPage
                allProjects={allProjects}
                toggleSave={toggleSave}
                isSaved={isSaved}
              />
            }
          />
          <Route
            path="/saved"
            element={
              <SavedProjectsPage
                allProjects={allProjects}
                savedIds={savedIds}
                toggleSave={toggleSave}
                isSaved={isSaved}
                clearAll={clearAll}
              />
            }
          />
        </Routes>
      </main>

      <Footer />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Global Submit Project Modal */}
      <ProjectSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleProjectSubmit}
      />
    </div>
  );
}
