# LearnCentric — Admin Console Master Specification & Implementation Plan

> **Status:** Active Planning & Implementation · Target Root: `/admin`  
> **Layout Shell:** Reusing `src/app/layout/` across Instructor Studio (`/app`), Learner Portal (`/learn`), and Admin Console (`/admin`).  
> **Framework:** Angular 22 (Signals, Standalone, Modern Control Flow, OnPush default) + Tailwind CSS v4 (Flat, shadowless, ringless) + Zard UI  
> **Directives:** UI-First Design (All state in component signals with realistic mock datasets prior to backend integration).  
> **Reference Specs:** `learncentric-frontend-spec-v1.md`, `examalpha-studio-forms-spec-v1.md`, and `examalpha-studio-ia-for-ui-designers.md`.

---

## 0. Project Architecture & Traversal Synchronization

### 0.1 Cross-Workspace Synchronization Matrix
By analyzing all route configurations, layout shells, components, and state patterns across the **Instructor Studio** (`/app`) and **Learner Portal** (`/learn`), the **Admin Console** (`/admin`) serves as the institutional command and governance plane that establishes datasets consumed by both:

| Functional Area | Admin Console (`/admin`) | Instructor Studio (`/app`) | Learner Portal (`/learn`) | Synchronization Data Flow |
| :--- | :--- | :--- | :--- | :--- |
| **Identity & Users** | `/admin/people`<br>• Master Directory<br>• RBAC Capability Matrix<br>• Bulk CSV/Excel Importer | `/app/students`<br>• Student Directory<br>• Student Groups<br>• Student Profile Inspector | `/learn/settings`<br>• Personal Profile<br>• Academic UID / Advisor<br>• Security & 2FA | Admin provisions identity, institutional email, matric/staff ID, roles, and org unit tags. Instructors view student rosters within their classes. Learners inspect their academic degree affiliation. |
| **Classes & Cohorts** | `/admin/enrolments`<br>• Master Class Roster<br>• Join Code Generator/Control<br>• Bulk Enrolment Engine | `/app/teachings/classes`<br>• Class Cohorts Roster<br>• Timetable & Attendance<br>• Live Stage Host | `/learn/classroom/classes`<br>• Enrolled Cohorts Catalog<br>• "+ Join Class" Modal<br>• Cohort Workspace | Admin creates class sections, sets capacity, assigns instructors & TAs, and sets join code rules. Learners enter join codes or receive bulk registration. Instructors teach cohorts. |
| **Curricula & Courses** | `/admin/structure`<br>• Org Tree (Faculties/Depts)<br>• Degree Programmes<br>• Curriculum Standard Mappings | `/app/teachings/courses`<br>• Course Studio & Syllabus<br>• Materials (12 types)<br>• Assignments & Quizzes | `/learn/courses`<br>• My Enrolled Courses<br>• Syllabus Tree Reader<br>• Assignment Submissions | Admin defines degree requirements and accredits courses. Instructors author syllabus and assignments. Learners consume modules and submit work. |
| **Sessions & Calendar** | `/admin/academics`<br>• Academic Years & Semesters<br>• Teaching Weeks & Exams<br>• Institutional Holidays | `/app/classroom/calendar`<br>• Faculty Timetable<br>• Class Live Schedule<br>• Office Hours Queue | `/learn/classroom/calendar`<br>• Student Class Timetable<br>• Exam & Deadline Agenda<br>• Live Session Links | Admin defines session start/end dates, exam windows, and holidays. Both Instructor and Learner calendars reflect institutional term dates and holiday exemptions. |
| **Assessment & Broadsheet**| `/admin/reports`<br>• Official Multi-Course Broadsheet<br>• Weighted GPA/CGPA Ledger<br>• Accreditation Outcome Matrix | `/app/assessment`<br>• Exams & Quizzes<br>• Rubrics & Question Bank<br>• Grading Workspace | `/learn/insights`<br>• Course Broadsheet Ledger<br>• Result History & Percentile<br>• Mastery Matrix | Instructors grade assignments and assessments against rubrics. Grades publish to learner gradebooks and aggregate into the Admin Official Broadsheet for academic standing. |
| **Governance & Policies** | `/admin/settings/policies`<br>• Grading Scales & Split (CA/Exam)<br>• AI Policy & Monthly Quotas<br>• Attendance Deficit Limits | `/app/settings/teaching`<br>• Default Passing Score<br>• Attendance Threshold (80%)<br>• AI Integrity Sensitivity | `/learn/settings/preferences`<br>• Socratic AI Pedagogy Mode<br>• Notification Channels<br>• Study Pace Preferences | Admin establishes institutional baselines (e.g. 40/60 CA/Exam split, 80% attendance rule). Instructor settings operate within admin boundaries. Learners are evaluated against these policies. |
| **Audit & Security** | `/admin/audit/log`<br>• Tamper-Evident Admin Ledger<br>• Scope & Impact Analysis<br>• Security Incident Records | `/app/settings/security`<br>• Faculty SAML SSO<br>• Master Proctor Keys<br>• Active Workstation Logins | `/learn/settings/security`<br>• Password & 2FA<br>• Active Learner Devices<br>• Session Revocation | Administrative actions (role escalation, grade override, broadsheet export) produce immutable audit records for institutional accreditation and compliance. |

