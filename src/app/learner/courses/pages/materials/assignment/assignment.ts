import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AssignmentSubmissionDrawer, SubmissionReceiptData } from '../../../components/assignment-submission-drawer/assignment-submission-drawer';

export interface RubricCriterion {
  name: string;
  points: number;
  weight: string;
  description: string;
  levels: {
    title: string;
    score: string;
    detail: string;
  }[];
}

export interface AssignmentDetail {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  moduleName: string;
  dueDate: string;
  points: number;
  submissionType: string;
  status: 'pending' | 'submitted' | 'graded';
  version: number;
  prompt: string;
  instructions: string[];
  deliverables: string[];
  starterFiles: {
    name: string;
    size: string;
    type: 'pdf' | 'zip' | 'code';
    url: string;
  }[];
  rubric: RubricCriterion[];
  submission?: {
    submittedAt: string;
    files: { name: string; size: string; hash: string }[];
    verificationHash: string;
    similarityScore: number;
    grade?: string;
    score?: number;
    feedback?: string;
  };
}

export interface ClassComment {
  id: string;
  author: string;
  role: 'student' | 'instructor' | 'ta';
  avatar: string;
  timeAgo: string;
  message: string;
  upvotes: number;
}

@Component({
  selector: 'app-learner-assignment',
  imports: [RouterLink, FormsModule, AssignmentSubmissionDrawer],
  templateUrl: './assignment.html',
  styleUrl: './assignment.css',
})
export default class Assignment {
  private readonly route = inject(ActivatedRoute);

  readonly courseId = signal<string>('c1');
  readonly assignmentId = signal<string>('a3');

  readonly isSubmissionDrawerOpen = signal<boolean>(false);
  readonly showRubricModal = signal<boolean>(false);
  readonly newCommentText = signal<string>('');

  // Assignments repository
  readonly assignmentsData: Record<string, AssignmentDetail> = {
    'a1': {
      id: 'a1',
      title: 'Problem Set 1.1: Surface Projections & Coordinate Mapping',
      courseCode: 'MATH-301',
      courseName: 'Multivariable Calculus & Analytical Geometry',
      moduleName: 'Module 1: Foundations of Multivariable Functions',
      dueDate: 'Jan 20, 2026 at 11:59 PM',
      points: 50,
      submissionType: 'File Upload (PDF)',
      status: 'graded',
      version: 1,
      prompt: 'Construct cylindrical and spherical coordinate mappings for complex Quadric surfaces. Provide step-by-step orthogonal projection transformations.',
      instructions: [
        'Calculate coordinate conversions for three distinct paraboloid geometries.',
        'Include clear annotated hand-drawn or CAD orthogonal projections.',
        'Demonstrate Jacobian transformations for all non-Cartesian mappings.'
      ],
      deliverables: [
        'Complete analytical proof PDF document.',
        'High-resolution projection sketches.'
      ],
      starterFiles: [
        { name: 'pset1_quadric_templates.pdf', size: '1.2 MB', type: 'pdf', url: '#' },
      ],
      rubric: [
        {
          name: 'Coordinate Transformations',
          points: 20,
          weight: '40%',
          description: 'Correct calculation of cylindrical and spherical coordinate substitutions.',
          levels: [
            { title: 'Exemplary', score: '20 pts', detail: 'Zero algebraic errors, all Jacobian transformations verified.' },
            { title: 'Proficient', score: '16 pts', detail: 'Minor computational slip in one conversion step.' },
            { title: 'Developing', score: '10 pts', detail: 'Incomplete coordinate system mapping.' }
          ]
        },
        {
          name: 'Projection Projections & Clarity',
          points: 30,
          weight: '60%',
          description: 'Accurate and legible orthogonal and axonometric projections.',
          levels: [
            { title: 'Exemplary', score: '30 pts', detail: 'Precise boundary curves, tangent vectors labeled.' },
            { title: 'Proficient', score: '24 pts', detail: 'Slight scale distortion on hyperbolic paraboloid.' },
            { title: 'Developing', score: '15 pts', detail: 'Missing key projection views.' }
          ]
        }
      ],
      submission: {
        submittedAt: 'Jan 19, 2026 at 8:30 PM',
        files: [
          { name: 'pset1_surface_projections_final.pdf', size: '3.1 MB', hash: 'e89b21f0a8' }
        ],
        verificationHash: 'LC-SUB-2026-9912-F9A',
        similarityScore: 2.1,
        grade: 'A+',
        score: 50,
        feedback: 'Superb clarity in your spherical coordinate transformations. Beautiful orthogonal sketches.'
      }
    },
    'a3': {
      id: 'a3',
      title: 'Problem Set 3: Vector Calculus Simulations & Stokes\' Theorem',
      courseCode: 'MATH-301',
      courseName: 'Multivariable Calculus & Analytical Geometry',
      moduleName: 'Module 3: Multiple Integrals & Vector Fields',
      dueDate: 'Oct 24, 2026 at 11:59 PM',
      points: 100,
      submissionType: 'File Upload (.pdf, .py, .ipynb) or Git Repository',
      status: 'pending',
      version: 1,
      prompt: 'In this assignment, you will analytically verify Stokes\' Theorem for non-trivial 3D vector fields and implement a numerical flux simulator in Python to visualize circulation around boundary curves.',
      instructions: [
        'Part 1: Analytical Derivation. Evaluate both the surface integral ∬_S (∇ × F) · dS and line integral ∮_C F · dr for the vector field F(x, y, z) = (y²z, 2xyz, xy) over the upper hemispherical cap x² + y² + z² = 9, z ≥ 0.',
        'Part 2: Python Vector Simulation. Develop a Python script (or Jupyter Notebook) that computes discrete approximations of circulation along polygon contours.',
        'Part 3: Discussion of Boundary Discontinuities. Analyze how Stokes\' theorem behaves when the surface contains non-orientable topology or interior singularities.',
        'Submit all Python scripts alongside an academic PDF solution report.'
      ],
      deliverables: [
        'Mathematical derivation solution report (PDF format).',
        'Executable Python simulation script (`simulation_stokes.py` or `.ipynb`).',
        'Plot renders of vector field stream-lines (.png or embedded in report).'
      ],
      starterFiles: [
        { name: 'vector_sim_starter_v2.zip', size: '2.1 MB', type: 'zip', url: '#' },
        { name: 'stokes_verification_guidelines.pdf', size: '480 KB', type: 'pdf', url: '#' }
      ],
      rubric: [
        {
          name: 'Analytical Derivation Rigor',
          points: 35,
          weight: '35%',
          description: 'Step-by-step calculus proofs for both surface curl integral and closed boundary circulation.',
          levels: [
            { title: 'Exemplary', score: '35 pts', detail: 'Complete parametric substitutions, correct normal vectors, rigorous equality demonstrated.' },
            { title: 'Proficient', score: '28 pts', detail: 'Minor arithmetic slip that does not invalidate the theoretical equivalence.' },
            { title: 'Developing', score: '18 pts', detail: 'Errors in curl computation or incorrect surface parameterization.' }
          ]
        },
        {
          name: 'Computational Simulation',
          points: 35,
          weight: '35%',
          description: 'Python code quality, algorithmic accuracy, and vector field visualization.',
          levels: [
            { title: 'Exemplary', score: '35 pts', detail: 'Clean PEP8 code, vectorized NumPy implementation, clear 3D quiver/stream plots.' },
            { title: 'Proficient', score: '28 pts', detail: 'Functional simulation with slight visualization formatting shortcomings.' },
            { title: 'Developing', score: '18 pts', detail: 'Code fails to execute or converges incorrectly.' }
          ]
        },
        {
          name: 'Theoretical Discussion & Analysis',
          points: 20,
          weight: '20%',
          description: 'Depth of reasoning regarding surface orientation, Möbius strips, and vortex singularities.',
          levels: [
            { title: 'Exemplary', score: '20 pts', detail: 'Insightful, well-cited synthesis linking physical fluid dynamics to topological constraints.' },
            { title: 'Proficient', score: '15 pts', detail: 'Correct overview with standard textbook observations.' },
            { title: 'Developing', score: '10 pts', detail: 'Superficial treatment without mathematical justification.' }
          ]
        },
        {
          name: 'Formatting & Academic Integrity',
          points: 10,
          weight: '10%',
          description: 'Adherence to formatting guidelines, LaTeX typesetting, and proper attribution.',
          levels: [
            { title: 'Exemplary', score: '10 pts', detail: 'Publication-grade PDF formatting with numbered equations.' },
            { title: 'Proficient', score: '8 pts', detail: 'Legible formatting with minor typography inconsistencies.' },
            { title: 'Developing', score: '5 pts', detail: 'Messy layout or missing equation references.' }
          ]
        }
      ]
    }
  };

