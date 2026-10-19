import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface CapabilityGroup {
  id: string;
  name: string;
  description: string;
  capabilities: {
    key: string;
    label: string;
    description: string;
    enabled: boolean;
  }[];
}

export interface AdminRoleItem {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  assignedUsersCount: number;
  assignableScopes: ('Institution' | 'Org Unit' | 'Course' | 'Class')[];
  accessibleDestinations: string[];
  capabilityGroups: CapabilityGroup[];
}

@Component({
  imports: [RouterLink, RouterLinkActive, FormsModule],
  selector: 'app-admin-roles',
  styleUrl: './roles.css',
  templateUrl: './roles.html',
})
export default class Roles {
  readonly peopleNav = [
    { label: 'Directory', path: '/admin/people/directory' },
    { label: 'Roles & Permissions', path: '/admin/people/roles' },
    { label: 'Invitations', path: '/admin/people/invitations' },
  ];

  readonly searchQuery = signal<string>('');
  readonly selectedRoleId = signal<string>('role-instr');
  readonly isCreateRoleDrawerOpen = signal<boolean>(false);

  // New role draft form
  readonly newRoleForm = signal({
    name: '',
    description: '',
    basedOn: 'Instructor',
    scopes: ['Course', 'Class'] as ('Institution' | 'Org Unit' | 'Course' | 'Class')[],
  });

  // Roles list
  readonly roles = signal<AdminRoleItem[]>([
    {
      id: 'role-org-admin',
      name: 'Institution Admin',
      description: 'Comprehensive governance across all institutional units, tenant settings, and integrations.',
      isSystem: true,
      assignedUsersCount: 4,
      assignableScopes: ['Institution'],
      accessibleDestinations: ['Overview', 'People', 'Structure', 'Academics', 'Enrolments', 'Reports', 'Audit Log', 'Settings'],
      capabilityGroups: [
        {
          id: 'admin',
          name: 'Administration & System',
          description: 'Control institutional users, policies, and integrations',
          capabilities: [
            { key: 'user.manage', label: 'Manage Users & Credentials', description: 'Create, suspend, and assign roles to all accounts', enabled: true },
            { key: 'policy.override', label: 'Institutional Policy Governance', description: 'Set passing grades, attendance caps, and AI monthly budgets', enabled: true },
            { key: 'audit.view', label: 'View Immutable Audit Ledger', description: 'Inspect chronological logs of administrative actions', enabled: true },
          ],
        },
        {
          id: 'authoring',
          name: 'Curriculum & Courses',
          description: 'Accreditation and course publication controls',
          capabilities: [
            { key: 'course.publish', label: 'Approve & Publish Courses', description: 'Release syllabi into institutional course catalog', enabled: true },
            { key: 'class.manage', label: 'Manage Classes & Join Codes', description: 'Create sections, assign staff, and generate join codes', enabled: true },
          ],
        },
      ],
    },
    {
      id: 'role-acad-admin',
      name: 'Academic Admin',
      description: 'Manages sessions, academic calendars, curriculum blueprints, and broadsheet grade audits.',
      isSystem: true,
      assignedUsersCount: 8,
      assignableScopes: ['Institution', 'Org Unit'],
      accessibleDestinations: ['Overview', 'Structure', 'Academics', 'Reports', 'Audit Log'],
      capabilityGroups: [
        {
          id: 'academic',
          name: 'Academic Operations',
          description: 'Calendar and session progression',
          capabilities: [
            { key: 'calendar.manage', label: 'Manage Academic Calendars', description: 'Set term dates, exam periods, and official holidays', enabled: true },
            { key: 'broadsheet.view', label: 'Official Broadsheet Access', description: 'Review multi-course GPA/CGPA ledgers and standing', enabled: true },
            { key: 'appeal.adjudicate', label: 'Adjudicate Grade Appeals', description: 'Resolve formal grade disputes escalated by learners', enabled: true },
          ],
        },
      ],
    },
    {
      id: 'role-dept-admin',
      name: 'Department Admin',
      description: 'Heads and administrators managing staff, courses, and students within a specific org unit.',
      isSystem: true,
      assignedUsersCount: 16,
      assignableScopes: ['Org Unit'],
      accessibleDestinations: ['Overview', 'People', 'Academics', 'Enrolments', 'Reports'],
      capabilityGroups: [
        {
          id: 'dept',
          name: 'Department Oversight',
          description: 'Staffing and course allocations within unit',
          capabilities: [
            { key: 'dept.assign_staff', label: 'Assign Instructors to Classes', description: 'Allocate lead lecturers and TAs to running sections', enabled: true },
            { key: 'dept.roster_view', label: 'Inspect Unit Enrolments', description: 'Track learner attendance and risk indicators in department', enabled: true },
          ],
        },
      ],
    },
    {
      id: 'role-coord',
      name: 'Course Coordinator',
      description: 'Curriculum lead overseeing syllabus standards, learning materials, and rubric moderation.',
      isSystem: false,
      assignedUsersCount: 24,
      assignableScopes: ['Org Unit', 'Course'],
      accessibleDestinations: ['Teaching Studio', 'Assessment Bank', 'Grading Workspace', 'Content Library'],
      capabilityGroups: [
        {
          id: 'authoring',
          name: 'Course Coordination',
          description: 'Syllabus and assessment blueprint stewardship',
          capabilities: [
            { key: 'course.edit_blueprint', label: 'Edit Course Blueprint', description: 'Author module hierarchies and outcomes', enabled: true },
            { key: 'rubric.standardize', label: 'Publish Standard Rubrics', description: 'Enforce grading criteria across all class sections', enabled: true },
            { key: 'grade.moderate', label: 'Moderate Assessment Marks', description: 'Sample submissions across instructors for consistency', enabled: true },
          ],
        },
      ],
    },
    {
      id: 'role-instr',
      name: 'Instructor',
      description: 'Primary teaching faculty: authors lessons, teaches classes, delivers assessments, and grades submissions.',
      isSystem: true,
      assignedUsersCount: 142,
      assignableScopes: ['Course', 'Class'],
      accessibleDestinations: ['Teaching Studio', 'Live Classroom', 'Assessment Bank', 'Grading Workspace', 'Content Library'],
      capabilityGroups: [
        {
          id: 'authoring',
          name: 'Content & Authoring',
          description: 'Lesson editing and question authoring',
          capabilities: [
            { key: 'lesson.author', label: 'Create & Edit Lessons', description: 'Author interactive learning objects and reading materials', enabled: true },
            { key: 'assessment.deliver', label: 'Deliver Quizzes & Exams', description: 'Schedule and deploy assessments to enrolled students', enabled: true },
          ],
        },
        {
          id: 'teaching',
          name: 'Teaching & Grading',
          description: 'Classroom management and assessment feedback',
          capabilities: [
            { key: 'live.host', label: 'Host Live Classrooms', description: 'Lead real-time lectures with broadcast canvas and audio', enabled: true },
            { key: 'grade.submit', label: 'Grade Student Submissions', description: 'Score assignments and provide rubric-based feedback', enabled: true },
          ],
        },
      ],
    },
    {
      id: 'role-ta',
      name: 'Teaching Assistant',
      description: 'Assists faculty with grading queues, discussion moderation, and student office hours.',
      isSystem: true,
      assignedUsersCount: 42,
      assignableScopes: ['Class'],
      accessibleDestinations: ['Grading Workspace', 'Live Classroom', 'Discussions'],
      capabilityGroups: [
        {
          id: 'grading',
          name: 'Assistance & Grading',
          description: 'Grading queue and discussion moderation',
          capabilities: [
            { key: 'grade.provisional', label: 'Submit Provisional Grades', description: 'Score submissions subject to lead instructor approval', enabled: true },
            { key: 'discussion.moderate', label: 'Moderate Class Discussions', description: 'Pin, answer, or flag learner forum threads', enabled: true },
          ],
        },
      ],
    },
    {
      id: 'role-learner',
      name: 'Learner',
      description: 'Student consuming courses, submitting assessments, practising mastery, and interacting with AI tutor.',
      isSystem: true,
      assignedUsersCount: 4820,
      assignableScopes: ['Class'],
      accessibleDestinations: ['Learner Home', 'My Courses', 'Lesson Player', 'Practice', 'Assessments', 'Results', 'AI Tutor'],
      capabilityGroups: [
        {
          id: 'student',
          name: 'Learner Access',
          description: 'Learning consumption and submission privileges',
          capabilities: [
            { key: 'lesson.view', label: 'Consume Lessons & Media', description: 'Access published learning modules and videos', enabled: true },
            { key: 'assignment.submit', label: 'Submit Assessments', description: 'Take quizzes, practicals, and submit coursework', enabled: true },
            { key: 'tutor.query', label: 'Query AI Tutor', description: 'Socratic dialogue on unlocked learning objectives', enabled: true },
          ],
        },
      ],
    },
  ]);

