# LearnCentric — Roadmap Progress & Next Implementation Candidates

> **Document Status:** Active Planning & Review  
> **Repository Root:** `c:\Users\DELL\Desktop\MULTILENT\JOB-OKOSUN-MULTILENT\APPS\learncentric\`  
> **Updated:** October 2026  

---

## 1. Executive Summary & Completed Milestones

All **10 core phases** of the Learner Portal, along with the Faculty Settings module and the Global Header Notifications system, have been fully implemented, styled with flat border design (0 drop shadows, 0 rings), and verified with Angular CLI compilation (**0 errors, 0 warnings**).

| Phase | Surface | Route | Status | Key Highlights |
|---|---|---|---|---|
| **Phase 1** | Unified Navigation Shell | `/learn` & `/app` | **Completed** | Context-aware sidebar, sticky header, modal join trigger |
| **Phase 2** | Learner Home Dashboard | `/learn/home` | **Completed** | 4 stat meters, continue-learning hero, 3-column widget grid |
| **Phase 3** | My Courses & Materials | `/learn/courses` | **Completed** | 12+ learning material types, modal viewers, progress meters |
| **Phase 4** | Classroom & Live Hub | `/learn/classroom/*` | **Completed** | Sessions, cohorts, timetable calendar, 80% attendance ledger |
| **Phase 5** | Formative Practice & Drills | `/learn/practice/*` | **Completed** | Socratic hints runner, mastery matrix, focus weak-spots |
| **Phase 6** | Assessments & Exam HUD | `/learn/assessments/*` | **Completed** | Live countdown timer, palette drawer, rubric breakdown |
| **Phase 7** | Discussions 3-in-1 Hub | `/learn/discussions/*` | **Completed** | Forum Q&A, priority announcements, split 2-pane direct inbox |
| **Phase 8** | Socratic AI Tutor | `/learn/tutor` | **Completed** | 4 reasoning modes embedded in composer, LaTeX math, session pins |
| **Phase 9** | Learner Academic Settings | `/learn/settings/*` | **Completed** | Profile, academic standing, channels, AI defaults, security |
| **Phase 10** | Faculty & Instructor Settings | `/app/settings/*` | **Completed** | Academic credentials, grading rubrics, lecture stage defaults, SSO |
| **Phase 11** | Coursework Submission & Grading | `/learn/courses/:id/materials/assignments/:assignmentId` & `/app/courses/:id/materials/assignments/:assignmentId/submissions` | **Completed** | Learner submission drawer, cryptographic receipt, tutor submissions roster & grading workspace |
| **Phase 12** | Learner Insights & Results Hub | `/learn/insights/*` | **Completed** | Academic broadsheet, GPA tracking, assessments history, multi-subject mastery matrix, AI study diagnostics |
| **Global** | Header Notification Center | Top bar (Global) | **Completed** | Filter tabs (All/Unread/Urgent), batch read, context-aware alerts |

---

## 2. Next Implementation Candidates

To determine the next focus of development, four major feature tracks have been synthesized from the master architecture and platform specification:

---

### Candidate 1: Learner Live Lecture Stage Experience
**Route:** `/learn/classroom/stage/:id` (or interactive stage simulator modal)  
**Context:** High-impact student engagement during scheduled class periods.

#### Scope & Features:
1. **Interactive Broadcast Canvas**:
   - Live video stream simulation (instructor webcam feed + screen share / slides toggle).
   - Real-time whiteboard canvas mirror with synchronized ink/formulas.
   - Synchronized AI live transcription feed with keyword indexing and speaker badges.
2. **Student Participation Dock**:
   - **Hand Raise Queue**: Chronological queue with status pill ("Position #2 in queue") and instant un-raise.
   - **In-Stage Live Chat & Q&A**: Filter between public chat, questions for the instructor, and TA direct inquiries.
   - **Interactive Polls & Checks for Understanding**: Pop-up multiple choice micro-drills pushed by instructor during lecture.
3. **Breakout Room Workstation**:
   - Seamless transition into timed group breakout rooms with shared scratchpads and return-to-stage countdown.

---

### Candidate 2: Assignment Submission & File Upload Flow — [COMPLETED]
**Routes:** 
- Dedicated Assignment View: `/learn/courses/:id/materials/assignments/:assignmentId` (Tutor Parity)
- Assignments Hub: `/learn/courses/:id/assignments` & `/learn/assessments`  
**Context:** Closes the academic feedback loop for student deliverables with full parity to instructor assignment module.

#### Implementation Highlights & Features:
1. **Dedicated Learner Assignment Detail Page (`pages/materials/assignment/`)**:
   - Asymmetrical 2-column layout matching faculty view in `src/app/features/courses/`:
     - **Left (2/3)**: Breadcrumb navigation, metadata badges (Due date, max points, format), problem statement, LaTeX math callouts, specific instructions, mandatory deliverables, downloadable starter reference assets, and full criteria rubric matrix.
     - **Right (1/3)**: Real-time submission status card (Not Submitted, Submitted v1, Graded with faculty feedback) + interactive Class Comments Q&A thread with student/instructor badges and upvoting.
2. **Reusable Deliverable Submission Drawer (`components/assignment-submission-drawer/`)**:
   - Multi-format drag-and-drop file uploader (`.pdf`, `.py`, `.ipynb`, `.zip`, `.png`, `.docx`) with instant preview chips.
   - Online Text & Code Response Editor with one-click LaTeX math formula insertion (`∬`, `∮`, `∇f`) and code blocks.
   - Git repository integration (clone URL, branch, and commit SHA tracking).
   - Academic Integrity Pre-Check Simulator (automated originality scoring).
   - Mandatory LearnCentric Academic Honor Code pledge affirmation.
   - Cloud draft saving vs sealed final submission.
3. **Cryptographic Verification Receipt Modal**:
   - Generates unique cryptographic verification hash (e.g. `LC-SUB-2026-F89A-F9A`), UTC timestamp, student identification, submitted artifact checksums, and one-click copy.
4. **Three Synchronized Launch Points**:
   - Course Materials & Syllabus tree (`materials-list.ts`) links directly to `/learn/courses/:id/materials/assignments/:id`.
   - Course Assignments tab (`pages/assignments/`) launches the slide-over drawer or navigates to the assignment page.
   - Version revision tracking (`v1`, `v2`) for resubmissions.

---

### Candidate 3: Instructor Grading & Assessment Inbox — [COMPLETED]
**Routes:** 
- Assignment Submissions Roster: `/courses/:id/materials/assignments/:assignmentId/submissions`
- Assignment Grading Workspace: `/courses/:id/materials/assignments/:assignmentId/grading/:submissionId` & `/courses/:id/materials/assignments/:assignmentId/grading`
- Exam & Quiz Grading Workspace: `/app/assessment/grading`  
**Context:** Central faculty workspace for evaluating student deliverables, applying criteria-based rubrics, and publishing feedback.

#### Implementation Highlights & Features:
1. **Assignment Submissions Roster (`pages/materials/assignment-submissions/`)**:
   - Access from Tutor Assignment Page via primary **Submissions** action.
   - Clean summary metrics: Total Submissions, Needs Grading, Graded.
   - Interactive roster table with student avatars, submission timestamp, deliverable file counts, and direct `Grade` / `Review` actions.
   - Clean text-based status filters (All, Needs Grading, Graded) without badge/pill spam.
2. **Interactive Rubric Grading Workspace (`pages/materials/assignment-grading/`)**:
   - Direct parity with existing exam/quiz grading architecture (`features/assessment/pages/grading/`).
   - Top student progression bar (`Student X of Y`), completion meter, and sequential `Prev` / `Save & Next` controls.
   - Split-pane layout:
     - **Left Pane**: Assignment prompt brief, multi-tab deliverable document viewer (`.pdf`, `.py`, `.txt`), verified digital receipt hash, and AI Suggested Score callout.
     - **Right Pane**: Interactive rubric criteria with point-level selectors (`Excellent`, `Good`, `Fair`, `Poor`), live calculated total score (`/100`), constructive feedback composer, `Save Draft`, and `Publish Grade` actions.
3. **Strict Aesthetic Compliance**:
   - Flat design: 0 drop shadows, 0 rings, clean 1px borders (`border-gray-200`/`border-gray-100`).
   - Project button conventions: Standard `btn primary` and `btn outline`.
   - Typography-first hierarchy without badge or pill proliferation.

---

### Candidate 4: Learner Learning Paths & Adaptive Journey
**Route:** `/learn/learning-paths` (and `/learn/learning-paths/:id`)  
**Context:** Connects students to the curriculum pathways published by tutors in `/app/teachings/learning-paths`.

*(Note: The tutor-side Learning-Paths list and builder are already built at `/app/teachings/learning-paths/builder/:id`)*

#### Scope & Features:
1. **Learner Learning Paths Catalog (`/learn/learning-paths`)**:
   - Enrolled & recommended learning pathways with target outcomes, estimated time, and milestone progress.
   - Status filters: `In Progress`, `Completed`, `Recommended`.
2. **Interactive Pathway Map (`/learn/learning-paths/:id`)**:
   - Visual step-by-step curriculum map showing unlocked vs locked learning objects.
   - Milestone criteria: Must complete prior step, score threshold (e.g. 80% on diagnostic drill), or manual unlock.
   - Direct launch into courses, lessons, and practice drills from the path.
3. **Adaptive Progression HUD**:
   - Real-time indicator showing which path branch the student is on based on their mastery scores.

---

## 3. Comparison Matrix

| Option | Primary User | Core Value Proposition | UI Complexity |
|---|---|---|---|
| **1. Live Lecture Stage (Full Route)** | Learner | Full-screen synchronous classroom with live chat, Q&A, and micro-polls | Medium-High |
| **2. Assignment Submission Flow** | Learner | Complete end-to-end coursework submission lifecycle — **[COMPLETED]** | Medium |
| **3. Instructor Grading Inbox** | Faculty / TA | Efficient rubric assessment, submissions roster & grading workspace — **[COMPLETED]** | High |
| **4. Learner Learning Paths** | Learner | Student journey following pathways created in Tutor Teachings | Medium |

---

## 4. Architectural Commitments

Whichever candidate is selected will follow LearnCentric standards:
- **Angular 22 Standalone**: Signal-based state management, `computed()`, and native control flow (`@if`, `@for`).
- **Strictly Flat Design**: 0 drop shadows (`shadow-*`), 0 rings (`ring-*`), 1px flat borders (`border-gray-100`/`border-gray-200`).
- **Scroll Isolation**: Fixed navigation/headers with only internal panels scrolling via `overflow-y-auto no-scrollbar`.
- **Zero Compilation Errors**: Verified with `npx ng build --configuration development`.
