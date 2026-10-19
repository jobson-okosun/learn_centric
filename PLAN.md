# LearnCentric — Learner Portal Master Specification & Implementation Plan

> **Status:** Active Implementation · Target Root: `/learn`  
> **Layout Shell:** Reusing `src/app/layout/` across Instructor (`/app`) and Learner (`/learn`) portals.  
> **Framework:** Angular 22 (Signals, Standalone, Modern Control Flow, OnPush default) + Tailwind CSS v4 (Flat, shadowless, ringless) + Zard UI  
> **Directives:** UI-First Design (No backend services or models until UI is finalized; all state in component signals).

---

## 0. Project Architecture & Folder Structure Standard

Every feature in the application **MUST** follow the established structure seen in `src/app/features/courses/`:

```
<feature-directory>/
├── <feature>.route.ts                          # Route definitions for this feature
├── components/                                 # Reusable sub-components for this feature
│   └── <component-name>/
│       ├── <component-name>.ts
│       ├── <component-name>.html
│       └── <component-name>.css
└── pages/                                      # Routed page components
    ├── <page-name>/
    │   ├── <page-name>.ts                     # Uses `export default class <Name>`
    │   ├── <page-name>.html
    │   └── <page-name>.css
```

### Strict Folder Rules
1. **NO arbitrary wrapper directories**: Absolutely do NOT introduce `feature/`, `tabs/`, or redundant nested directories.
2. **Page exports**: Pages in `pages/<name>/<name>.ts` must use `export default class <Name>`.
3. **Route lazy loading**: In route files, load page components cleanly via `loadComponent: () => import('./pages/<name>/<name>')`.

---

## 1. Core Design & UI Rules

1. **Strictly Flat UI (Zero Shadows, Zero Rings)**:
   - Absolutely **DO NOT** use drop shadows (`shadow-sm`, `shadow-md`, `shadow-lg`, etc.).
   - Absolutely **DO NOT** use ring borders (`ring-1`, `ring-2`, `ring-*`).
   - Depth and separation are achieved exclusively through flat 1px borders (`border border-gray-200`), background tints (`bg-white`, `bg-gray-50`, `bg-primary/10`, `bg-neutral-50`), and `rounded-2xl` corners.
2. **Scrollable Content**:
   - Main content areas and panels must use `overflow-auto no-scrollbar` to prevent ugly default browser scrollbars.
3. **Tutor/Author Design Parity**:
   - Always reference the instructor module (`src/app/features/courses/` and `src/app/features/classroom/`) for card layouts, badges, pill filters, tab bars, headers, and tree structures.
4. **Route-Linked Tab State**:
   - All tab navigation menus must be linked to router routes (using `routerLink`, `routerLinkActive`, and `<router-outlet>`). State must never be lost on browser refresh or direct navigation.
5. **Materials Depth & Thumbnails**:
   - Modules and lessons can be one level deep (e.g. sub-modules inside modules, sub-lessons inside lessons).
   - Modules and lessons must support prominent thumbnail images (`size-12 rounded-md object-cover border border-gray-200`) alongside titles.

---

## 2. Learner Portal Current Structure (`src/app/learner/`)

