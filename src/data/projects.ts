import type { Project, TeamMember } from './types';

const members: Record<string, TeamMember> = {
  arjun: { name: 'Arjun Patel', role: 'Full-Stack Developer', avatar: 'AP' },
  priya: { name: 'Priya Sharma', role: 'ML Engineer', avatar: 'PS' },
  dev: { name: 'Dev Mehta', role: 'Frontend Developer', avatar: 'DM' },
  riya: { name: 'Riya Desai', role: 'UI/UX Designer', avatar: 'RD' },
  karan: { name: 'Karan Shah', role: 'Backend Developer', avatar: 'KS' },
  ananya: { name: 'Ananya Joshi', role: 'Data Scientist', avatar: 'AJ' },
  rohan: { name: 'Rohan Trivedi', role: 'Mobile Developer', avatar: 'RT' },
  sneha: { name: 'Sneha Nair', role: 'DevOps Engineer', avatar: 'SN' },
  vivek: { name: 'Vivek Chauhan', role: 'IoT Engineer', avatar: 'VC' },
  meera: { name: 'Meera Kapoor', role: 'Product Designer', avatar: 'MK' },
  harsh: { name: 'Harsh Bhatt', role: 'Automation Engineer', avatar: 'HB' },
  nisha: { name: 'Nisha Verma', role: 'Data Analyst', avatar: 'NV' },
};

