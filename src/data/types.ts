export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export type ProjectCategory =
  | 'AI/ML'
  | 'Web Development'
  | 'App Development'
  | 'IoT'
  | 'Design'
  | 'Automation';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Planning';

export type SortOption = 'featured' | 'newest' | 'alphabetical' | 'tech-count';

export type ViewMode = 'grid' | 'list';

export interface ProjectMilestone {
  phase: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemStatement: string;
  solution: string;
  features: string[];
  category: ProjectCategory;
  technologies: string[];
  team: TeamMember[];
  status: ProjectStatus;
  featured: boolean;
  thumbnail: string;
  screenshots: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt: string;
  timeline?: ProjectMilestone[];
}