```
src/app/learner/
├── PLAN.md                                     # Master Roadmap & Specification (This Document)
├── learner.route.ts                            # Top-level learner routes (/learn/home, /learn/courses, /learn/classroom)
├── pages/
│   └── home/                                   # Learner Home Dashboard
│       ├── home.ts                             # Metric cards, continue learning hero, 3-col core grid
│       ├── home.html
│       └── home.css
├── courses/                                    # My Courses & Course Workspace
│   ├── courses.route.ts                        # Sub-routes: list & :id (overview, assignments, discussion, gradebook, mastery, badges)
│   ├── components/
│   │   └── materials-list/                     # Recursive Syllabus Tree (sub-modules, thumbnails, actions)
│   └── pages/
│       ├── list/                               # My Courses Catalog (Filter pills, search, 3-col grid, Join drawer)
│       ├── details/                            # Course Shell (Header banner, routed tabs, <router-outlet>)
│       ├── overview/                           # Syllabus & Curriculum Tab (Embeds <app-materials-list>)
│       ├── assignments/                        # Problem Sets, Labs & Quizzes Tab (Filters & submissions)
│       ├── discussion/                         # Course Q&A Feed Tab (Thread composer & answers)
│       ├── gradebook/                          # Itemized Grades & Category Weights Tab
│       ├── mastery/                            # Learning Mastery & Outcomes Tab (Competencies, diagnostic & report drawer)
│       └── badges/                             # Course Badges & Achievements Tab (Unlocked, in-progress & leaderboard)
└── classroom/                                  # Expandable Classroom Hub (Sessions, Classes, Calendar, Attendance)
    ├── classroom.route.ts                      # Sub-routes: sessions, classes, classes/:id, calendar, attendance
    └── pages/
        ├── sessions/                           # Cross-Class Live Sessions Mission Control (/learn/classroom/sessions)
        │   ├── sessions.ts                     # Live Now hero, filter pills, stage modal, recording modal
        │   ├── sessions.html
        │   └── sessions.css
        ├── classes/                            # Enrolled Cohorts Catalog (/learn/classroom/classes)
        │   ├── classes.ts                      # Current, Upcoming, Completed tabs, slide-over Join drawer
        │   ├── classes.html
        │   └── classes.css
        ├── details/                            # Individual Cohort Workspace (/learn/classroom/classes/:id)
        │   ├── details.ts                      # Dashboard, Lecture Recordings, Schedule, Attendance tabs
        │   ├── details.html
        │   └── details.css
        ├── calendar/                           # Master Timetable & Schedule (/learn/classroom/calendar)
        │   ├── calendar.ts                     # Agenda & Month views, course filtering, stage simulator
        │   ├── calendar.html
        │   └── calendar.css
        └── attendance/                         # Master Personal Attendance Ledger (/learn/classroom/attendance)
            ├── attendance.ts                   # Attendance records, date picker, search & filter popover
            ├── attendance.html
            └── attendance.css
└── practice/                                   # Formative Practice & Interactive Drills (/learn/practice)
    ├── practice.route.ts                       # Routes: /learn/practice (hub) & /learn/practice/:id (runner)
    └── pages/
        ├── list/                               # Practice Hub Catalog (Metrics, target weak-spots, filter pills, 3-col grid)
        │   ├── list.ts
        │   ├── list.html
        │   └── list.css
        └── runner/                             # Interactive Formative Drill Runner (Untimed, step-by-step reasoning, Socratic hints, summary)
            ├── runner.ts
            ├── runner.html
            └── runner.css
```

---

## 3. Implementation Roadmap & Milestones

### Phase 1: Unified Shell & Navigation (`/learn`) — [COMPLETED]
- [x] Shell reuse via `src/app/layout/layout/layout.ts`.
- [x] Dynamic context detection in `src/app/layout/navigation/navigation.ts` for `/learn`.
- [x] Header top bar with `+ Join Class` and `Ask AI Tutor` buttons.