export const projects: Project[] = [
  {
    id: 'lexai-legal-assistant',
    title: 'LexAI — Legal Document Assistant',
    tagline: 'Simplifying legal complexity with AI-powered document analysis',
    description:
      'An intelligent legal document assistant that uses natural language processing to parse, summarize, and extract key clauses from legal documents. Built to help law students and small legal practices navigate complex contracts without expensive legal software.',
    problemStatement:
      'Legal documents are dense, jargon-heavy, and inaccessible to most people. Small businesses and students cannot afford professional legal review for every contract they encounter.',
    solution:
      'LexAI applies transformer-based NLP models fine-tuned on legal corpora to automatically identify key clauses, flag potential risks, generate plain-language summaries, and answer user questions about uploaded documents.',
    features: [
      'PDF and DOCX document upload with OCR support',
      'Automatic clause identification and risk flagging',
      'Plain-language summary generation',
      'Interactive Q&A over uploaded documents',
      'Side-by-side comparison of contract versions',
      'Export annotated documents as PDF',
    ],
    category: 'AI/ML',
    technologies: ['Python', 'FastAPI', 'Hugging Face', 'React', 'PostgreSQL', 'Docker'],
    team: [members.priya, members.arjun, members.riya],
    status: 'Completed',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    ],
    createdAt: '2026-03-15',
  },
  {
    id: 'studysync-productivity',
    title: 'StudySync — Student Productivity Hub',
    tagline: 'Your academic life, organized and optimized',
    description:
      'A comprehensive productivity web application designed specifically for university students. Combines task management, note-taking, schedule planning, and focus tools in a single, distraction-free interface tailored to academic workflows.',
    problemStatement:
      'Students juggle multiple tools for notes, tasks, calendars, and study sessions. Context-switching between apps wastes time and breaks focus during critical study periods.',
    solution:
      'StudySync unifies task boards, rich markdown notes, timetable integration, Pomodoro timers, and grade tracking into one cohesive application. Smart reminders and analytics help students identify productive patterns.',
    features: [
      'Kanban-style task boards with deadline tracking',
      'Rich markdown note editor with LaTeX support',
      'Timetable integration and class schedule viewer',
      'Pomodoro timer with session analytics',
      'Grade tracker and GPA calculator',
      'Collaborative study rooms with real-time sync',
    ],
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io', 'TailwindCSS'],
    team: [members.dev, members.riya, members.karan],
    status: 'Completed',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    ],
    createdAt: '2026-05-20',
  },
  {
    id: 'eventhub-campus',
    title: 'EventHub — Campus Event Platform',
    tagline: 'Never miss what matters on campus',
    description:
      'A modern event management platform built for university communities. Enables student clubs and departments to create, promote, and manage events while providing attendees with personalized discovery, registration, and real-time updates.',
    problemStatement:
      'Campus events are scattered across WhatsApp groups, notice boards, and emails. Students miss relevant events, and organizers struggle to track registrations and communicate updates efficiently.',
    solution:
      'EventHub centralizes event discovery with smart categorization, one-tap registration, QR check-in, and real-time notifications. Organizers get dashboards with attendance analytics and automated certificate generation.',
    features: [
      'Event discovery feed with category filters',
      'One-tap registration with QR code tickets',
      'Organizer dashboard with real-time analytics',
      'Push notifications for event reminders',
      'Automated participation certificate generation',
      'Venue mapping and capacity management',
    ],
    category: 'Web Development',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'AWS S3'],
    team: [members.arjun, members.dev, members.meera],
    status: 'In Progress',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    ],
    createdAt: '2026-07-01',
  },
  {
    id: 'meditrack-health',
    title: 'MediTrack — Health Companion App',
    tagline: 'Personal health management in your pocket',
    description:
      'A cross-platform mobile application that helps users track medications, appointments, vitals, and health records. Features smart reminders, health trend visualization, and secure data sharing with healthcare providers.',
    problemStatement:
      'Managing medications, tracking vitals, and keeping health records organized is overwhelming, especially for students managing chronic conditions or elderly family members they care for.',
    solution:
      'MediTrack provides a clean, intuitive mobile experience for medication scheduling, vitals logging, appointment management, and health record storage with end-to-end encryption and family sharing capabilities.',
    features: [
      'Smart medication reminders with refill tracking',
      'Vitals logging with trend visualization charts',
      'Appointment calendar with clinic locator',
      'Encrypted health record storage and sharing',
      'Family health dashboard for caregivers',
      'Emergency medical info quick-access card',
    ],
    category: 'App Development',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Chart.js', 'Expo', 'Node.js'],
    team: [members.rohan, members.riya, members.karan],
    status: 'Completed',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    ],
    createdAt: '2026-02-10',
  },
  {
    id: 'smartcampus-iot',
    title: 'SmartCampus — IoT Environmental Monitor',
    tagline: 'Making campus spaces smarter and more sustainable',
    description:
      'An IoT-based environmental monitoring system deployed across campus buildings. Collects real-time data on temperature, humidity, air quality, and energy usage to optimize resource consumption and improve comfort in classrooms and labs.',
    problemStatement:
      'University buildings waste energy through inefficient HVAC usage and poor lighting management. There is no visibility into real-time environmental conditions across campus facilities.',
    solution:
      'SmartCampus deploys a network of ESP32-based sensor nodes that feed environmental data into a central dashboard. Machine learning models predict optimal HVAC schedules, and automated alerts notify facilities teams of anomalies.',
    features: [
      'Real-time environmental dashboards per building',
      'ESP32 sensor nodes with LoRa mesh networking',
      'ML-based HVAC optimization recommendations',
      'Automated anomaly detection and alerting',
      'Historical data analytics and energy reports',
      'Integration with campus building management systems',
    ],
    category: 'IoT',
    technologies: ['ESP32', 'Python', 'MQTT', 'InfluxDB', 'Grafana', 'TensorFlow Lite'],
    team: [members.vivek, members.sneha, members.ananya],
    status: 'In Progress',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80',
    ],
    createdAt: '2026-06-05',
  },
  {
    id: 'sentimentscope-analytics',
    title: 'SentimentScope — Social Media Analyzer',
    tagline: 'Decode public opinion with real-time sentiment analysis',
    description:
      'A data analytics platform that collects and analyzes social media discussions around trending topics. Provides sentiment breakdowns, trend timelines, word clouds, and comparative analysis through an interactive visualization dashboard.',
    problemStatement:
      'Understanding public sentiment on social media requires manual monitoring of thousands of posts. Researchers and marketers lack accessible tools to quantify and visualize opinion trends at scale.',
    solution:
      'SentimentScope aggregates posts from multiple platforms, applies fine-tuned sentiment classification models, and presents results through interactive charts, heatmaps, and exportable reports with historical trend comparisons.',
    features: [
      'Multi-platform data collection pipeline',
      'Real-time sentiment classification dashboard',
      'Interactive trend timeline and word clouds',
      'Comparative sentiment analysis across topics',
      'Exportable PDF and CSV reports',
      'Custom topic tracking and alert setup',
    ],
    category: 'AI/ML',
    technologies: ['Python', 'Streamlit', 'scikit-learn', 'Plotly', 'Apache Kafka', 'MongoDB'],
    team: [members.ananya, members.priya, members.nisha],
    status: 'Completed',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
    ],
    createdAt: '2026-04-12',
  },
  {
    id: 'devcollab-tool',
    title: 'DevCollab — Developer Collaboration Suite',
    tagline: 'Where student developers build together',
    description:
      'A collaboration platform designed for student developer teams. Combines code review tools, project boards, shared documentation, and integrated chat to streamline team workflows without requiring enterprise-grade subscriptions.',
    problemStatement:
      'Student teams rely on fragmented free-tier tools for collaboration: Discord for chat, Google Docs for documentation, Trello for tasks, and GitHub for code. This fragmentation hinders productivity and team coordination.',
    solution:
      'DevCollab provides an integrated workspace with project boards, collaborative markdown docs, code snippet sharing with syntax highlighting, threaded discussions, and GitHub integration — all designed for the scale and budget of student teams.',
    features: [
      'Integrated project boards with sprint planning',
      'Collaborative real-time document editor',
      'Code snippet sharing with syntax highlighting',
      'Threaded team discussions per project',
      'GitHub repository integration and PR tracking',
      'Team activity feed and contribution insights',
    ],
    category: 'Web Development',
    technologies: ['Vue.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'WebSocket', 'Docker'],
    team: [members.karan, members.dev, members.sneha],
    status: 'In Progress',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    ],
    createdAt: '2026-08-18',
  },
  {
    id: 'autograde-pipeline',
    title: 'AutoGrade — Assignment Evaluation Pipeline',
    tagline: 'Automated grading that scales with your classroom',
    description:
      'An automated assignment evaluation system that supports code submissions in multiple languages. Runs test cases in sandboxed environments, checks for plagiarism, provides detailed feedback, and generates grade reports for instructors.',
    problemStatement:
      'Manual grading of programming assignments is time-consuming and inconsistent. Instructors spend hours testing student code, and feedback is often delayed, reducing its learning impact.',
    solution:
      'AutoGrade provides a submission portal where students upload code. The system runs submissions against instructor-defined test suites in Docker containers, performs plagiarism detection, and generates instant feedback with detailed test results.',
    features: [
      'Multi-language code submission portal',
      'Sandboxed test execution in Docker containers',
      'Plagiarism detection with similarity scoring',
      'Detailed test result feedback for students',
      'Grade aggregation dashboards for instructors',
      'Custom test suite builder with partial scoring',
    ],
    category: 'Automation',
    technologies: ['Go', 'Docker', 'React', 'PostgreSQL', 'Redis', 'GitHub Actions'],
    team: [members.harsh, members.karan, members.sneha],
    status: 'Completed',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    ],
    createdAt: '2026-01-25',
  },
  {
    id: 'pixelcraft-design',
    title: 'PixelCraft — Collaborative Design Tool',
    tagline: 'Design together, iterate faster',
    description:
      'A browser-based collaborative design tool that enables student teams to create UI mockups, wireframes, and prototypes together in real-time. Features component libraries, design tokens, and export capabilities for developer handoff.',
    problemStatement:
      'Professional design tools like Figma have free-tier limitations, and students working on hackathon projects need quick prototyping tools that support real-time collaboration without license constraints.',
    solution:
      'PixelCraft is an open-source, browser-based design canvas with real-time multiplayer editing, reusable component libraries, and export-to-code features that give student teams a capable prototyping environment at zero cost.',
    features: [
      'Real-time multiplayer canvas editing',
      'Drag-and-drop component library',
      'Design token system for consistent styling',
      'Interactive prototype mode with transitions',
      'Export designs as SVG, PNG, or CSS code',
      'Version history and design branching',
    ],
    category: 'Design',
    technologies: ['TypeScript', 'Canvas API', 'WebSocket', 'React', 'Node.js', 'S3'],
    team: [members.meera, members.riya, members.dev],
    status: 'In Progress',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1581291518633-83b4eef1d2fa?w=800&q=80',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    ],
    createdAt: '2026-09-01',
  },
  {
    id: 'campusinsights-analytics',
    title: 'CampusInsights — University Data Dashboard',
    tagline: 'Turning campus data into actionable insights',
    description:
      'A data analytics dashboard that visualizes university-level metrics including enrollment trends, placement statistics, research output, and resource utilization. Helps administrators make informed, data-driven decisions about institutional strategy.',
    problemStatement:
      'University administrators rely on scattered spreadsheets and manual reports to understand institutional performance. There is no unified view of key metrics to support strategic decision-making.',
    solution:
      'CampusInsights ingests data from multiple university systems and presents interactive dashboards with enrollment analytics, placement trends, department comparisons, and predictive modeling for future planning.',
    features: [
      'Interactive enrollment and admissions analytics',
      'Placement statistics with company-wise breakdown',
      'Department performance comparison charts',
      'Research publication and citation tracking',
      'Resource utilization heatmaps',
      'Predictive models for enrollment forecasting',
    ],
    category: 'AI/ML',
    technologies: ['Python', 'Pandas', 'D3.js', 'Flask', 'PostgreSQL', 'Tableau'],
    team: [members.nisha, members.ananya, members.arjun],
    status: 'Completed',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=800&q=80',
    ],
    createdAt: '2026-04-28',
  },
];

