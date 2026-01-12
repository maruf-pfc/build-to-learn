# Sequence Diagrams

## Here are the **most important sequence diagrams** for a modern online learning platform.

### 1. User Registration + Profile Completion

```mermaid
sequenceDiagram
    participant Guest
    participant Frontend
    participant AuthService
    participant Database

    Guest->>Frontend: Fill registration form
    Frontend->>AuthService: POST /api/auth/register {email, password, name, role?}
    AuthService->>Database: Check email uniqueness
    alt Email already exists
        Database-->>AuthService: Duplicate found
        AuthService-->>Frontend: 409 Conflict
    else Email available
        Database-->>AuthService: OK
        AuthService->>AuthService: Hash password
        AuthService->>Database: INSERT INTO Users (_id, name, email, passwordHash, role='student')
        AuthService->>Database: INSERT INTO User_Social_Links (user_id)
        AuthService-->>Frontend: 201 Created + JWT token
        Frontend-->>Guest: Show success + redirect to profile setup

        Note over Frontend,Guest: Optional profile completion
        Guest->>Frontend: Upload avatar, bio, headline, skills, social links
        Frontend->>AuthService: PATCH /api/users/me
        AuthService->>Database: UPDATE Users + User_Skills + User_Social_Links
        AuthService-->>Frontend: 200 OK
    end
```

### 2. Student Enrolls in a Course

```mermaid
sequenceDiagram
    participant Student
    participant Frontend
    participant CourseAPI
    participant Database

    Student->>Frontend: Click "Enroll Now"
    Frontend->>CourseAPI: POST /api/courses/:courseId/enroll
    CourseAPI->>Database: Check if already enrolled (Enrollments)
    alt Not enrolled
        Database-->>CourseAPI: No record
        CourseAPI->>Database: INSERT INTO Enrollments (user_id, course_id, progress=0)
        CourseAPI->>Database: UPDATE Courses SET enrolledCount += 1
        CourseAPI-->>Frontend: 201 Created + enrollment info
    else Already enrolled
        Database-->>CourseAPI: Record exists
        CourseAPI-->>Frontend: 200 OK (existing enrollment)
    end

    Frontend-->>Student: Show "You're enrolled!" + redirect to course content
```

### 3. Student Completes a Lesson + Quiz (Most Important Student Flow)

```mermaid
sequenceDiagram
    participant Student
    participant Frontend
    participant LearningAPI
    participant Database

    Student->>Frontend: Finish watching video / reading documentation
    Frontend->>LearningAPI: POST /api/lessons/:lessonId/complete
    LearningAPI->>Database: Mark lesson as viewed (if tracking views)

    alt Lesson has quiz
        Student->>Frontend: Start quiz
        Frontend->>LearningAPI: GET /api/lessons/:lessonId/quiz
        LearningAPI->>Database: Fetch Quiz_Questions + Quiz_Options
        Database-->>LearningAPI: Questions data
        LearningAPI-->>Frontend: Quiz questions (shuffled if configured)

        Student->>Frontend: Submit answers
        Frontend->>LearningAPI: POST /api/lessons/:lessonId/submit-quiz {answers}
        LearningAPI->>Database: Get correct answers
        LearningAPI->>LearningAPI: Calculate score & check passing
        LearningAPI->>Database: INSERT Quiz_Results + Quiz_Answers
        alt Passed
            LearningAPI->>Database: INSERT Completed_Modules (if last lesson in module)
            LearningAPI->>Database: UPDATE Enrollments SET progress = ...
        end
        LearningAPI-->>Frontend: Result {score, passed, explanations}
    else No quiz
        LearningAPI->>Database: INSERT Completed_Modules (if applicable)
        LearningAPI->>Database: UPDATE Enrollments SET progress = ...
        LearningAPI-->>Frontend: 200 OK "Lesson completed"
    end

    Frontend-->>Student: Show result / next lesson button
```

### 4. Instructor Creates Course + Content Structure

```mermaid
sequenceDiagram
    participant Instructor
    participant Frontend
    participant CourseAPI
    participant Database

    Instructor->>Frontend: Create new course form
    Frontend->>CourseAPI: POST /api/courses {title, description, category, thumbnail}
    CourseAPI->>Database: INSERT INTO Courses (instructor_id = current user)
    Database-->>CourseAPI: New course _id
    CourseAPI-->>Frontend: 201 + course data

    Instructor->>Frontend: Add Module #1
    Frontend->>CourseAPI: POST /api/courses/:courseId/modules {title, order}
    CourseAPI->>Database: INSERT INTO Modules
    CourseAPI-->>Frontend: 201

    Instructor->>Frontend: Add Lesson (video)
    Frontend->>CourseAPI: POST /api/modules/:moduleId/lessons {title, type="video", videoUrl}
    CourseAPI->>Database: INSERT INTO Lessons
    CourseAPI-->>Frontend: 201

    Instructor->>Frontend: Add Lesson (quiz)
    Frontend->>CourseAPI: POST /api/modules/:moduleId/lessons {title, type="mcq"}
    CourseAPI->>Database: INSERT INTO Lessons
    CourseAPI->>Database: INSERT INTO Quiz_Settings (timeLimit, passingScore...)
    CourseAPI-->>Frontend: 201

    loop Add questions
        Instructor->>Frontend: Add question + options
        Frontend->>CourseAPI: POST /api/lessons/:lessonId/questions
        CourseAPI->>Database: INSERT Quiz_Questions + Quiz_Options
    end
```

### 5. Certificate Issuance (Course Completion)