### Phase 2: Learner Home Dashboard (`/learn/home`) — [COMPLETED]
- [x] 4 Key stats metrics: Enrolled Courses, Due This Week, Completed Lessons, Practice Streak.
- [x] Full-width "Continue Learning" active lesson banner with progress meter and estimated time left.
- [x] Balanced 3-column core grid (My Courses, Today's Live Schedule, Upcoming Deadlines & Socratic AI Tutor).

### Phase 3: My Courses & Course Workspace (`/learn/courses`) — [COMPLETED]
- [x] Structure strictly aligned with `src/app/features/courses/`.
- [x] `courses.route.ts`: routes for `/learn/courses` (catalog) and `/learn/courses/:id` (details shell).
- [x] `pages/list/`: 3-column course grid with cover badge, progress bars, pill filters (`all`, `in-progress`, `completed`), and slide-over Join Course drawer.
- [x] `pages/details/`: course layout shell with breadcrumb, header banner, and route-linked tabs (`overview`, `assignments`, `discussion`, `gradebook`, `mastery`, `badges`).
- [x] `components/materials-list/`: recursive `ngTemplateOutlet` tree supporting all 12+ course material types, with media types launched in interactive modals (`video`, `audio`, `image`, `file`, `live-class`) and page material routed to dedicated page component. Features individual progress reports for every module, lesson, video, and audio item with real-time completion tracking and dynamic progress bar indicators.
- [x] `pages/materials/page/`: routed page material component (`/learn/courses/:id/pages/:pageId`) that receives rich text HTML data, sanitizes it, and renders formatted reading notes with breadcrumbs, formulas, and completion tracking.
- [x] `pages/overview/`: hosts `<app-materials-list>` with verified visual presentation of every course material type.
- [x] `pages/materials/assignment/`: dedicated routed assignment page (`/learn/courses/:id/materials/assignments/:assignmentId`) mirroring tutor 2-column layout (guidelines, formulas, starter attachments, rubric matrix, submission status card, and class Q&A thread).
- [x] `components/assignment-submission-drawer/`: reusable deliverable submission drawer with drag-and-drop file uploader, online LaTeX/code response editor, academic integrity pre-check simulator, honor code pledge, and cryptographic receipt modal.
- [x] `pages/assignments/`: problem sets and quizzes with filters (`all`, `pending`, `completed`), points, and deadlines, wired to submission drawer.
- [x] `pages/discussion/`: Q&A forum feed with ZardDialog modal question composer, filter toolbar, and instructor answer badges.
- [x] `pages/gradebook/`: itemized gradebook, category weighting cards, and letter grade summary.
- [x] `pages/mastery/`: student learning outcomes matrix, analytics cards, Socratic AI diagnostic recommendations, and official progress report drawer.
- [x] `pages/badges/`: course badges & achievements showcase, 4 filter tabs, XP milestone progression, and class leaderboard drawer.

### Phase 4: Classroom & Live Hub (`/learn/classroom`) — [COMPLETED]
- [x] Expandable `classroom` navigation menu in sidebar with 4 sub-routes:
  - `sessions` (`/learn/classroom/sessions`): Cross-class mission control with `Live Now`, `Upcoming`, `Past Sessions`, and `Recordings` tabs + course/class filters.
  - `classes` (`/learn/classroom/classes`): Enrolled cohorts catalog (`Current`, `Upcoming`, `Completed`) + Join drawer.
  - `classes/:id` (`/learn/classroom/classes/:id`): Individual cohort workspace with `Dashboard`, `Lecture Recordings`, `Schedule & Timetable`, and `My Attendance`.
  - `calendar` (`/learn/classroom/calendar`): Master timetable/schedule across all classes (Agenda & Month views).
  - `attendance` (`/learn/classroom/attendance`): Master attendance record & compliance tracking across all classes with 80% compliance meter.
- [x] Built with Angular CLI scaffolding and zero shadows/rings.

### Phase 5: Practice & Formative Drills (`/learn/practice`) — [COMPLETED]
- [x] Structure strictly aligned with standard feature pattern (`practice.route.ts`, `pages/list`, `pages/runner`).
- [x] Top-level route `/learn/practice` and drill runner route `/learn/practice/:id`.
- [x] **Practice Hub (`pages/list/`)**:
  - 4 key metrics: Active Practice Streak (5 Days), Drills Completed (142), Focus Weak-Spot (Stokes' Theorem), Mastery Accuracy (86%).
  - Search input and category filter pills (`All Drills`, `Recommended`, `Target Weak-Spots`, `Mastered`).
  - Dropdown filter controls with Subject and Difficulty.
  - 3-column responsive card grid displaying drill metadata, mastery progress bars, XP rewards, and direct drill launch actions.
- [x] **Interactive Formative Drill Runner (`pages/runner/`)**:
  - Question header directly beneath breadcrumbs, math questions styled strictly matching `mcq-preview`.
  - Step-by-step reasoning solutions, Socratic hints, and completion summary.

### Phase 6: Assessments & Test Runner (`/learn/assessments`) — [COMPLETED]
- [x] Structure strictly aligned with standard feature pattern (`assessments.route.ts`, `pages/list`, `pages/runner`, `pages/result`).
- [x] Routes: `/learn/assessments` (catalog), `/learn/assessments/:id/runner` (exam runner HUD), `/learn/assessments/:id/result` (rubric review).
- [x] **Assessments Catalog Hub (`pages/list/`)**:
  - 4 Key Metrics: Available Now, Upcoming Scheduled, Completed / Graded, Average Assessment Score.
  - Filter pills (`All`, `Available Now`, `Upcoming`, `Completed`), course dropdown, and assessment type filter.
  - Card grid featuring duration, question counts, weight %, due dates, proctoring tags, and launch modal.
  - Academic Integrity and Honor Code pre-launch verification modal.
- [x] **Timed Examination Runner HUD (`pages/runner/`)**:
  - Header HUD with live countdown timer (amber warning at <10m, red critical at <5m), autosave indicator, and submit action.
  - Clean question canvas rendering `[innerHTML]="currentQuestion().stem"` and option labels strictly matching `mcq-preview`.
  - Interactive Question Palette dock with states: Current, Answered, Unanswered, and Marked for Review.
  - Submission confirmation dialog highlighting answered vs unanswered question status.
- [x] **Rubric Scoring & Result Breakdown (`pages/result/`)**:
  - Score summary card: points earned, percentage, letter grade, class average, percentile, and time spent.
  - Instructor rubric feedback card from course lead.
  - Itemized question review with filters (`All`, `Correct`, `Partial / Needs Review`), correct vs chosen answers, mathematical step-by-step solutions, and teacher rubric notes.

### Phase 7: Discussions & Communications 3-in-1 Hub (`/learn/discussions`) — [COMPLETED]
- [x] Structure strictly aligned with standard feature pattern (`discussions.route.ts`, `pages/shell`, `pages/forum`, `pages/announcements`, `pages/messages`).
- [x] Route-linked tab container (`/learn/discussions/forum`, `/learn/discussions/announcements`, `/learn/discussions/messages`).
- [x] **Forum Q&A (`pages/forum/`)**:
  - Filter pills: All Discussions, Instructor Answered, Open / Unanswered, My Questions, Bookmarked.
  - Search input and Course selector.
  - Thread list cards with upvote counters, verified instructor answer badges, reply counters, and bookmarking.
  - "Ask a Question" modal with course selection, topic, title, and detailed markdown/code context.
  - Thread detail drawer/modal with question content, verified answer callouts, and inline reply composer.
- [x] **Announcements Broadcasts (`pages/announcements/`)**:
  - Parity with tutor communication module (`channels`: In-App, Email, SMS, WhatsApp).
  - High-priority urgent announcement banner.
  - Course filter, unread indicators, and "Mark all as read" action.
  - Full announcement modal with downloadable resource attachments.
- [x] **Direct Messages (`pages/messages/`)**:
  - 2-pane split inbox layout mirroring `src/app/features/communication/pages/inbox/`.
  - Left pane: Conversation list with unread indicator bars, online indicators, course/topic context, and search.
  - Right pane: Contact header with online status, educational context, chat bubble stream (sent vs received), and quick response composer.
  - "Compose New Message" modal to start private conversations with course faculty and TAs.

### Phase 8: Socratic AI Tutor (`/learn/tutor`) — [COMPLETED]
- [x] Structure strictly aligned with standard feature pattern (`tutor.route.ts`, `pages/workspace/`).
- [x] Full-height 2-pane interactive academic workspace matching the flat LearnCentric design system.
- [x] **Study History & Context Sidebar (`w-80`)**:
  - "+ New Chat" button and session search input.
  - Course context filter dropdown (`MATH-301`, `PHYS-201`, `CS-210`, etc.).
  - Pinned and recent study sessions with course tags, last active timestamps, and pin toggles.
- [x] **Conversational Socratic Canvas**:
  - Pedagogy mode switcher pills: `Socratic Guide`, `Mental Model`, `Diagnostic Drill`, `Misconception Check`.
  - Welcome state with 4 starter prompt cards tailored across multivariable calculus, physics, and algorithms.
  - Socratic tutor cards with sparkle persona badge, math formula callouts (LaTeX formatted), code syntax blocks, and follow-up suggestion chips.
  - Progressive hint tiering (reveal progressive clues step-by-step without spoiling full answers).
  - Multi-line message composer dock with Enter-to-send and thinking indicator.

### Phase 9: Learner Profile & Academic Settings (`/learn/settings`) — [COMPLETED]
- [x] Structure strictly aligned with standard feature pattern (`settings.route.ts`, `pages/shell`, `pages/profile`, `pages/academic`, `pages/notifications`, `pages/preferences`, `pages/security`).
- [x] Route-linked vertical tab navigation shell with `<router-outlet>`.
- [x] **Profile & Personal Info (`pages/profile/`)**: Student avatar, institutional email, phone, bio, pronouns, timezone.
- [x] **Academic & Degree Status (`pages/academic/`)**: Degree program, student UID, GPA & credits progress, advisor card, enrolled cohorts.
- [x] **Notification Preferences (`pages/notifications/`)**: In-app, Email, SMS, WhatsApp channels for deadlines, grades, live classes, discussions.
- [x] **Study & AI Tutor Preferences (`pages/preferences/`)**: Default pedagogy mode, progressive hint depth, lecture playback defaults, practice goals.
- [x] **Security & Privacy (`pages/security/`)**: Password management, 2FA toggle, active session devices, leaderboard visibility.

### Phase 10: Instructor & Faculty Settings (`/app/settings`) — [COMPLETED]
- [x] Feature route and shell structure in `src/app/features/settings/` (`settings.route.ts`, `pages/shell/`, and 5 dedicated sub-pages).
- [x] Route mounted in `src/app/app.routes.ts` under `/app/settings` and wired to sidebar navigation footer.
- [x] Independent scroll isolation: fixed sidebar navigation with only the right tab contents panel scrolling (`overflow-y-auto no-scrollbar`).
- [x] **Faculty Profile & Credentials (`pages/profile/`)**: Academic title, department, office location, weekly office hours, faculty staff ID copy, public bio, and research links (Google Scholar, ORCID, GitHub).
- [x] **Teaching & Grading Defaults (`pages/teaching/`)**: Default grading scale, pass mark threshold, minimum attendance requirement (80%), late submission policies & grace periods, blind/anonymous grading toggle, and AI integrity sensitivity.
- [x] **Virtual Stage & Lecture Defaults (`pages/classroom/`)**: Stream broadcast resolution (1080p 60fps), AI background noise isolation, student audience permissions on entry, auto-recording to cloud, AI transcripts, and whiteboard grid settings.
- [x] **Dispatch & Alert Channels (`pages/notifications/`)**: Submission digests, late submission alerts, forum mentions, office hours waiting room notifications, attendance deficit warnings, and Slack/Teams webhooks.
- [x] **Security & Institutional Access (`pages/security/`)**: Institutional SSO SAML 2.0 status, password management, MFA enforcement for grade publishing, master proctor key generator & rotation, and active faculty workstation sessions.

### Phase 11: Coursework Submission Lifecycle & Instructor Grading — [COMPLETED]
- [x] **Learner Assignment Hub & Submission Flow (`src/app/learner/pages/materials/assignment/`)**:
  - Parity with tutor assignment view: prompt details, criteria cards, rubric breakdown, resource attachments.
  - Slide-over submission drawer (`assignment-submission-drawer`) supporting drag-and-drop file uploads, notes, and progress bar.
  - Verification & digital receipt dialog with submission hash and timestamp.
  - Integrated into course assignments tab (`src/app/learner/pages/assignments/`).
- [x] **Instructor Assignment Submissions Roster (`src/app/features/courses/pages/materials/assignment-submissions/`)**:
  - Accessible via primary **Submissions** action on tutor assignment page.
  - Real-time submission counters (Total, Needs Grading, Graded).
  - Search and filter controls without badge/pill clutter.
  - Student submissions roster table with direct `Grade` and `Review` routing.
- [x] **Instructor Assignment Grading Workspace (`src/app/features/courses/pages/materials/assignment-grading/`)**:
  - Structural parity with Exam & Quiz grading (`src/app/features/assessment/pages/grading/`).
  - Top student progression bar (`Student X of Y`), sequential `Prev` and `Save & Next` navigation.
  - Left pane: prompt brief, multi-tab deliverable document viewer (`.pdf`, `.py`, `.txt`), submission receipt hash, AI score suggestion callout.
  - Right pane: rubric criteria point selectors (`Excellent`, `Good`, `Fair`, `Poor`), live calculated total score (`/100`), feedback composer, draft save, and gradebook publication.
  - Strict UI compliance: 0 drop shadows, 0 rings, standard `btn primary` and `btn outline`, flat 1px borders.

### Phase 12: Learner Insights & Results Broadsheet Hub (`/learn/insights`) — [COMPLETED]
- [x] Structure strictly aligned with standard feature pattern (`insights.route.ts`, `pages/overview`, `pages/assessments`, `pages/mastery`, `pages/ai-insights`).
- [x] Integrated into learner sidebar navigation as expandable `insights` menu with matching SVG icon.
- [x] **Academic Overview (`pages/overview/`)**:
  - Composite Performance Score (89%), Course Completion Progress (14/18 Modules), and Top Performer status.
  - Course Broadsheet ledger with module counts, attendance rate %, coursework average, assessment score, and overall ratings.
  - Program certification criteria card and quick links to detailed sub-views.
- [x] **Assessment Results History (`pages/assessments/`)**:
  - Unified broadsheet across all enrolled courses and terms.
  - Search input, course filter, and clean text buttons (All, Exams, Quizzes, Distinctions) with zero pill spam.
  - Performance records with score/max points, letter grades, cohort percentile rankings, and direct `Review` links to rubric breakdown (`/learn/assessments/:id/result`).
- [x] **Learning Outcomes & Mastery Matrix (`pages/mastery/`)**:
  - Multi-subject competency tracker mapping institutional SLOs across mathematics, quantum physics, algorithms, and biology.
  - Status counts (Exceeded, Mastered, Progressing, Needs Focus) with benchmark indicators and direct links to formative practice drills.
- [x] **Socratic AI Study Diagnostics (`pages/ai-insights/`)**:
  - Executive diagnostic summary from the AI tutor with overall exam readiness index (91%) and recommended study pace.
  - Two-column split highlighting top mastered concepts vs priority weak-spot interventions with drill launchers.
- [x] **Strict Flat Design**: 0 drop shadows, 0 rings, standard `btn primary` and `btn outline`, flat 1px borders.

---

## 4. Engineering Directives Checklist
- [x] **No backend services or models for now**: keep UI design moving quickly with component signals.
- [x] **No drop shadows or rings**: flat design only.
- [x] **No arbitrary folders**: always `<feature>/pages/` and `<feature>/components/`.
- [x] **Always build-verify**: run `npx ng build --configuration development` to ensure zero compilation regressions.

---

## 5. Next Implementation Candidates
Detailed descriptions, scope, and comparison matrix for upcoming candidates are compiled in [ROADMAP_NEXT_STEPS.md](file:///c:/Users/DELL/Desktop/MULTILENT/JOB-OKOSUN-MULTILENT/APPS/learncentric/ROADMAP_NEXT_STEPS.md).