const DEFAULT_TIMELINES: Record<string, import('./types').ProjectMilestone[]> = {
  'lexai-legal-assistant': [
    {
      phase: 'Phase 01',
      title: 'Legal Corpus Research & Schema',
      description: 'Curated 1,200+ open legal documents and designed entity taxonomy for contract extraction.',
      date: 'Feb 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'Transformer Fine-tuning & Clause Extractor',
      description: 'Fine-tuned legal NLP models for high-accuracy clause classification and risk flagging.',
      date: 'Mar 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'Student Legal Clinic Alpha Trials',
      description: 'Usability testing with campus student clinics to evaluate clause breakdown clarity.',
      date: 'Mar 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 04',
      title: 'Multi-Format Export & Enterprise Q&A',
      description: 'Integrated version diffing, OCR extraction, and interactive document questioning.',
      date: 'Apr 2026',
      status: 'completed',
    },
  ],
  'studysync-productivity': [
    {
      phase: 'Phase 01',
      title: 'Student Workflow Mapping & UI Wireframing',
      description: 'Researched pain points across semester schedules, coursework deadlines, and revision routines.',
      date: 'Apr 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'Real-Time WebSocket Sync Engine',
      description: 'Built collaborative study rooms and instant task board synchronization with Socket.io.',
      date: 'May 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'Timetable Parser & Focus Analytics',
      description: 'Created automatic timetable synchronizer and Pomodoro trend breakdown charts.',
      date: 'May 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 04',
      title: 'Public Campus Beta Release',
      description: 'Deployed production web build with grade calculation suite and offline support.',
      date: 'Jun 2026',
      status: 'completed',
    },
  ],
  'eventhub-campus': [
    {
      phase: 'Phase 01',
      title: 'Campus Club Requirements & Schema',
      description: 'Consolidated guidelines from student clubs to design centralized registration architecture.',
      date: 'May 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'QR Ticketing Engine & Fast Check-In',
      description: 'Engineered high-speed QR check-in workflow for mobile campus attendance scanners.',
      date: 'Jun 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'Live Organizer Dashboard & Alerts',
      description: 'Building real-time attendance analytics, capacity tracking, and push reminders.',
      date: 'Jul 2026',
      status: 'in-progress',
    },
    {
      phase: 'Phase 04',
      title: 'Automated Certificate Dispatcher',
      description: 'Batch certificate generator with verifiable cryptographic badges for attendees.',
      date: 'Aug 2026',
      status: 'planned',
    },
  ],
  'meditrack-health': [
    {
      phase: 'Phase 01',
      title: 'Data Privacy & Local Encryption Design',
      description: 'Designed offline-first encrypted data schema for medical logs and prescription schedules.',
      date: 'Dec 2025',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'Cross-Platform React Native App',
      description: 'Engineered intuitive medication scheduling, dosage alerts, and vitals trend tracker.',
      date: 'Jan 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'Interactive Biometric Charts',
      description: 'Integrated historical health visualization charts and blood pressure/glucose tracking.',
      date: 'Feb 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 04',
      title: 'Family Caregiver Sharing Beta',
      description: 'Launched emergency contact quick-card and multi-patient family dashboard.',
      date: 'Feb 2026',
      status: 'completed',
    },
  ],
  'smartcampus-iot': [
    {
      phase: 'Phase 01',
      title: 'ESP32 Sensor Array & Firmware',
      description: 'Prototyped environmental sensor boards monitoring PM2.5, ambient temperature, and humidity.',
      date: 'Apr 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'LoRa Mesh Transceiver Network',
      description: 'Tested low-power telemetry transmission across academic campus blocks via MQTT.',
      date: 'May 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'InfluxDB & Grafana Real-Time Pipeline',
      description: 'Deploying time-series metrics storage and automated HVAC threshold anomaly detectors.',
      date: 'Jun 2026',
      status: 'in-progress',
    },
    {
      phase: 'Phase 04',
      title: 'Automated Energy Optimization Controller',
      description: 'Hardware relay coupling with building management system to automate classroom climate control.',
      date: 'Jul 2026',
      status: 'planned',
    },
  ],
  'sentimentscope-analytics': [
    {
      phase: 'Phase 01',
      title: 'Multi-Source Data Stream Pipeline',
      description: 'Designed distributed consumer pipelines to capture discussion metrics at scale.',
      date: 'Feb 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'Sentiment Classifier Benchmarking',
      description: 'Evaluated BERT and transformer embeddings for high-confidence emotional polarity scoring.',
      date: 'Mar 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'Interactive Visual Analytics Dashboard',
      description: 'Implemented keyword heatmaps, sentiment timelines, and comparative topic trackers.',
      date: 'Apr 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 04',
      title: 'Automated Executive PDF Reports',
      description: 'Shipped automated digest generation with statistical variance summaries.',
      date: 'Apr 2026',
      status: 'completed',
    },
  ],
  'devcollab-tool': [
    {
      phase: 'Phase 01',
      title: 'Architecture & Synchronous Protocol',
      description: 'Designed operational transformation model for multi-author markdown document editing.',
      date: 'Jun 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'Project Boards & Code Snippet Sharing',
      description: 'Constructed sprint planning boards with syntax-highlighted team snippet library.',
      date: 'Jul 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'GitHub Webhook & PR Tracker',
      description: 'Integrating GitHub API webhooks to track pull request states directly within task boards.',
      date: 'Aug 2026',
      status: 'in-progress',
    },
    {
      phase: 'Phase 04',
      title: 'Role-Based Club Workspaces',
      description: 'Federated organization directory with customizable access tiers and private channels.',
      date: 'Sep 2026',
      status: 'planned',
    },
  ],
  'autograde-pipeline': [
    {
      phase: 'Phase 01',
      title: 'Sandboxed Docker Runtime Engine',
      description: 'Built isolated execution container environments with memory limits and security filters.',
      date: 'Nov 2025',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'Multi-Language Test Evaluation Core',
      description: 'Implemented automated test runner supporting Python, C++, and Java unit suites.',
      date: 'Dec 2025',
      status: 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'Plagiarism Vector Scoring Engine',
      description: 'Engineered AST-level similarity scoring to identify duplicate solution templates.',
      date: 'Jan 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 04',
      title: 'Instructor Gradebook & Student Feedback Portal',
      description: 'Deployed automated grade aggregation and instant actionable test error traces.',
      date: 'Jan 2026',
      status: 'completed',
    },
  ],
  'pixelcraft-design': [
    {
      phase: 'Phase 01',
      title: 'HTML5 High-Performance Canvas Core',
      description: 'Engineered vector rendering primitives, infinite artboard pan/zoom, and shape transforms.',
      date: 'Jul 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'Multiplayer Real-Time State Sync',
      description: 'Building collaborative multiplayer cursor tracking and simultaneous node mutations.',
      date: 'Aug 2026',
      status: 'in-progress',
    },
    {
      phase: 'Phase 03',
      title: 'Design Tokens & Component Kit',
      description: 'Reusable student UI libraries, color palettes, and interactive prototype transition mode.',
      date: 'Sep 2026',
      status: 'planned',
    },
    {
      phase: 'Phase 04',
      title: 'Direct Code Compiler (React/Tailwind)',
      description: 'Export ready-to-run UI components with semantic markup and responsive Tailwind styles.',
      date: 'Oct 2026',
      status: 'planned',
    },
  ],
  'campusinsights-analytics': [
    {
      phase: 'Phase 01',
      title: 'University Historical Data Integration',
      description: 'Harmonized legacy enrollment, placement records, and department publications into warehouse.',
      date: 'Feb 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'Interactive D3.js Metrics Visualizer',
      description: 'Developed intuitive department performance comparison charts and placement trends.',
      date: 'Mar 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'Forecasting & Predictive Admissions Model',
      description: 'Built regression forecast models for applicant demand distribution across departments.',
      date: 'Apr 2026',
      status: 'completed',
    },
    {
      phase: 'Phase 04',
      title: 'Executive Admin & Strategic Planning Portal',
      description: 'Shipped administrative report builder with high-fidelity visual export tools.',
      date: 'Apr 2026',
      status: 'completed',
    },
  ],
};

