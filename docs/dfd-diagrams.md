# Data Flow Diagrams - Build to Learn

## Level 0 DFD (Context Diagram)

This diagram shows the interaction between the **Build to Learn** system and external entities (Student, Instructor, Admin).

```mermaid
graph TD
    %% External Entities
    Student[Student]
    Instructor[Instructor]
    Admin[Admin]

    %% System
    System((Build to Learn\nPlatform))

    %% Data Flows
    Student -- Registration/Login Details --> System
    Student -- Course Enrollment Request --> System
    Student -- Quiz Answers & Project Links --> System
    
    System -- Course Content (Video/Text) --> Student
    System -- Assessment Results & Certificates --> Student
    System -- Gamification Points & Badges --> Student

    Instructor -- Course Details & Content --> System
    Instructor -- Module & Lesson Materials --> System
    
    System -- Student/Earnings Stats --> Instructor
    System -- Course Published Status --> Instructor

    Admin -- User Management Actions --> System
    System -- Platform Statistics & Reports --> Admin
```

## Level 1 DFD (System Overview)

This diagram breaks down the system into its core functional processes.

```mermaid
graph TD
    %% External Entities
    Student[Student]
    Instructor[Instructor]

    %% Processes
    P1((1.0\nAuthentication))
    P2((2.0\nCourse\nManagement))
    P3((3.0\nLearning\nDelivery))
    P4((4.0\nAssessment &\nGamification))

    %% Data Stores
    D1[(Users DB)]
    D2[(Courses DB)]
    D3[(Enrollments DB)]
    D4[(Progress &\nPoints DB)]

    %% Flow: Auth
    Student --> P1
    Instructor --> P1
    P1 -- Validate Credentials --> D1
    D1 -- User Profile --> P1
    P1 -- Auth Token --> Student
    P1 -- Auth Token --> Instructor

    %% Flow: Course Mgmt
    Instructor -- Create Course/Module --> P2
    P2 -- Store Course Data --> D2
    P2 -- Add Lessons --> D2
    D2 -- Course Details --> P2
    P2 -- Confirmation --> Instructor

    %% Flow: Learning
    Student -- Enroll Request --> P3
    P3 -- Check One-Active Course logic --> D3
    P3 -- Store Enrollment --> D3
    Student -- Request Lesson --> P3
    D2 -- Retrieve Content --> P3
    P3 -- Video/Text Content --> Student

    %% Flow: Assessment
    Student -- Submit Quiz/Project --> P4
    P4 -- Grade MCQ / Validate Repo --> D2
    P4 -- Update Progress --> D3
    P4 -- Award Points --> D4
    D4 -- Leaderboard/Stats --> P4
    P4 -- Score & Feedback --> Student
```

## Level 2 DFD (Process 4.0: Assessment & Gamification)

This diagram details the **Assessment** process, showing how Quizzes and Projects are handled, including anti-cheat and gamification logic.

```mermaid
graph TD
    %% External Entity
    Student[Student]

    %% Sub-Processes
    P4_1((4.1\nSubmit\nMCQ))
    P4_2((4.2\nSubmit\nProject))
    P4_3((4.3\nCalculate\nScore))
    P4_4((4.4\nCheck\nCheating))
    P4_5((4.5\nUpdate\nProgress))

    %% Data Stores
    D_Module[(Modules DB\nCorrect Answers)]
    D_Enroll[(Enrollments DB)]
    D_User[(Users DB\nPoints)]

    %% Flow: MCQ
    Student -- Quiz Answers --> P4_1
    P4_1 -- Retrieve Correct Answers --> D_Module
    D_Module -- Key --> P4_1
    P4_1 -- Raw Score --> P4_3
    
    %% Flow: Anti-Cheat
    Student -- Cheating Flags\n(Tab Switch/Paste) --> P4_4
    P4_4 -- Cheating Status --> P4_3
    P4_3 -- Final Score (Pass/Fail) --> P4_5

    %% Flow: Project
    Student -- GitHub Repo URL --> P4_2
    P4_2 -- Validate URL Format --> P4_5

    %% Flow: Update
    P4_5 -- Mark Module Complete --> D_Enroll
    P4_5 -- Add Points --> D_User
    P4_5 -- Check Course Completion --> D_Enroll
    
    %% Feedback
    P4_3 -- Grade/Feedback --> Student
    P4_5 -- Completion Success --> Student
```

## Description of Processes

1.  **Authentication (1.0):** Handles user registration, login, and JWT token issuance.
2.  **Course Management (2.0):** Allows instructors to create courses, add modules, upload video URLs, and manage lesson content.
3.  **Learning Delivery (3.0):** Manages student enrollment (enforcing the single active course rule) and delivers course content structure.
4.  **Assessment & Gamification (4.0):**
    *   **4.1 Submit MCQ:** Validates answers against the database.
    *   **4.2 Submit Project:** Validates GitHub repository links.
    *   **4.4 Check Cheating:** Detects behavioral flags like tab switching.
    *   **4.5 Update Progress:** Updates the user's progress, unlocks the next module, and awards gamification points (10pts per module, bonus for completion).