  // Class Comments Thread
  readonly comments = signal<ClassComment[]>([
    {
      id: 'c1',
      author: 'Maya Lin',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      timeAgo: '4 hours ago',
      message: 'For Part 2, should our Python simulation use NumPy vectorization or can we write standard for-loops over the grid nodes?',
      upvotes: 3
    },
    {
      id: 'c2',
      author: 'Dr. Evelyn Reed',
      role: 'instructor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      timeAgo: '3 hours ago',
      message: 'Vectorized operations in NumPy are preferred for performance, but clear logic and accurate circulation calculations are what matter most for grading.',
      upvotes: 7
    },
    {
      id: 'c3',
      author: 'Julian Ramos',
      role: 'ta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      timeAgo: '1 hour ago',
      message: 'Reminder: Office hours today at 4:00 PM in Room 304 if anyone needs help setting up the Matplotlib 3D quiver plot!',
      upvotes: 4
    }
  ]);

  readonly currentAssignment = computed<AssignmentDetail>(() => {
    const id = this.assignmentId();
    return this.assignmentsData[id] || this.assignmentsData['a3'];
  });

  constructor() {
    this.route.params.subscribe((params) => {
      if (params['assignmentId']) {
        this.assignmentId.set(params['assignmentId']);
      }
    });

    this.route.parent?.params.subscribe((parentParams) => {
      if (parentParams['id']) {
        this.courseId.set(parentParams['id']);
      }
    });
  }

  openSubmissionDrawer(): void {
    this.isSubmissionDrawerOpen.set(true);
  }

  onSubmissionCompleted(receipt: SubmissionReceiptData): void {
    const curr = this.currentAssignment();
    curr.status = 'submitted';
    curr.version = curr.version + 1;
    curr.submission = {
      submittedAt: 'Just now (Oct 18, 2026)',
      files: receipt.files.map((name) => ({
        name,
        size: '2.4 MB',
        hash: receipt.hash.substring(0, 10),
      })),
      verificationHash: receipt.hash,
      similarityScore: 3.8,
    };
  }

  postComment(): void {
    const text = this.newCommentText().trim();
    if (!text) return;

    const newComment: ClassComment = {
      id: 'c_' + Date.now(),
      author: 'Alex Mercer (You)',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      timeAgo: 'Just now',
      message: text,
      upvotes: 0,
    };

    this.comments.update((list) => [...list, newComment]);
    this.newCommentText.set('');
  }

  upvoteComment(id: string): void {
    this.comments.update((list) =>
      list.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c))
    );
  }
}