export function getProjectTimeline(project: Project): import('./types').ProjectMilestone[] {
  if (project.timeline && project.timeline.length > 0) {
    return project.timeline;
  }
  if (DEFAULT_TIMELINES[project.id]) {
    return DEFAULT_TIMELINES[project.id];
  }
  return [
    {
      phase: 'Phase 01',
      title: 'Concept & Problem Formulation',
      description: `Initial design sprint, student survey, and architecture planning for ${project.title}.`,
      date: 'Phase 1',
      status: 'completed',
    },
    {
      phase: 'Phase 02',
      title: 'Prototype Engine & Core Features',
      description: `Implementation of initial working build using ${project.technologies.slice(0, 3).join(', ')}.`,
      date: 'Phase 2',
      status: project.status === 'Planning' ? 'in-progress' : 'completed',
    },
    {
      phase: 'Phase 03',
      title: 'Testing & Campus Pilot Feedback',
      description: 'Benchmarking performance, security testing, and collecting initial user feedback.',
      date: 'Phase 3',
      status: project.status === 'Completed' ? 'completed' : 'in-progress',
    },
    {
      phase: 'Phase 04',
      title: 'Documentation & Release Deployment',
      description: 'Open-sourcing code repository, final deployment, and student community handoff.',
      date: 'Phase 4',
      status: project.status === 'Completed' ? 'completed' : 'planned',
    },
  ];
}

