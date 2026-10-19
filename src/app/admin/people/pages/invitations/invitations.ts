import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface PendingInvitation {
  id: string;
  email: string;
  role: string;
  scope: string;
  orgUnit: string;
  invitedBy: string;
  sentDate: string;
  expiresIn: string;
  status: 'Pending' | 'Expired' | 'Revoked';
}

@Component({
  imports: [RouterLink, RouterLinkActive, FormsModule],
  selector: 'app-admin-invitations',
  styleUrl: './invitations.css',
  templateUrl: './invitations.html',
})
export default class Invitations {
  readonly peopleNav = [
    { label: 'Directory', path: '/admin/people/directory' },
    { label: 'Roles & Permissions', path: '/admin/people/roles' },
    { label: 'Invitations', path: '/admin/people/invitations' },
  ];

  readonly searchQuery = signal<string>('');
  readonly selectedStatusFilter = signal<string>('all');
  readonly selectedRoleFilter = signal<string>('all');

  readonly isSendDrawerOpen = signal<boolean>(false);
  readonly copiedId = signal<string | null>(null);

  // New invitation form
  readonly newInvite = signal({
    email: '',
    role: 'Instructor',
    scope: 'Faculty of Physical & Natural Sciences',
    orgUnit: 'Faculty of Physical & Natural Sciences',
    expiryDays: '14',
  });

  // Invitations ledger
  readonly invitations = signal<PendingInvitation[]>([
    {
      id: 'inv-1',
      email: 'p.novak@external.edu',
      role: 'Instructor',
      scope: 'MATH-301-A',
      orgUnit: 'Faculty of Physical & Natural Sciences',
      invitedBy: 'Dr. Arthur Vance',
      sentDate: 'Oct 14, 2026',
      expiresIn: '5 days left',
      status: 'Pending',
    },
    {
      id: 'inv-2',
      email: 'claire.zheng@students.org',
      role: 'Learner',
      scope: 'CS-101-Cohort 2',
      orgUnit: 'Faculty of Engineering & Computing',
      invitedBy: 'Academic Registry',
      sentDate: 'Oct 16, 2026',
      expiresIn: '7 days left',
      status: 'Pending',
    },
    {
      id: 'inv-3',
      email: 'h.ramirez@biomed.ac.uk',
      role: 'Teaching Assistant',
      scope: 'BIOL-201',
      orgUnit: 'College of Health & Biomedical Sciences',
      invitedBy: 'Dr. Fatima Al-Hassan',
      sentDate: 'Oct 01, 2026',
      expiresIn: 'Expired on Oct 15',
      status: 'Expired',
    },
    {
      id: 'inv-4',
      email: 'tarik.mansour@institutedata.net',
      role: 'Course Coordinator',
      scope: 'Dept of Computer Science',
      orgUnit: 'Faculty of Engineering & Computing',
      invitedBy: 'Sarah Jenkins',
      sentDate: 'Oct 12, 2026',
      expiresIn: '3 days left',
      status: 'Pending',
    },
    {
      id: 'inv-5',
      email: 'a.baker@alumni.edu',
      role: 'Learner',
      scope: 'PHYS-401',
      orgUnit: 'Faculty of Physical & Natural Sciences',
      invitedBy: 'Dr. Evelyn Reed',
      sentDate: 'Sep 20, 2026',
      expiresIn: 'Revoked by Admin',
      status: 'Revoked',
    },
  ]);

  readonly filteredInvitations = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const status = this.selectedStatusFilter();
    const role = this.selectedRoleFilter();

    return this.invitations().filter((inv) => {
      if (status !== 'all' && inv.status !== status) return false;
      if (role !== 'all' && inv.role !== role) return false;
      if (q) {
        const matchesEmail = inv.email.toLowerCase().includes(q);
        const matchesInviter = inv.invitedBy.toLowerCase().includes(q);
        const matchesUnit = inv.orgUnit.toLowerCase().includes(q);
        if (!matchesEmail && !matchesInviter && !matchesUnit) return false;
      }
      return true;
    });
  });

  readonly pendingCount = computed(
    () => this.invitations().filter((i) => i.status === 'Pending').length
  );
  readonly expiredCount = computed(
    () => this.invitations().filter((i) => i.status === 'Expired').length
  );

  openSendDrawer(): void {
    this.isSendDrawerOpen.set(true);
  }

  closeSendDrawer(): void {
    this.isSendDrawerOpen.set(false);
  }

  submitSendInvite(): void {
    const form = this.newInvite();
    if (!form.email) return;

    const newEntry: PendingInvitation = {
      id: `inv-${Date.now()}`,
      email: form.email,
      role: form.role,
      scope: form.scope,
      orgUnit: form.orgUnit,
      invitedBy: 'Administrator',
      sentDate: 'Today',
      expiresIn: `${form.expiryDays} days left`,
      status: 'Pending',
    };

    this.invitations.update((list) => [newEntry, ...list]);
    this.closeSendDrawer();
    this.newInvite.set({
      email: '',
      role: 'Instructor',
      scope: 'Faculty of Physical & Natural Sciences',
      orgUnit: 'Faculty of Physical & Natural Sciences',
      expiryDays: '14',
    });
  }

  resendInvite(id: string): void {
    this.invitations.update((list) =>
      list.map((i) => (i.id === id ? { ...i, status: 'Pending', sentDate: 'Today', expiresIn: '14 days left' } : i))
    );
  }

  revokeInvite(id: string): void {
    this.invitations.update((list) =>
      list.map((i) => (i.id === id ? { ...i, status: 'Revoked', expiresIn: 'Revoked' } : i))
    );
  }

  copyLink(id: string): void {
    this.copiedId.set(id);
    setTimeout(() => this.copiedId.set(null), 2000);
  }
}
