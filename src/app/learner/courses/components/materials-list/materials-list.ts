import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type LearnerMaterialType = 
  | 'header'
  | 'module' 
  | 'lesson' 
  | 'assignment' 
  | 'quiz' 
  | 'discussion' 
  | 'page' 
  | 'video' 
  | 'audio' 
  | 'image' 
  | 'file' 
  | 'link'
  | 'live-class';

export interface LearnerMaterialNode {
  id: string;
  type: LearnerMaterialType;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  duration?: string;
  points?: string;
  dueDate?: string;
  url?: string;
  expanded?: boolean;
  completionStatus?: 'completed' | 'in-progress' | 'pending' | 'locked';
  score?: string;
  skills?: string[];
  objectives?: string[];
  children?: LearnerMaterialNode[];
  progress?: number;          // 0 to 100 percentage
  progressDetail?: string;    // e.g. "Watched 18:20 / 28:15", "6 of 6 completed"
}

export interface ActiveMediaState {
  id: string;
  type: 'video' | 'audio' | 'image' | 'file' | 'live-class';
  title: string;
  subtitle?: string;
  url?: string;
  progress?: number;
  progressDetail?: string;
}

@Component({
  imports: [NgTemplateOutlet, RouterLink],
  selector: 'app-materials-list',
  styleUrl: './materials-list.css',
  templateUrl: './materials-list.html',
})
export class MaterialsList {
  readonly activeMedia = signal<ActiveMediaState | null>(null);

  readonly selectedFilter = signal<'all' | 'modules' | 'assignments' | 'media' | 'readings' | 'live'>('all');
  readonly allExpanded = signal<boolean>(true);
  readonly isMediaPlaying = signal<boolean>(false);
  readonly audioProgress = signal<number>(42);