```mermaid
sequenceDiagram
    participant Student
    participant System
    participant CertificateService
    participant Database

    Note over Student,System: Last lesson/quiz completed
    System->>CertificateService: Check course completion
    CertificateService->>Database: SELECT FROM Enrollments WHERE progress = 100
    CertificateService->>Database: SELECT COUNT FROM Completed_Modules
    alt All modules completed AND no certificate yet
        CertificateService->>Database: Get course title, instructor name, student name
        CertificateService->>CertificateService: Generate unique certificateId
        CertificateService->>Database: INSERT INTO Certificates (...)
        CertificateService-->>System: Certificate created
        System-->>Student: "Congratulations! Certificate ready"
        System-->>Student: Show/Download certificate
    else Not completed or already issued
        CertificateService-->>System: No action / return existing
    end
```

### 6. Forum Post + Comment Thread (Community Feature)

```mermaid
sequenceDiagram
    participant Student
    participant Frontend
    participant CommunityAPI
    participant Database

    Student->>Frontend: Write new discussion post
    Frontend->>CommunityAPI: POST /api/posts {type="discussion", title, content, course_id?}
    CommunityAPI->>Database: INSERT INTO Posts (author_id = current user)
    Database-->>CommunityAPI: New post _id
    CommunityAPI-->>Frontend: 201 Created

    Student->>Frontend: Add comment/reply
    Frontend->>CommunityAPI: POST /api/posts/:postId/comments {content, parent_id?}
    CommunityAPI->>Database: INSERT INTO Comments
    CommunityAPI-->>Frontend: 201

    alt Someone likes/upvotes
        OtherUser->>Frontend: Click like
        Frontend->>CommunityAPI: POST /api/posts/:postId/likes {type="upvote"}
        CommunityAPI->>Database: INSERT/UPDATE Post_Likes
    end
```

These six diagrams cover the **core flows** that appear most frequently in real online learning platforms:

1. Registration & onboarding  
2. Course enrollment  
3. Learning + assessment flow (most important student journey)  
4. Course/content creation (instructor)  
5. Certificate generation  
6. Community interaction

Here is a **single, combined Mermaid sequence diagram** that shows the **main happy-path flow** of a typical student journey in your online learning platform — from browsing → registration → enrollment → learning → quiz → completion → certificate.

This is the "all-in-one" version most people find useful for quick overview / presentation / documentation:

```mermaid
sequenceDiagram
    participant Guest as Guest
    participant FE as Frontend (Web/App)
    participant API as Backend API
    participant DB as Database

    Note over Guest,DB: 1. Discovery & Onboarding

    Guest->>FE: Browse courses / search
    FE->>API: GET /api/courses (public catalog)
    API->>DB: SELECT Courses + ratings + enrolledCount
    DB-->>API: Course list
    API-->>FE: Public course data
    FE-->>Guest: Show course catalog

    Guest->>FE: Click "Sign Up" / "Enroll"
    FE->>API: POST /api/auth/register {email, password, name}
    API->>DB: INSERT Users + User_Social_Links
    DB-->>API: New user _id
    API-->>FE: JWT + user data
    FE-->>Guest: Welcome! → redirect to profile setup

    Note over Guest,DB: 2. Enrollment

    Student->>FE: Click "Enroll Now" on course
    FE->>API: POST /api/courses/:courseId/enroll
    API->>DB: Check Enrollments
    alt Not enrolled
        API->>DB: INSERT Enrollments (progress=0)
        API->>DB: UPDATE Courses.enrolledCount +1
        API-->>FE: Enrollment success
    else Already enrolled
        API-->>FE: 200 OK (existing)
    end

    Note over Student,DB: 3. Learning & Assessment Flow

    Student->>FE: Open course → start module/lesson
    FE->>API: GET /api/lessons/:lessonId (content + quiz if any)
    API->>DB: Fetch Lessons + Quiz_Questions + Options
    DB-->>API: Lesson data + quiz (if type=mcq/documentation/etc)
    API-->>FE: Content ready

    Student->>FE: Finish lesson (watch/read)
    FE->>API: POST /api/lessons/:lessonId/complete

    alt Lesson has quiz
        Student->>FE: Answer quiz questions
        FE->>API: POST /api/lessons/:lessonId/submit-quiz {answers}
        API->>DB: Get correct answers
        API->>API: Calculate score
        API->>DB: INSERT Quiz_Results + Quiz_Answers
        alt Passed
            API->>DB: INSERT Completed_Modules
            API->>DB: UPDATE Enrollments.progress
            API-->>FE: Congratulations! Passed ✓
        else Failed
            API-->>FE: Try again (show explanations)
        end
    else No quiz
        API->>DB: INSERT Completed_Modules
        API->>DB: UPDATE Enrollments.progress
        API-->>FE: Lesson completed ✓
    end

    Note over Student,DB: 4. Course Completion & Certificate

    alt All modules completed (progress = 100)
        API->>API: Course completion detected
        API->>DB: Check if certificate exists
        alt No certificate yet
            API->>DB: INSERT Certificates (certificateId, userName, courseTitle...)
            API-->>FE: Certificate generated!
            FE-->>Student: Show big congratulations screen + download/view button
        else Already has certificate
            API-->>FE: Return existing certificate
        end
    else More lessons remain
        FE-->>Student: Next lesson / module unlocked
    end

    Note right of Student: Happy path complete!<br/>Student → Enrolled → Learned → Certified
```

### Quick Summary of the Flow (text version)

1. Guest browses public catalog  
2. Registers → becomes Student  
3. Enrolls in course  
4. Goes through lessons (content + optional quizzes)  
5. Submits quizzes → gets immediate feedback  
6. Completes all modules → progress reaches 100%  
7. Automatically receives certificate

This single diagram is commonly used in:

- Project documentation
- Pitch decks
- Team handovers
- Architecture overviews
