import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type UserRoleType =
  | 'Institution Admin'
  | 'Academic Admin'
  | 'Department Admin'
  | 'Course Coordinator'
  | 'Instructor'
  | 'Teaching Assistant'
  | 'Learner'
  | 'Guardian';

export type UserStatusType = 'Active' | 'Invited' | 'Suspended';

export interface UserRoleAssignment {
  role: UserRoleType;
  scope: string; // e.g., 'Institution', 'Faculty of Sciences', 'MATH-204-A'
}

export interface AdminDirectoryUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identifier: string; // Matriculation or Staff Number
  roles: UserRoleAssignment[];
  orgUnitName: string;
  status: UserStatusType;
  joinedDate: string;
  lastActive: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  phone?: string;
  enrolledClassesCount?: number;
  taughtClassesCount?: number;
}

@Component({
  imports: [RouterLink, RouterLinkActive, FormsModule],
  selector: 'app-admin-directory',
  styleUrl: './directory.css',
  templateUrl: './directory.html',
})
export default class Directory {
  // Navigation tabs linking to people sub-routes
  readonly peopleNav = [
    { label: 'Directory', path: '/admin/people/directory' },
    { label: 'Roles & Permissions', path: '/admin/people/roles' },
    { label: 'Invitations', path: '/admin/people/invitations' },
  ];

  // Category filter tabs
  readonly activeCategory = signal<'all' | 'learners' | 'faculty' | 'admins'>('all');

  // Search & Filter state
  readonly searchQuery = signal<string>('');
  readonly selectedRoleFilter = signal<string>('all');
  readonly selectedOrgUnitFilter = signal<string>('all');
  readonly selectedStatusFilter = signal<string>('all');

  // Selection state
  readonly selectedIds = signal<Set<string>>(new Set());

  // Drawers & Modals state
  readonly inspectingUser = signal<AdminDirectoryUser | null>(null);
  readonly isAddDrawerOpen = signal<boolean>(false);
  readonly isImportModalOpen = signal<boolean>(false);

  // New user form state (Form spec §12.1)
  readonly newUserForm = signal({
    firstName: '',
    lastName: '',
    email: '',
    identifier: '',
    orgUnit: 'Faculty of Physical & Natural Sciences',
    role: 'Learner' as UserRoleType,
    scope: 'Faculty of Physical & Natural Sciences',
    status: 'Active' as UserStatusType,
  });

