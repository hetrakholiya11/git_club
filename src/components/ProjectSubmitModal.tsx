import { useState, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Code2,
} from 'lucide-react';
import type { Project, ProjectCategory } from '../data/types';

interface ProjectSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'AI/ML',
  'Web Development',
  'App Development',
  'IoT',
  'Design',
  'Automation',
];

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80';

export function ProjectSubmitModal({
  isOpen,
  onClose,
  onSubmit,
}: ProjectSubmitModalProps) {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Web Development');
  const [description, setDescription] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [solution, setSolution] = useState('');
  const [techInput, setTechInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [teamInput, setTeamInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [thumbnail, setThumbnail] = useState(DEFAULT_IMAGE);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim() || !description.trim()) {
      setError('Please fill in the project title, tagline, and description.');
      return;
    }

    const techList = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const featuresList = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const teamList = teamInput
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean)
      .map((name) => ({
        name,
        role: 'Contributor',
        avatar: name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'DEV',
      }));

    const newProject: Project = {
      id: `custom-${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      title: title.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      problemStatement: problemStatement.trim() || description.trim(),
      solution: solution.trim() || tagline.trim(),
      features:
        featuresList.length > 0
          ? featuresList
          : ['Interactive UI', 'Modern Stack Architecture', 'Student Community Driven'],
      category,
      technologies:
        techList.length > 0 ? techList : ['TypeScript', 'React', 'TailwindCSS'],
      team: teamList.length > 0 ? teamList : [{ name: 'Lead Developer', role: 'Builder', avatar: 'LD' }],
      status: 'In Progress',
      featured: false,
      thumbnail: thumbnail.trim() || DEFAULT_IMAGE,
      screenshots: [thumbnail.trim() || DEFAULT_IMAGE],
      githubUrl: githubUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSubmit(newProject);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      // Reset
      setTitle('');
      setTagline('');
      setDescription('');
      setProblemStatement('');
      setSolution('');
      setTechInput('');
      setFeaturesInput('');
      setTeamInput('');
      setGithubUrl('');
      setLiveUrl('');
      setError(null);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Submit a Project"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-themed-card border border-themed rounded-2xl shadow-2xl p-6 sm:p-8 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px var(--border-light)',
        }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-themed mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-lime)] flex items-center justify-center text-[#090b0e]">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-themed">Submit Your Project</h2>
              <p className="text-xs text-themed-dim font-mono">
                CHARUSAT BUILD ARCHIVE // SUBMISSION DRAFT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-themed-dim hover:text-themed transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-themed mb-1">Project Submitted!</h3>
            <p className="text-sm text-themed-muted">
              Your project has been recorded and added to the current archive showcase.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CampusRoute AI"
                  className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                One-Line Tagline *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Real-time campus navigation with crowd density forecasting"
                className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                Full Description *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the background, purpose, and who this project serves..."
                className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                  Problem Statement
                </label>
                <textarea
                  rows={2}
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  placeholder="What specific campus friction does this tackle?"
                  className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                  Engineering Solution
                </label>
                <textarea
                  rows={2}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="How does your architecture address this problem?"
                  className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React, TypeScript, FastAPI, PostgreSQL"
                  className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                  Team Members (comma separated)
                </label>
                <input
                  type="text"
                  value={teamInput}
                  onChange={(e) => setTeamInput(e.target.value)}
                  placeholder="Dev Patel, Priya Shah"
                  className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                  Repository URL (optional)
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                  Live Demo URL (optional)
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://..."
                  className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-themed-dim mb-1">
                Cover Image URL (optional)
              </label>
              <input
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="editorial-input w-full px-3.5 py-2 rounded-xl text-sm font-mono text-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-themed">
              <span className="text-[11px] font-mono text-themed-dim flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Live Demo Session Storage
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-outline px-4 py-2 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-lime px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Project
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