---

### 0.2 Shell Routing, Navigation & Header Synchronization

1. **Top-Level Routing in `src/app/app.routes.ts`**:
   The Admin Console mounts directly to the shared layout shell, maintaining complete parity with `/app` and `/learn`:
   ```typescript
   {
     path: 'admin',
     loadComponent: () => import('./layout/layout/layout'),
     children: [
       { path: '', loadChildren: () => import('./admin/admin.route') }
     ]
   }
   ```

2. **Sidebar Navigation in `src/app/layout/navigation/navigation.ts`**:
   - Detect workspace context dynamically:
     ```typescript
     readonly isAdmin = signal<boolean>(typeof window !== 'undefined' ? window.location.pathname.startsWith('/admin') : false);
     readonly isLearner = signal<boolean>(typeof window !== 'undefined' ? window.location.pathname.startsWith('/learn') : false);
     ```
   - Computed `menus` signal evaluates context:
     ```typescript
     readonly menus = computed<Menu[]>(() => {
       if (this.isAdmin()) return this.adminMenus;
       if (this.isLearner()) return this.learnerMenus;
       return this.instructorMenus;
     });
     ```
   - Accordion expansion auto-expands active parent routes (`expandActiveMenu()`) on route transitions.

3. **Header Top Bar in `src/app/layout/header/`**:
   - **Search Input Placeholder**:
     - Admin: `"Search users, org units, classes, logs..."`
     - Instructor: `"Search content, classes, students..."`
     - Learner: `"Search courses, practice, tutor..."`
   - **Top Bar Quick Actions**:
     - Admin: Dedicated action buttons (`+ Add User`, `+ New Class`, `Academic Calendar`).
     - Learner: `+ Join Class` and `Ask AI Tutor`.
   - **Notifications Popover**:
     - Admin Notifications: Course publication approvals, Grade appeals, Unstaffed class alerts, Enrolment capacity bottlenecks.
     - Natural category indicators without pill overload.
   - **User Profile Dropdown**:
     - Direct links to personal account settings and sign out.
     - Strict rule: No workspace switchers. Admin consoles do not switch to student portals.

---

## 1. Core Design, UI Rules & Architectural Guardrails

1. **Strictly Flat UI (Zero Shadows, Zero Rings)**:
   - Absolutely **DO NOT** use drop shadows (`shadow-sm`, `shadow-md`, `shadow-lg`, etc.).
   - Absolutely **DO NOT** use ring borders (`ring-1`, `ring-2`, `ring-*`).
   - Depth, focus, and hierarchy are achieved exclusively through flat 1px borders (`border border-gray-100`, `border-gray-200`), subtle backgrounds (`bg-white`, `bg-gray-50`, `bg-neutral-100`, `bg-primary/10`), and `rounded-2xl` corners.