  // Mock User Directory dataset
  readonly users = signal<AdminDirectoryUser[]>([
    {
      id: 'usr-1',
      firstName: 'Evelyn',
      lastName: 'Reed',
      email: 'e.reed@learncentric.edu',
      identifier: 'FAC-2022-041',
      roles: [{ role: 'Instructor', scope: 'Dept of Physics' }],
      orgUnitName: 'Faculty of Physical & Natural Sciences',
      status: 'Active',
      joinedDate: 'Sep 12, 2022',
      lastActive: '25m ago',
      initials: 'ER',
      avatarBg: 'bg-emerald-50',
      avatarColor: 'text-emerald-700',
      phone: '+1 (555) 234-8901',
      taughtClassesCount: 3,
    },
    {
      id: 'usr-2',
      firstName: 'Marcus',
      lastName: 'Chen',
      email: 'm.chen@students.learncentric.edu',
      identifier: 'STU-2024-8491',
      roles: [{ role: 'Learner', scope: 'MATH-204-B' }],
      orgUnitName: 'Faculty of Physical & Natural Sciences',
      status: 'Active',
      joinedDate: 'Jan 15, 2024',
      lastActive: '1h ago',
      initials: 'MC',
      avatarBg: 'bg-blue-50',
      avatarColor: 'text-blue-700',
      phone: '+1 (555) 872-1142',
      enrolledClassesCount: 5,
    },
    {
      id: 'usr-3',
      firstName: 'Arthur',
      lastName: 'Vance',
      email: 'a.vance@learncentric.edu',
      identifier: 'FAC-2019-012',
      roles: [
        { role: 'Department Admin', scope: 'Dept of Computer Science' },
        { role: 'Instructor', scope: 'CS-301' },
      ],
      orgUnitName: 'Faculty of Engineering & Computing',
      status: 'Active',
      joinedDate: 'Aug 20, 2019',
      lastActive: '3h ago',
      initials: 'AV',
      avatarBg: 'bg-purple-50',
      avatarColor: 'text-purple-700',
      phone: '+1 (555) 492-3810',
      taughtClassesCount: 4,
    },
    {
      id: 'usr-4',
      firstName: 'Elena',
      lastName: 'Rostova',
      email: 'e.rostova@learncentric.edu',
      identifier: 'ADM-2021-008',
      roles: [{ role: 'Course Coordinator', scope: 'Faculty of Engineering & Computing' }],
      orgUnitName: 'Faculty of Engineering & Computing',
      status: 'Active',
      joinedDate: 'Mar 10, 2021',
      lastActive: '12m ago',
      initials: 'ER',
      avatarBg: 'bg-amber-50',
      avatarColor: 'text-amber-700',
      phone: '+1 (555) 601-9234',
      taughtClassesCount: 1,
    },
    {
      id: 'usr-5',
      firstName: 'Fatima',
      lastName: 'Al-Hassan',
      email: 'f.alhassan@learncentric.edu',
      identifier: 'FAC-2020-093',
      roles: [{ role: 'Academic Admin', scope: 'Institution' }],
      orgUnitName: 'College of Health & Biomedical Sciences',
      status: 'Active',
      joinedDate: 'Oct 01, 2020',
      lastActive: '1d ago',
      initials: 'FA',
      avatarBg: 'bg-rose-50',
      avatarColor: 'text-rose-700',
      phone: '+1 (555) 345-6789',
      taughtClassesCount: 2,
    },
    {
      id: 'usr-6',
      firstName: 'Liam',
      lastName: 'O\'Connor',
      email: 'l.oconnor@students.learncentric.edu',
      identifier: 'STU-2025-1092',
      roles: [{ role: 'Learner', scope: 'PHYS-101-A' }],
      orgUnitName: 'Faculty of Physical & Natural Sciences',
      status: 'Invited',
      joinedDate: 'Feb 02, 2026',
      lastActive: 'Never',
      initials: 'LO',
      avatarBg: 'bg-gray-100',
      avatarColor: 'text-gray-700',
      phone: '+1 (555) 789-0123',
      enrolledClassesCount: 4,
    },
    {
      id: 'usr-7',
      firstName: 'Sarah',
      lastName: 'Jenkins',
      email: 's.jenkins@learncentric.edu',
      identifier: 'ADM-2018-001',
      roles: [{ role: 'Institution Admin', scope: 'Institution' }],
      orgUnitName: 'Academic Registry',
      status: 'Active',
      joinedDate: 'Jun 14, 2018',
      lastActive: 'Just now',
      initials: 'SJ',
      avatarBg: 'bg-indigo-50',
      avatarColor: 'text-indigo-700',
      phone: '+1 (555) 123-4567',
    },
    {
      id: 'usr-8',
      firstName: 'David',
      lastName: 'Kalu',
      email: 'd.kalu@students.learncentric.edu',
      identifier: 'STU-2023-5510',
      roles: [{ role: 'Learner', scope: 'CS-101-A' }],
      orgUnitName: 'Faculty of Engineering & Computing',
      status: 'Suspended',
      joinedDate: 'Sep 05, 2023',
      lastActive: '2w ago',
      initials: 'DK',
      avatarBg: 'bg-red-50',
      avatarColor: 'text-red-700',
      phone: '+1 (555) 901-2345',
      enrolledClassesCount: 3,
    },
    {
      id: 'usr-9',
      firstName: 'Rachel',
      lastName: 'Goldman',
      email: 'r.goldman@learncentric.edu',
      identifier: 'FAC-2023-118',
      roles: [{ role: 'Teaching Assistant', scope: 'PHYS-401' }],
      orgUnitName: 'Faculty of Physical & Natural Sciences',
      status: 'Active',
      joinedDate: 'Sep 01, 2023',
      lastActive: '4h ago',
      initials: 'RG',
      avatarBg: 'bg-cyan-50',
      avatarColor: 'text-cyan-700',
      phone: '+1 (555) 456-7890',
      taughtClassesCount: 2,
    },
  ]);

  // Derived filtered users list
  readonly filteredUsers = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const category = this.activeCategory();
    const roleFilter = this.selectedRoleFilter();
    const unitFilter = this.selectedOrgUnitFilter();
    const statusFilter = this.selectedStatusFilter();