  // Active selected role
  readonly activeRole = computed(() => {
    return this.roles().find((r) => r.id === this.selectedRoleId()) || this.roles()[0];
  });

  // Filtered roles list
  readonly filteredRoles = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.roles();
    return this.roles().filter(
      (r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    );
  });

  selectRole(id: string): void {
    this.selectedRoleId.set(id);
  }

  toggleCapability(groupId: string, key: string): void {
    const roleId = this.selectedRoleId();
    this.roles.update((list) =>
      list.map((r) => {
        if (r.id !== roleId) return r;
        const updatedGroups = r.capabilityGroups.map((g) => {
          if (g.id !== groupId) return g;
          return {
            ...g,
            capabilities: g.capabilities.map((c) =>
              c.key === key ? { ...c, enabled: !c.enabled } : c
            ),
          };
        });
        return { ...r, capabilityGroups: updatedGroups };
      })
    );
  }

  openCreateRoleDrawer(): void {
    this.isCreateRoleDrawerOpen.set(true);
  }

  closeCreateRoleDrawer(): void {
    this.isCreateRoleDrawerOpen.set(false);
  }

  submitCreateRole(): void {
    const form = this.newRoleForm();
    if (!form.name) return;

    const baseRole = this.roles().find((r) => r.name === form.basedOn) || this.roles()[4];
    const newRole: AdminRoleItem = {
      id: `role-custom-${Date.now()}`,
      name: form.name,
      description: form.description || `Custom role cloned from ${baseRole.name}`,
      isSystem: false,
      assignedUsersCount: 0,
      assignableScopes: [...form.scopes],
      accessibleDestinations: [...baseRole.accessibleDestinations],
      capabilityGroups: JSON.parse(JSON.stringify(baseRole.capabilityGroups)),
    };

    this.roles.update((prev) => [...prev, newRole]);
    this.selectedRoleId.set(newRole.id);
    this.closeCreateRoleDrawer();

    this.newRoleForm.set({
      name: '',
      description: '',
      basedOn: 'Instructor',
      scopes: ['Course', 'Class'],
    });
  }
}