2. **Table Consistency Standard**:
   - Every data table in the Admin Console must strictly use the double-border wrapper pattern from [attendance.html](file:///c:/Users/DELL/Desktop/MULTILENT/JOB-OKOSUN-MULTILENT/APPS/learncentric/src/app/learner/classroom/pages/attendance/attendance.html):
     ```html
     <div class="bg-white border border-gray-100 rounded-2xl p-1 flex flex-col">
       <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col">
         <div class="overflow-x-auto no-scrollbar">
           <table class="w-full text-left border-collapse">
             <thead>
               <tr class="border-b border-gray-100 bg-gray-100">
                 <th class="p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">...</th>
               </tr>
             </thead>
             <tbody class="divide-y divide-gray-50">
               <tr class="hover:bg-gray-50/50 transition-colors group">...</tr>
             </tbody>
           </table>
         </div>
       </div>
     </div>
     ```
3. **Dashboard & Metric Cards Consistency Standard**:
   - Metric cards must strictly follow the compact home dashboard pattern: `class="rounded-2xl bg-white p-4"`.
   - Card headers must feature a `rounded-full size-10 flex items-center justify-center shrink-0` icon circle with label and subtext stacked alongside it, followed directly by a `font-bold text-3xl text-gray-900` value.
   - **No bloated padding (`p-5`), no outer borders, no trailing paragraphs, and NO trend pill capsules.**
4. **Segment-Agnostic Terminology (Tenant Mapping)**:
   - Never hardcode institutional assumptions (e.g., "Faculty", "Department", "Semester", "Lecturer").
   - Support dynamic tenant vocabularies via configurable taxonomy:
     - `unit.level1`: *Faculty* (University) / *School* (District) / *Division* (Enterprise)
     - `unit.level2`: *Department* (University) / *Grade* (K-12) / *Team* (Enterprise)
     - `session`: *Semester* (University) / *Term* (K-12) / *Cohort Intake* (Training)
     - `course`: *Course* / *Subject* / *Training Module*
     - `class`: *Class* / *Cohort* / *Section*
5. **Route-Linked Tab State**:
   - All tab navigation menus must be linked to router routes (using `routerLink`, `routerLinkActive`, `routerLinkActiveOptions: { exact: true }`, and `<router-outlet>`). State must never be lost on browser refresh or direct navigation.
6. **Scrollable Content**:
   - Main content areas wrapping `<router-outlet>` must use `overflow-auto no-scrollbar` to maintain a clean UI without default scrollbars.
7. **No Pill / Badge Clutter**:
   - Do NOT decorate every metadata item, trend indicator, or category in a colored pill/capsule badge.
   - Use clean typography, subtle muted secondary text (`text-xs text-gray-500`), and minimalist status dots (`● Active`).
8. **Default System Font Only**:
   - Absolutely NEVER use non-default fonts (no `font-mono`, no `font-serif`, no inline `<code>` tags for UI labels, codes, or timestamps). Everything uses the clean, default application font.
9. **Plain English, Zero Developer Jargon**:
   - UI copy and activity entries must always be natural, descriptive human English (e.g. "Assigned Course Coordinator role to Elena Rostova", not `role.elevated` or `blastRadius`).
10. **Strict Grounding in Spec Entities (Zero Made-Up Concepts)**:
    - Strictly adhere to the domain entities defined in the specifications (`learncentric-frontend-spec-v1.md`, `examalpha-studio-forms-spec-v1.md`, and `examalpha-studio-ia-for-ui-designers.md`):
      - Platform entities: **Users/Learners, Instructors/Staff, Org Units, Academic Sessions/Terms, Degree Programmes, Courses, Classes/Cohorts, Enrolments, Broadsheets, Policies, and Audit Logs**.
      - Never fabricate SaaS metrics like "Seat Utilization", "License limits", or exaggerated enterprise jargon like "Mission Control" or "Attention Center".
11. **No "Live Session" Confusion in Admin**:
    - An academic session is a semester/term calendar period (§2). It is NOT a live classroom broadcast (§5.24). Never place live lecture streaming indicators on admin pages.

---

## 2. Admin Console Master Hierarchy & Directory Map

```
src/app/admin/
├── PLAN.md                                     # Master Specification & Living Roadmap (This Document)
├── admin.route.ts                              # Top-level /admin routes with redirection to /admin/dashboard
├── pages/
│   └── dashboard/                              # Overview (Executive Institutional Dashboard)
│       ├── dashboard.ts                        # 4 core metrics (Learners, Instructors, Classes, Courses), current term timeline, triage needs-attention queue, recent activity, and organizational units summary
│       ├── dashboard.html
│       └── dashboard.css
├── people/                                     # User, Staff & Role Management (/admin/people)
│   ├── people.route.ts                         # Sub-routes: directory, roles, invitations
│   ├── components/
│   │   ├── user-drawer/                        # Slide-over User Profile & Capability Inspector
│   │   ├── invite-modal/                       # Single user invite with role & org unit assignment
│   │   └── bulk-import-modal/                  # Multi-step CSV/Excel user import wizard with dry-run
│   └── pages/
│       ├── directory/                          # Master user roster with multi-select bulk actions
│       ├── roles/                              # Capability & permission matrix editor
│       └── invitations/                        # Pending invitations, resend tokens & expiration
├── structure/                                  # Institutional Hierarchy & Org Units (/admin/structure)
│   ├── structure.route.ts                      # Sub-routes: units, campuses
│   ├── components/
│   │   └── unit-drawer/                        # Org unit creation, parent assignment & dean/head picker
│   └── pages/
│       ├── units/                              # Interactive multi-level org tree & column view
│       └── campuses/                           # Physical and virtual campus sites
├── academics/                                  # Academic Calendar, Sessions & Programmes (/admin/academics)
│   ├── academics.route.ts                      # Sub-routes: calendar, sessions, programmes
│   ├── components/
│   │   ├── session-drawer/                     # Academic session & term creator with date pickers
│   │   └── programme-drawer/                   # Degree/programme blueprint editor with outcome mappings
│   └── pages/
│       ├── calendar/                           # Institutional master calendar, holidays & exam periods
│       ├── sessions/                           # Academic sessions (Years & Semesters/Terms) ledger
│       └── programmes/                         # Degree / Diploma / Curriculum programme catalog
├── enrolments/                                 # Class Cohorts & Enrolment Operations (/admin/enrolments)
│   ├── enrolments.route.ts                     # Sub-routes: classes, batches
│   ├── components/
│   │   ├── class-drawer/                       # Class cohort creator with course binding & teacher assignment
│   │   └── bulk-enrolment-drawer/              # Multi-criteria bulk enrolment engine with dry-run preview
│   └── pages/
│       ├── classes/                            # Master class & cohort directory with join code controls
│       └── batches/                            # Mass enrolment ledger, carryovers & registration batches
├── reports/                                    # Institutional Analytics & Broadsheets (/admin/reports)
│   ├── reports.route.ts                        # Sub-routes: overview, broadsheet, compliance
│   ├── components/
│   │   └── export-modal/                       # Format configuration for Official Broadsheets & Transcripts
│   └── pages/
│       ├── overview/                           # Institutional completion, retention & GPA curves
│       ├── broadsheet/                         # Official multi-course academic broadsheet & grade matrix
│       └── compliance/                         # Accreditation outcome mappings & attendance compliance
├── audit/                                      # Security & Compliance Audit Trail (/admin/audit)
│   ├── audit.route.ts                          # Audit log routes
│   └── pages/
│       └── log/                                # Immutable chronological administrative audit ledger
└── settings/                                   # Institutional Configuration & Policies (/admin/settings)
    ├── settings.route.ts                       # Sub-routes: general, policies, integrations
    ├── components/
    │   └── integration-drawer/                 # SIS, LTI 1.3, Google Workspace & SSO credential setup
    └── pages/
        ├── shell/                              # Vertical tab shell for Settings (mirroring features/settings)
        ├── general/                            # Tenant identity, branding, logo & terminology mappings
        ├── policies/                           # Institutional grading schemes, attendance rules & AI policies
        └── integrations/                       # External systems connectors (Canvas, Blackboard, SIS, IdP)
```

---

## 3. Implementation Roadmap & Milestones

### Phase 1: Architecture, Routing & Layout Foundation — [COMPLETED]
- [x] Route configuration in [app.routes.ts](file:///c:/Users/DELL/Desktop/MULTILENT/JOB-OKOSUN-MULTILENT/APPS/learncentric/src/app/app.routes.ts) mounting `/admin` to shared layout shell `src/app/layout/layout/layout.ts`.
- [x] Sub-route module [admin.route.ts](file:///c:/Users/DELL/Desktop/MULTILENT/JOB-OKOSUN-MULTILENT/APPS/learncentric/src/app/admin/admin.route.ts) with eager redirect to `dashboard`.
- [x] Sidebar navigation integration in [navigation.ts](file:///c:/Users/DELL/Desktop/MULTILENT/JOB-OKOSUN-MULTILENT/APPS/learncentric/src/app/layout/navigation/navigation.ts):
  - Dynamic `isAdmin` signal checking `url.startsWith('/admin')`.
  - Comprehensive `adminMenus` tree covering all 8 administration sections.
  - Active menu state preservation and expanding accordion support.
- [x] Header top bar updates in [header.ts](file:///c:/Users/DELL/Desktop/MULTILENT/JOB-OKOSUN-MULTILENT/APPS/learncentric/src/app/layout/header/header.ts):
  - Admin search placeholder (`"Search users, org units, classes, logs..."`).
  - Admin notifications signal with natural categories (`accreditation`, `appeal`, `capacity`, `staffing`).
  - Quick action buttons (`+ Add User`, `+ New Class`, `Academic Calendar`).
  - User profile menu: direct link to account settings and sign out (no workspace switcher).

### Phase 2: Executive Admin Overview (`/admin/dashboard`) — [COMPLETED]
- [x] Header: Clean **"Overview"** with active academic term subtitle (`2025/2026 Academic Year • Second Semester`).
- [x] 4 compact metric cards (`p-4 bg-white rounded-2xl` matching learner `home.html`):
  - *Active Learners* (4,820 enrolled across 128 cohorts).
  - *Instructional Staff* (184 faculty, instructors & TAs).
  - *Active Classes* (96 live sections).
  - *Courses* (42 catalog courses).
  - Zero trend pill capsules, zero outer borders.
- [x] **Academic Session Progress**:
  - Current term phase (Week 8 of 16), start/end dates, clean progress bar.
- [x] **Needs attention**:
  - Administrative triage items (Course publish approval requests, Unstaffed class cohort alerts, Enrolment capacity bottlenecks, Grade appeals).
  - Subtle bullet indicators, natural text metadata, no pill badges.
- [x] **Recent activity**:
  - Chronological audit snippet with plain English descriptions (no developer codes, no `font-mono`).
- [x] **Organizational units**:
  - Double-border table container strictly matching `attendance.html`.
  - Unit name, code, type, head of unit, active courses, enrolled learners, and simple status dot (`● Active`).

### Phase 3: People & Access Control (`/admin/people`) — [COMPLETED]
- [x] Sub-routes: `/admin/people/directory`, `/admin/people/roles`, `/admin/people/invitations`.
- [x] **User Directory (`pages/directory/`)**:
  - Double-border table listing Name, Email, Unique Identifier (Student/Staff ID), Org Unit, Assigned Roles, Status (`Active`, `Invited`, `Suspended`).
  - Filter bar: Search query, Role filter, Org Unit filter, Status filter.
  - Multi-select bulk action bar: Bulk role assignment, export CSV, deactivate accounts, resend invite.
- [x] **User Profile Inspector Drawer (`components/user-drawer/`)**:
  - Slide-over inspector displaying personal metadata, enrolled or taught classes, activity timestamps, and capability overrides.
- [x] **Role & Capability Matrix (`pages/roles/`)**:
  - Tree-based capability editor with search (strictly grounded in §12.7 of forms spec):
    - Content Authoring (`course.create`, `course.publish`, `course.archive`).
    - Grading & Assessment (`grade.submit`, `grade.override`, `assessment.moderate`).
    - Administration & Policy (`user.manage`, `policy.override`, `audit.view`).
  - Live preview panel showing which workspace destinations the selected role can access.
- [x] **Bulk Import Wizard (`components/bulk-import-modal/`)**:
  - Step 1: Drag-and-drop CSV/Excel uploader with downloadable template.
  - Step 2: Column mapping interface (First Name, Last Name, Email, Identifier, Role, Org Unit).
  - Step 3: Dry-run validation preview highlighting errors, duplicates, and valid records before commit.
- [x] **Invitations Ledger (`pages/invitations/`)**:
  - Ledger of pending onboarding invitations with resend tokens, copy link, and expiration tracking.

### Phase 4: Institutional Structure & Org Units (`/admin/structure`)
- [ ] Sub-routes: `/admin/structure/units`, `/admin/structure/campuses`.
- [ ] **Org Units Visual Tree (`pages/units/`)**:
  - Segment-adaptive tree/column explorer (Campus → Faculty/School → Department/Grade → Programme).
  - Visual depth representation with active student, course, and staff counts per node.
  - Add / Edit Org Unit Drawer: Name, Unit Code, Type, Parent Unit, Designated Head/Dean.
- [ ] **Campus Sites (`pages/campuses/`)**:
  - Multi-campus configuration (Main Campus, Medical Campus, Online Virtual Campus).

### Phase 5: Academics & Calendar (`/admin/academics`)
- [ ] Sub-routes: `/admin/academics/calendar`, `/admin/academics/sessions`, `/admin/academics/programmes`.
- [ ] **Academic Sessions Ledger (`pages/sessions/`)**:
  - Academic Year definition (e.g., *2026/2027 Academic Year*).
  - Terms/Semesters table with Start Date, End Date, Enrolment Window, Exam Period, Teaching Weeks, and Active Session Toggle.
  - Session Creator Drawer with date range overlap validation.
- [ ] **Institutional Master Calendar (`pages/calendar/`)**:
  - Master schedule aggregating terms, exam windows, holidays, and campus events.
  - Holiday repeater input excluding dates from class attendance expectations.
- [ ] **Programmes Catalog (`pages/programmes/`)**:
  - Degree & curriculum blueprints (e.g., *B.Sc. Computer Science*, *High School Diploma*).
  - Programme outcomes matrix mapped to curriculum standards for external accreditation.
  - Required vs Elective course allocations per semester level.

### Phase 6: Classes & Enrolments (`/admin/enrolments`)
- [ ] Sub-routes: `/admin/enrolments/classes`, `/admin/enrolments/batches`.
- [ ] **Master Classes & Cohorts Ledger (`pages/classes/`)**:
  - Table showing Class Code, Course Title, Cohort, Academic Term, Lead Instructor, Capacity / Enrolled Count, Join Code, Status.
  - Join Code controls: View large code for projection, regenerate code, set expiration date, toggle approval required.
  - Create Class Drawer: Course binding, section label, instructor & TA assignment, timetable schedule.
- [ ] **Bulk Enrolment Engine (`pages/batches/`)**:
  - Bulk registration launcher: Select source (CSV upload, Programme + Level filter, or Cohort carryover).
  - Target classes multi-picker.
  - Enrolment state assignment (`registered`, `added_late`, `auditing`, `carryover`).
  - Dry-run validation preview before database commit.

### Phase 7: Institutional Reports & Broadsheets (`/admin/reports`)
- [ ] Sub-routes: `/admin/reports/overview`, `/admin/reports/broadsheet`, `/admin/reports/compliance`.
- [ ] **Institutional Overview (`pages/overview/`)**:
  - Cross-institutional completion rate curves, student retention analytics, and grade distribution histograms.
- [ ] **Official Academic Broadsheet & Grade Ledger (`pages/broadsheet/`)**:
  - Multi-course grade matrix displaying Student Matriculation/ID, Student Name, Itemized Course Grades/Units, Total Credits Registered, Credits Earned, Weighted GPA / CGPA, and Academic Standing.
  - Filter bar: Academic Session, Programme, Cohort/Level, Department.
  - Export modal: Official PDF Broadsheet generation, CSV export, and SIS-compatible data extract.
- [ ] **Accreditation & Compliance Matrix (`pages/compliance/`)**:
  - Curriculum outcome mastery coverage across departments.
  - Attendance compliance audits (identifying students below institutional threshold, e.g., <75%).

### Phase 8: Audit Log, Settings & Policies (`/admin/settings`, `/admin/audit`)
- [ ] **Tamper-Evident Audit Log (`/admin/audit/log`)**:
  - Chronological immutable record of all administrative actions: Timestamp, Actor, Action Category, Target Entity, IP Address, and Action Details.
  - Filter by date range, action type, and administrative user.
- [ ] **Vertical Tab Shell (`/admin/settings`)**:
  - Mirroring `src/app/features/settings/pages/shell/shell.html` with fixed left navigation and independent right scroll container (`overflow-y-auto no-scrollbar`).
- [ ] **Institutional Policies (`/admin/settings/policies`)**:
  - Assessment Policy: Default integrity levels, max attempts, late deduction rules.
  - Grading Policy: Institutional grading scales (Percentage, GPA 4.0/5.0, Rubric 1.0–4.0), CA/Exam weighting split (e.g., 30/70, 40/60), moderation requirement.
  - AI Policy: Institution-wide AI toggle, AI tutor age-band rules, monthly token budget per seat, conversation retention days.
  - Communication Policy: Permitted channels, quiet hours, broadcast announcement permissions.
- [ ] **General Settings & Branding (`/admin/settings/general`)**:
  - Institution Name, Logo uploader, Favicon, Primary Brand Color picker.
  - Terminology Map editor (customizing vocabulary for `unit.level1`, `unit.level2`, `session`, `course`, `class`).
- [ ] **Integrations Hub (`/admin/settings/integrations`)**:
  - Connectors for LTI 1.3, SIS Sync, Google Classroom import wizard, and SAML/OAuth2 Identity Providers.

---

## 4. Master Data Models & Schemas

### 4.1 User & Identity Schema
```typescript
export type UserRole = 'org_admin' | 'academic_admin' | 'dept_admin' | 'course_coordinator' | 'instructor' | 'ta' | 'learner' | 'guardian';
export type UserStatus = 'active' | 'invited' | 'suspended' | 'deactivated';

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identifier: string; // Matriculation or Staff Number
  avatarUrl?: string;
  orgUnitId: string;
  orgUnitName: string;
  roles: { role: UserRole; scope: 'institution' | 'org_unit' | 'course' | 'class'; scopeId?: string }[];
  status: UserStatus;
  lastLogin?: string;
  createdAt: string;
}
```

### 4.2 Organizational Unit Schema
```typescript
export interface OrgUnit {
  id: string;
  name: string;
  code: string;
  type: string; // e.g., 'Faculty', 'Department', 'Grade', 'Division'
  parentId: string | null;
  parentName?: string;
  headName?: string;
  headEmail?: string;
  activeCoursesCount: number;
  totalStudentsCount: number;
  facultyCount: number;
  children?: OrgUnit[];
}
```

### 4.3 Academic Session & Term Schema
```typescript
export interface AcademicSession {
  id: string;
  name: string; // e.g., '2026/2027 Academic Year'
  startsOn: string;
  endsOn: string;
  enrolmentOpens: string;
  enrolmentCloses: string;
  teachingWeeks: number;
  examPeriodStart: string;
  examPeriodEnd: string;
  isCurrent: boolean;
  terms: { id: string; name: string; startsOn: string; endsOn: string; isCurrent: boolean }[];
  holidays: { name: string; startDate: string; endDate: string }[];
}
```

### 4.4 Master Class & Enrolment Schema
```typescript
export type EnrolmentState = 'registered' | 'added_late' | 'withdrawn' | 'auditing' | 'carryover' | 'completed';

export interface AdminClassCohort {
  id: string;
  code: string; // e.g., 'MATH-204-A'
  courseId: string;
  courseCode: string;
  courseTitle: string;
  sessionId: string;
  sessionName: string;
  section: string;
  leadInstructor: { id: string; name: string; email: string };
  taCount: number;
  enrolledCount: number;
  capacity: number;
  joinCode: string;
  joinCodeEnabled: boolean;
  joinCodeExpires?: string;
  status: 'active' | 'upcoming' | 'completed' | 'archived';
}
```

### 4.5 Official Broadsheet Record Schema
```typescript
export interface BroadsheetStudentEntry {
  studentId: string;
  matricNumber: string;
  studentName: string;
  courseScores: {
    courseCode: string;
    courseCredits: number;
    caScore: number;
    examScore: number;
    totalScore: number;
    letterGrade: string;
    gradePoints: number;
  }[];
  totalCreditsRegistered: number;
  totalCreditsEarned: number;
  totalWeightedPoints: number;
  gpa: number;
  cgpa: number;
  standing: 'First Class' | 'Second Class Upper' | 'Second Class Lower' | 'Pass' | 'Probation';
}
```

### 4.6 Audit Trail Log Entry
```typescript
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: { id: string; name: string; email: string; role: string };
  action: string; // Plain English description: e.g. 'Assigned Course Coordinator role to Elena Rostova'
  category: 'security' | 'academic' | 'enrolment' | 'policy' | 'system';
  targetEntity: { type: string; id: string; name: string };
  ipAddress: string;
  impactScope: 'institution' | 'org_unit' | 'course' | 'class';
}
```

---

## 5. Verification, Accessibility & Quality Criteria

1. **Zero Shadow & Ring Inspection**:
   - Automated grep verification across `src/app/admin/` to confirm 0 instances of `shadow-*` and 0 instances of `ring-*`.
2. **Double-Border Container Strictness**:
   - All tables must follow the double-border wrapper standard with `bg-gray-100` headers and clean hover states.
3. **No Pill Clutter & Default Typography**:
   - Zero pill capsules for general metadata or metric trends.
   - Zero `font-mono`, `font-serif`, or inline `<code>` tags for UI elements.
4. **WCAG 2.2 AA Minimums & AXE Compliance**:
   - Proper `aria-label` on all icon-only buttons (copy code, dismiss, pagination).
   - High color contrast for text and status indicators.
   - Visible focus states on interactive inputs and buttons.
5. **Responsive Integrity**:
   - Desktop and tablet optimized interfaces for dense institutional data. Clean horizontal overflow handling with `no-scrollbar` on large matrices.
6. **Compilation & Build Health**:
   - Continuous verification with `npx ng build --configuration development` to ensure zero compilation errors and zero unresolved route chunks.