    return this.users().filter((user) => {
      // Category tab filtering
      if (category === 'learners' && !user.roles.some((r) => r.role === 'Learner')) {
        return false;
      }
      if (
        category === 'faculty' &&
        !user.roles.some((r) => r.role === 'Instructor' || r.role === 'Teaching Assistant')
      ) {
        return false;
      }
      if (
        category === 'admins' &&
        !user.roles.some((r) =>
          r.role.includes('Admin') || r.role.includes('Coordinator')
        )
      ) {
        return false;
      }

      // Role filter dropdown
      if (roleFilter !== 'all' && !user.roles.some((r) => r.role === roleFilter)) {
        return false;
      }

      // Org unit filter dropdown
      if (unitFilter !== 'all' && user.orgUnitName !== unitFilter) {
        return false;
      }

      // Status filter dropdown
      if (statusFilter !== 'all' && user.status !== statusFilter) {
        return false;
      }

      // Text search
      if (q) {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const matchesName = fullName.includes(q);
        const matchesEmail = user.email.toLowerCase().includes(q);
        const matchesId = user.identifier.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesId) {
          return false;
        }
      }

      return true;
    });
  });

  // Summary counts
  readonly totalCount = computed(() => this.users().length);
  readonly learnerCount = computed(
    () => this.users().filter((u) => u.roles.some((r) => r.role === 'Learner')).length
  );
  readonly facultyCount = computed(
    () =>
      this.users().filter((u) =>
        u.roles.some((r) => r.role === 'Instructor' || r.role === 'Teaching Assistant')
      ).length
  );
  readonly adminCount = computed(
    () =>
      this.users().filter((u) =>
        u.roles.some((r) => r.role.includes('Admin') || r.role.includes('Coordinator'))
      ).length
  );

  // Selection handlers
  isAllSelected = computed(() => {
    const list = this.filteredUsers();
    return list.length > 0 && list.every((u) => this.selectedIds().has(u.id));
  });

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.selectedIds.set(new Set());
    } else {
      const next = new Set<string>();
      this.filteredUsers().forEach((u) => next.add(u.id));
      this.selectedIds.set(next);
    }
  }

  toggleSelect(id: string): void {
    const next = new Set(this.selectedIds());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.selectedIds.set(next);
  }

  // Open inspector
  openInspector(user: AdminDirectoryUser): void {
    this.inspectingUser.set(user);
  }

  closeInspector(): void {
    this.inspectingUser.set(null);
  }

  // User creation form
  openAddDrawer(): void {
    this.isAddDrawerOpen.set(true);
  }

  closeAddDrawer(): void {
    this.isAddDrawerOpen.set(false);
  }

  submitAddUser(): void {
    const form = this.newUserForm();
    if (!form.firstName || !form.lastName || !form.email) return;

    const initials = `${form.firstName[0] || ''}${form.lastName[0] || ''}`.toUpperCase();
    const newUser: AdminDirectoryUser = {
      id: `usr-${Date.now()}`,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      identifier: form.identifier || `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      roles: [{ role: form.role, scope: form.scope }],
      orgUnitName: form.orgUnit,
      status: form.status,
      joinedDate: 'Today',
      lastActive: 'Just now',
      initials,
      avatarBg: 'bg-primary/10',
      avatarColor: 'text-primary',
    };

    this.users.update((prev) => [newUser, ...prev]);
    this.closeAddDrawer();

    // Reset form
    this.newUserForm.set({
      firstName: '',
      lastName: '',
      email: '',
      identifier: '',
      orgUnit: 'Faculty of Physical & Natural Sciences',
      role: 'Learner',
      scope: 'Faculty of Physical & Natural Sciences',
      status: 'Active',
    });
  }

  // Import modal
  openImportModal(): void {
    this.isImportModalOpen.set(true);
  }

  closeImportModal(): void {
    this.isImportModalOpen.set(false);
  }

  // Status toggle in inspector
  toggleUserStatus(user: AdminDirectoryUser): void {
    const nextStatus: UserStatusType = user.status === 'Active' ? 'Suspended' : 'Active';
    this.users.update((list) =>
      list.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    );
    if (this.inspectingUser()?.id === user.id) {
      this.inspectingUser.update((current) => (current ? { ...current, status: nextStatus } : null));
    }
  }

  // Bulk actions
  clearSelection(): void {
    this.selectedIds.set(new Set());
  }

  bulkDeactivate(): void {
    const ids = this.selectedIds();
    this.users.update((list) =>
      list.map((u) => (ids.has(u.id) ? { ...u, status: 'Suspended' } : u))
    );
    this.clearSelection();
  }
}