  readonly nodes = signal<LearnerMaterialNode[]>([
    // SECTION 1: ORIENTATION & FOUNDATION (Standalone resources showcase)
    {
      id: 'header-orientation',
      type: 'header',
      title: 'Course Orientation & Essential Resource Hub',
      subtitle: 'Official course guidelines, syllabus, visual reference infographics, and interactive external tools to get started.',
    },
    {
      id: 'res-syllabus',
      type: 'file',
      title: 'Official MATH-204 Course Syllabus & Grading Policies (PDF)',
      subtitle: '2.4 MB · Downloadable & Printable Reference',
      url: '/mock/syllabus.pdf',
      completionStatus: 'completed',
      progress: 100,
      progressDetail: 'Downloaded & Reviewed (100%)',
    },
    {
      id: 'res-link',
      type: 'link',
      title: 'MIT OpenCourseWare: Multivariable Calculus 3D Visualizer',
      subtitle: 'https://ocw.mit.edu/courses/mathematics/18-02sc-multivariable-calculus',
      url: 'https://ocw.mit.edu/courses/mathematics/',
      completionStatus: 'completed',
      progress: 100,
      progressDetail: 'Explored tool (100%)',
    },
    {
      id: 'res-image',
      type: 'image',
      title: 'Infographic: Multivariable Calculus Map & Coordinate Cheat Sheet',
      subtitle: '3.1 MB · PNG',
      url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
      completionStatus: 'completed',
      progress: 100,
      progressDetail: 'Viewed infographic (100%)',
    },
    {
      id: 'res-live-orientation',
      type: 'live-class',
      title: 'Live Orientation Seminar: Course Roadmap & Study Strategies',
      subtitle: 'Recorded Session · 1h 15m · Available for on-demand playback',
      url: 'https://meet.google.com/math204-orientation',
      completionStatus: 'completed',
      progress: 100,
      progressDetail: 'Attended session (1h 15m · 100%)',
    },

    // SECTION 2: CORE CURRICULUM MODULES
    {
      id: 'header-curriculum',
      type: 'header',
      title: 'Part I: Core Curriculum Modules & Lessons',
      subtitle: 'Sequential learning modules with nested sub-modules, lessons, videos, audios, readings, assignments, and discussions.',
    },
    {
      id: 'm1',
      type: 'module',
      title: 'Module 1: Foundations of Multivariable Functions',
      subtitle: 'Completed Jan 28, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=150&auto=format&fit=crop&q=80',
      expanded: true,
      completionStatus: 'completed',
      progress: 100,
      progressDetail: '6 of 6 activities completed (100%)',
      skills: ['Coordinate Systems', 'Partial Derivatives', 'Chain Rule'],
      objectives: [
        'Define functions of two or more independent variables.',
        'Compute first and second-order partial derivatives analytically.'
      ],
      children: [
        {
          id: 'sub-m1-1',
          type: 'module',
          title: 'Sub-Module 1.1: 3D Coordinate Systems & Parametric Surfaces',
          subtitle: 'Completed Jan 22, 2026',
          thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150&auto=format&fit=crop&q=80',
          expanded: true,
          completionStatus: 'completed',
          progress: 100,
          progressDetail: '6 of 6 activities completed (100%)',
          skills: ['3D Geometry', 'Cylindrical & Spherical Bases'],
          objectives: [
            'Transform between Cartesian, cylindrical, and spherical coordinate systems.',
            'Plot quadric surfaces and traces in 3-space.'
          ],
          children: [
            {
              id: 'l1-1',
              type: 'lesson',
              title: 'Lesson 1.1: Cylindrical & Spherical Transformations',
              subtitle: '45 mins reading & exercises',
              thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=150&auto=format&fit=crop&q=80',
              expanded: true,
              completionStatus: 'completed',
              progress: 100,
              progressDetail: '6 of 6 items completed (100%)',
              children: [
                {
                  id: 'v1-1',
                  type: 'video',
                  title: 'Visualizing 3D Coordinate Transformations',
                  subtitle: '22:15 mins video · 1080p HD',
                  url: 'https://youtu.be/zpOULjyy-n8',
                  completionStatus: 'completed',
                  progress: 100,
                  progressDetail: 'Watched 22:15 / 22:15 (100%)',
                },
                {
                  id: 'a1-1',
                  type: 'audio',
                  title: 'Audio Summary: Right-Hand Rule & Cylindrical Polar Bases',
                  subtitle: '08:20 mins audio podcast',
                  url: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
                  completionStatus: 'completed',
                  progress: 100,
                  progressDetail: 'Listened 08:20 / 08:20 (100%)',
                },
                {
                  id: 'img1-1',
                  type: 'image',
                  title: 'Visual Diagram: Spherical Octant Projections & Angle Bounds',
                  subtitle: '1.4 MB · PNG',
                  thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150&auto=format&fit=crop&q=80',
                  url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&auto=format&fit=crop&q=80',
                  completionStatus: 'completed',
                  progress: 100,
                  progressDetail: 'Inspected diagram (100%)',
                },
                {
                  id: 'f1-1',
                  type: 'file',
                  title: 'Cheat Sheet: Coordinate Transformation Formulas (PDF)',
                  subtitle: '850 KB · PDF',
                  url: '/mock/cheatsheet.pdf',
                  completionStatus: 'completed',
                  progress: 100,
                  progressDetail: 'Downloaded & saved (100%)',
                },
                {
                  id: 'link1-1',
                  type: 'link',
                  title: 'External Tool: GeoGebra 3D Calculator Coordinate Modeler',
                  subtitle: 'https://www.geogebra.org/3d',
                  url: 'https://www.geogebra.org/3d',
                  completionStatus: 'completed',
                  progress: 100,
                  progressDetail: 'Explored simulation (100%)',
                },
                {
                  id: 'asgn1-1',
                  type: 'assignment',
                  title: 'Problem Set 1.1: Surface Projections & Coordinate Mapping',
                  subtitle: 'Submitted Jan 20',
                  points: '50/50 pts',
                  completionStatus: 'completed',
                  score: '100%',
                  progress: 100,
                  progressDetail: 'Graded: 50/50 pts (100%)',
                }
              ]
            },
            {
              id: 'l1-2',
              type: 'lesson',
              title: 'Lesson 1.2: Partial Differentiation Basics & Chain Rule',
              subtitle: 'Completed Jan 26',
              thumbnail: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=150&auto=format&fit=crop&q=80',
              expanded: true,
              completionStatus: 'completed',
              progress: 100,
              progressDetail: '4 of 4 items completed (100%)',
              children: [
                {
                  id: 'page1-2',
                  type: 'page',
                  title: 'Reading Notes: Hyperplane Approximations & Differential Calculus',
                  subtitle: '12 mins read · In-depth commentary',
                  completionStatus: 'completed',
                  progress: 100,
                  progressDetail: 'Read 12 of 12 mins (100%)',
                },
                {
                  id: 'v1-2',
                  type: 'video',
                  title: 'Multivariable Chain Rule Worked Problems',
                  subtitle: '18:40 mins video',
                  url: 'https://youtu.be/zpOULjyy-n8',
                  completionStatus: 'completed',
                  progress: 100,
                  progressDetail: 'Watched 18:40 / 18:40 (100%)',
                },
                {
                  id: 'q1-1',
                  type: 'quiz',
                  title: 'Quiz 1: Partial Differentiation Basics',
                  subtitle: 'Scored 24/25 pts',
                  points: '24/25 pts',
                  completionStatus: 'completed',
                  score: '96%',
                  progress: 100,
                  progressDetail: 'Passed: 24/25 pts (96%)',
                },
                {
                  id: 'd1-2',
                  type: 'discussion',
                  title: 'Discussion: Intuitive Explanations of Partial Derivatives in Physics',
                  subtitle: 'Participated · 14 replies',
                  completionStatus: 'completed',
                  progress: 100,
                  progressDetail: 'Participated (1 response, 14 replies)',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm2',
      type: 'module',
      title: 'Module 2: Directional Derivatives & The Gradient Vector',
      subtitle: 'Completed Feb 18, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=150&auto=format&fit=crop&q=80',
      expanded: false,
      completionStatus: 'completed',
      progress: 100,
      progressDetail: '4 of 4 activities completed (100%)',
      skills: ['Gradients', 'Tangent Planes', 'Lagrange Multipliers'],
      objectives: [
        'Compute the gradient vector and directional derivatives.',
        'Apply Lagrange multipliers to solve constrained optimization problems.'
      ],
      children: [
        {
          id: 'l2-1',
          type: 'lesson',
          title: 'Lesson 2.1: Tangent Planes & Linear Approximations',
          subtitle: 'Completed Feb 12',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
          expanded: false,
          completionStatus: 'completed',
          progress: 100,
          progressDetail: '2 of 2 items completed (100%)',
          children: [
            {
              id: 'page2-1',
              type: 'page',
              title: 'Notes: Hyperplane Approximation Formulas & Error Bounds',
              subtitle: '10 mins read',
              completionStatus: 'completed',
              progress: 100,
              progressDetail: 'Read 10 of 10 mins (100%)',
            },
            {
              id: 'a2-1',
              type: 'assignment',
              title: 'Written Exercise 2: Extreme Values & Saddle Points',
              subtitle: 'Submitted Feb 16',
              points: '48/50 pts',
              completionStatus: 'completed',
              score: '96%',
              progress: 100,
              progressDetail: 'Graded: 48/50 pts (96%)',
            }
          ]
        },
        {
          id: 'sub-m2-2',
          type: 'module',
          title: 'Sub-Module 2.2: Constrained Optimization & Lagrange Multipliers',
          subtitle: 'Completed Feb 18',
          thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&auto=format&fit=crop&q=80',
          expanded: false,
          completionStatus: 'completed',
          progress: 100,
          progressDetail: '2 of 2 activities completed (100%)',
          skills: ['Lagrange Multipliers', 'Critical Points'],
          objectives: [
            'Formulate Lagrangian functions for multi-constraint problems.',
            'Find global maxima and minima on compact sets.'
          ],
          children: [
            {
              id: 'l2-2',
              type: 'lesson',
              title: 'Lesson 2.2: Solving Constrained Systems',
              subtitle: 'Completed Feb 17',
              thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&auto=format&fit=crop&q=80',
              completionStatus: 'completed',
              progress: 100,
              progressDetail: 'Completed Feb 17 (100%)',
            },
            {
              id: 'd2-1',
              type: 'discussion',
              title: 'Discussion: Real-world Applications of Lagrange Multipliers in Economics',
              subtitle: 'Participated (3 replies)',
              completionStatus: 'completed',
              progress: 100,
              progressDetail: 'Participated (3 replies)',
            }
          ]
        }
      ]
    },
    {
      id: 'm3',
      type: 'module',
      title: 'Module 3: Multiple Integrals & Vector Fields',
      subtitle: 'Current Active Module · 68% Completed',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80',
      expanded: true,
      completionStatus: 'in-progress',
      progress: 68,
      progressDetail: '5 of 8 activities completed (68%)',
      skills: ['Double Integrals', 'Vector Fields', 'Line Integrals', 'Green\'s Theorem'],
      objectives: [
        'Evaluate double integrals over general regions and polar coordinates.',
        'Define vector fields and compute work along smooth curves.'
      ],
      children: [
        {
          id: 'live-3-seminar',
          type: 'live-class',
          title: 'Live Workshop: Double Integrals over Non-Standard Boundaries',
          subtitle: 'Live Today at 4:00 PM · Interactive Virtual Classroom with Prof. Okosun',
          url: 'https://meet.google.com/math204-live-workshop',
          completionStatus: 'in-progress',
          progress: 80,
          progressDetail: 'Live seminar attended (55 mins · 80%)',
        },
        {
          id: 'l3-1',
          type: 'lesson',
          title: 'Lesson 3.1: Double Integrals over General Regions',
          subtitle: 'Completed Feb 25',
          thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150&auto=format&fit=crop&q=80',
          expanded: false,
          completionStatus: 'completed',
          progress: 100,
          progressDetail: '2 of 2 items completed (100%)',
          children: [
            {
              id: 'v3-1',
              type: 'video',
              title: 'Lecture: Setting Up Bounds in Non-Rectangular Regions',
              subtitle: '34:20 mins video · 1080p HD',
              url: 'https://youtu.be/zpOULjyy-n8',
              completionStatus: 'completed',
              progress: 100,
              progressDetail: 'Watched 34:20 / 34:20 (100%)',
            },
            {
              id: 'page3-1',
              type: 'page',
              title: 'Reading Notes: Fubini\'s Theorem & Reversing Orders of Integration',
              subtitle: '8 mins read · Mathematical notes',
              completionStatus: 'completed',
              progress: 100,
              progressDetail: 'Read 8 of 8 mins (100%)',
            }
          ]
        },
        {
          id: 'l3-2',
          type: 'lesson',
          title: 'Lesson 3.2: Vector Fields & Conservative Potentials',
          subtitle: 'In progress · 20 mins remaining',
          thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=150&auto=format&fit=crop&q=80',
          expanded: true,
          completionStatus: 'in-progress',
          progress: 60,
          progressDetail: '3 of 5 items completed · 2 remaining (60%)',
          skills: ['Gradient Fields', 'Line Integrals of Vector Fields'],
          objectives: [
            'Determine whether a 2D or 3D vector field is conservative.',
            'Compute potential functions using partial integration.'
          ],
          children: [
            {
              id: 'v3-2',
              type: 'video',
              title: 'Interactive Lecture: Vector Fields & Gradient Potentials',
              subtitle: '28:15 mins video · Required viewing',
              url: 'https://youtu.be/zpOULjyy-n8',
              completionStatus: 'in-progress',
              progress: 65,
              progressDetail: 'Watched 18:20 / 28:15 (65% · 10 mins left)',
            },
            {
              id: 'a3-audio',
              type: 'audio',
              title: 'Instructor Podcast: Intuition Behind Work Along Curves & Conservative Loops',
              subtitle: '12:45 mins audio · Listen anytime',
              url: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
              completionStatus: 'in-progress',
              progress: 42,
              progressDetail: 'Listened 05:20 / 12:45 (42% · 7 mins left)',
            },
            {
              id: 'page3-2',
              type: 'page',
              title: 'Reading Notes: Fundamental Theorem of Line Integrals & Path Independence',
              subtitle: '14 mins read · Theory & Proofs',
              completionStatus: 'pending',
              progress: 0,
              progressDetail: '0 of 14 mins read (Not started)',
            },
            {
              id: 'img3-2',
              type: 'image',
              title: 'Vector Field Visual Atlas: Source, Sink, Saddle & Vortex Flow Lines',
              subtitle: '2.8 MB · Infographic Diagram',
              thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80',
              url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
              completionStatus: 'pending',
              progress: 0,
              progressDetail: 'Not viewed yet (0%)',
            },
            {
              id: 'link3-2',
              type: 'link',
              title: 'External Simulation: Interactive 2D Vector Field Flow Sandbox',
              subtitle: 'https://physics.weber.edu/schroeder/vectorfields/',
              url: 'https://physics.weber.edu/schroeder/vectorfields/',
              completionStatus: 'pending',
              progress: 0,
              progressDetail: 'Not started (0%)',
            },
            {
              id: 'q3-1',
              type: 'quiz',
              title: 'Quiz 3: Line Integrals, Conservative Fields & Independence',
              subtitle: 'Due Tonight, 11:59 PM',
              points: '25 pts',
              dueDate: 'Tonight, 11:59 PM',
              completionStatus: 'pending',
              progress: 0,
              progressDetail: 'Not started · Due Tonight',
            },
            {
              id: 'a3-1',
              type: 'assignment',
              title: 'Problem Set 3: Vector Calculus Simulations & Conservative Field Proofs',
              subtitle: 'Due Friday, Oct 16',
              points: '100 pts',
              dueDate: 'Oct 16, 5:00 PM',
              completionStatus: 'pending',
              progress: 0,
              progressDetail: 'Draft saved · Due Oct 16',
            },
            {
              id: 'd3-1',
              type: 'discussion',
              title: 'Discussion: Why Does Curl Equal Zero in Conservative Vector Fields?',
              subtitle: '18 student replies · Active discussion',
              completionStatus: 'pending',
              progress: 0,
              progressDetail: 'Unread thread · 18 replies',
            }
          ]
        }
      ]
    },
    {
      id: 'm4',
      type: 'module',
      title: 'Module 4: Green\'s Theorem & Stokes\' Theorem',
      subtitle: 'Unlocks upon Module 3 completion',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=150&auto=format&fit=crop&q=80',
      expanded: false,
      completionStatus: 'locked',
      progress: 0,
      progressDetail: 'Locked · 0 of 2 items completed (0%)',
      skills: ['Flux Integrals', 'Curl & Divergence'],
      objectives: [
        'Apply Green’s Theorem relating line integrals to double integrals.',
        'State and utilize Stokes’ Theorem and Divergence Theorem in 3D.'
      ],
      children: [
        {
          id: 'l4-1',
          type: 'lesson',
          title: 'Lesson 4.1: Curl and Divergence in 3D Space',
          subtitle: 'Available Oct 20',
          thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150&auto=format&fit=crop&q=80',
          completionStatus: 'locked',
          progress: 0,
          progressDetail: 'Locked · Available Oct 20',
        },
        {
          id: 'f4-1',
          type: 'file',
          title: 'Reference Cheat Sheet: Vector Integral Theorems & Identities (PDF)',
          subtitle: '1.4 MB · Locked',
          url: '/mock/theorems.pdf',
          completionStatus: 'locked',
          progress: 0,
          progressDetail: 'Locked',
        }
      ]
    },

    // SECTION 3: COMPREHENSIVE EXAMS & CAPSTONES
    {
      id: 'header-assessments',
      type: 'header',
      title: 'Part II: Comprehensive Assessments & Capstone Milestones',
      subtitle: 'Midterm exams, research capstones, and scheduled final review seminars.',
    },
    {
      id: 'standalone-midterm',
      type: 'quiz',
      title: 'Midterm Examination (Comprehensive Modules 1-2)',
      subtitle: 'Completed Feb 20 · 50 Questions & Proofs',
      points: '94 / 100 pts',
      completionStatus: 'completed',
      score: '94%',
      progress: 100,
      progressDetail: 'Graded: 94/100 pts (94%)',
    },
    {
      id: 'standalone-capstone',
      type: 'assignment',
      title: 'Final Capstone Project: Computational Fluid Flow Modeling in 3-Space',
      subtitle: 'Due Dec 10, 2026 · Group or Individual Research Submission',
      points: '150 pts',
      dueDate: 'Dec 10, 11:59 PM',
      completionStatus: 'pending',
      progress: 25,
      progressDetail: 'Proposal approved · In progress (25%)',
    },
    {
      id: 'standalone-live-review',
      type: 'live-class',
      title: 'Live Final Exam Masterclass & Interactive Socratic Review',
      subtitle: 'Scheduled Dec 12, 2:00 PM · Live streaming with TA problem walkthroughs',
      url: 'https://meet.google.com/math204-final-review',
      completionStatus: 'pending',
      progress: 0,
      progressDetail: 'Scheduled · Dec 12, 2:00 PM',
    }
  ]);

  readonly totalItemCount = computed(() => {
    let count = 0;
    const countNode = (node: LearnerMaterialNode) => {
      if (node.type !== 'header') count++;
      node.children?.forEach(countNode);
    };
    this.nodes().forEach(countNode);
    return count;
  });

  readonly typeCounts = computed(() => {
    const counts: Record<string, number> = {};
    const countNode = (node: LearnerMaterialNode) => {
      counts[node.type] = (counts[node.type] || 0) + 1;
      node.children?.forEach(countNode);
    };
    this.nodes().forEach(countNode);
    return counts;
  });

  readonly progressSummary = computed(() => {
    let modulesTotal = 0;
    let modulesCompleted = 0;
    let lessonsTotal = 0;
    let lessonsCompleted = 0;
    let videosTotal = 0;
    let videosCompleted = 0;
    let audiosTotal = 0;
    let audiosCompleted = 0;

    const inspectNode = (node: LearnerMaterialNode) => {
      if (node.type === 'module') {
        modulesTotal++;
        if (node.completionStatus === 'completed' || (node.progress !== undefined && node.progress === 100)) {
          modulesCompleted++;
        }
      } else if (node.type === 'lesson') {
        lessonsTotal++;
        if (node.completionStatus === 'completed' || (node.progress !== undefined && node.progress === 100)) {
          lessonsCompleted++;
        }
      } else if (node.type === 'video') {
        videosTotal++;
        if (node.completionStatus === 'completed' || (node.progress !== undefined && node.progress === 100)) {
          videosCompleted++;
        }
      } else if (node.type === 'audio') {
        audiosTotal++;
        if (node.completionStatus === 'completed' || (node.progress !== undefined && node.progress === 100)) {
          audiosCompleted++;
        }
      }
      node.children?.forEach(inspectNode);
    };

    this.nodes().forEach(inspectNode);

    return {
      modules: { 
        total: modulesTotal, 
        completed: modulesCompleted, 
        pct: modulesTotal ? Math.round((modulesCompleted / modulesTotal) * 100) : 0 
      },
      lessons: { 
        total: lessonsTotal, 
        completed: lessonsCompleted, 
        pct: lessonsTotal ? Math.round((lessonsCompleted / lessonsTotal) * 100) : 0 
      },
      videos: { 
        total: videosTotal, 
        completed: videosCompleted, 
        pct: videosTotal ? Math.round((videosCompleted / videosTotal) * 100) : 0 
      },
      audios: { 
        total: audiosTotal, 
        completed: audiosCompleted, 
        pct: audiosTotal ? Math.round((audiosCompleted / audiosTotal) * 100) : 0 
      },
    };
  });

  readonly filteredNodes = computed(() => {
    const filter = this.selectedFilter();
    const all = this.nodes();
    if (filter === 'all') return all;

    const matchesFilter = (type: LearnerMaterialType): boolean => {
      if (filter === 'modules') return type === 'module' || type === 'lesson' || type === 'header';
      if (filter === 'assignments') return type === 'assignment' || type === 'quiz' || type === 'header';
      if (filter === 'media') return type === 'video' || type === 'audio' || type === 'image' || type === 'file' || type === 'header';
      if (filter === 'readings') return type === 'page' || type === 'link' || type === 'discussion' || type === 'header';
      if (filter === 'live') return type === 'live-class' || type === 'header';
      return true;
    };

    const filterTree = (list: LearnerMaterialNode[]): LearnerMaterialNode[] => {
      const result: LearnerMaterialNode[] = [];
      for (const node of list) {
        const children = node.children ? filterTree(node.children) : undefined;
        const selfMatch = matchesFilter(node.type);
        if (selfMatch || (children && children.length > 0)) {
          result.push({
            ...node,
            ...(children ? { children } : {})
          });
        }
      }
      return result;
    };

    return filterTree(all);
  });

  setFilter(filter: 'all' | 'modules' | 'assignments' | 'media' | 'readings' | 'live') {
    this.selectedFilter.set(filter);
  }

  toggleNode(node: LearnerMaterialNode) {
    if (node.type === 'module' || node.type === 'lesson') {
      node.expanded = !node.expanded;
      this.nodes.update(nodes => [...nodes]);
    }
  }

  toggleExpandAll() {
    const nextState = !this.allExpanded();
    this.allExpanded.set(nextState);
    const setExpand = (node: LearnerMaterialNode) => {
      if (node.type === 'module' || node.type === 'lesson') {
        node.expanded = nextState;
        node.children?.forEach(setExpand);
      }
    };
    this.nodes.update(nodes => {
      nodes.forEach(setExpand);
      return [...nodes];
    });
  }

  openMedia(
    id: string,
    type: 'video' | 'audio' | 'image' | 'file' | 'live-class',
    title: string,
    url: string,
    subtitle?: string,
    progress?: number,
    progressDetail?: string
  ) {
    this.activeMedia.set({ id, type, title, url, subtitle, progress, progressDetail });
    this.isMediaPlaying.set(false);
  }

  closeMedia() {
    this.activeMedia.set(null);
    this.isMediaPlaying.set(false);
  }

  togglePlayState() {
    this.isMediaPlaying.update(p => !p);
  }

  markActiveMediaCompleted() {
    const media = this.activeMedia();
    if (!media || !media.id) {
      this.closeMedia();
      return;
    }

    const markNode = (nodeList: LearnerMaterialNode[]): boolean => {
      for (const node of nodeList) {
        if (node.id === media.id) {
          node.completionStatus = 'completed';
          node.progress = 100;
          if (node.type === 'video') {
            node.progressDetail = 'Watched 100% · Completed';
          } else if (node.type === 'audio') {
            node.progressDetail = 'Listened 100% · Completed';
          } else {
            node.progressDetail = '100% Completed';
          }
          return true;
        }
        if (node.children && markNode(node.children)) {
          return true;
        }
      }
      return false;
    };

    this.nodes.update(nodes => {
      markNode(nodes);
      this.recalculateTreeProgress(nodes);
      return [...nodes];
    });

    this.closeMedia();
  }

  private recalculateTreeProgress(nodes: LearnerMaterialNode[]): void {
    const process = (node: LearnerMaterialNode): { total: number; sum: number } => {
      if (!node.children || node.children.length === 0) {
        return {
          total: node.type !== 'header' && node.progress !== undefined ? 1 : 0,
          sum: node.type !== 'header' && node.progress !== undefined ? node.progress : 0
        };
      }

      let count = 0;
      let totalSum = 0;
      let completedCount = 0;

      for (const child of node.children) {
        const res = process(child);
        count += res.total;
        totalSum += res.sum;
        if (child.completionStatus === 'completed' || child.progress === 100) {
          completedCount++;
        }
      }

      if (node.type === 'module' || node.type === 'lesson') {
        if (count > 0) {
          const avg = Math.round(totalSum / count);
          node.progress = avg;
          node.progressDetail = `${completedCount} of ${node.children.length} completed (${avg}%)`;
          if (avg === 100) {
            node.completionStatus = 'completed';
          } else if (avg > 0 && node.completionStatus !== 'locked') {
            node.completionStatus = 'in-progress';
          }
        }
      }

      return { total: count, sum: totalSum };
    };

    nodes.forEach(process);
  }
}
