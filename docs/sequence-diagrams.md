# Sequence Diagrams

## Here are the **most important sequence diagrams** for a modern online learning platform.

### 1. User Registration + Profile Completion

This version shows the `AuthService` staying active while it handles multiple database calls.

```mermaid
sequenceDiagram
    participant Guest
    participant FE as Frontend
    participant Auth as AuthService
    participant DB as Database

    Guest->>FE: Fill registration form
    FE->>Auth: POST /api/auth/register
    activate Auth
    Auth->>DB: Check email uniqueness
    activate DB
    DB-->>Auth: OK
    deactivate DB
    
    Auth->>Auth: Hash password
    
    Auth->>DB: INSERT User & Social Links
    activate DB
    DB-->>Auth: Success
    deactivate DB
    
    Auth-->>FE: 201 Created + JWT
    deactivate Auth
    FE-->>Guest: Redirect to profile setup

    Note over Guest, FE: Optional Profile Completion
    Guest->>FE: Upload bio/skills
    FE->>Auth: PATCH /api/users/me
    activate Auth
    Auth->>DB: UPDATE Tables
    activate DB
    DB-->>Auth: 200 OK
    deactivate DB
    Auth-->>FE: Success
    deactivate Auth

```

---

### 2. Student Enrolls in a Course

This clearly shows the "Timeline" of the `CourseAPI` during the validation and insertion phase.

```mermaid
sequenceDiagram
    participant Student
    participant FE as Frontend
    participant API as CourseAPI
    participant DB as Database

    Student->>FE: Click "Enroll Now"
    FE->>API: POST /api/courses/:id/enroll
    activate API
    API->>DB: Check Enrollment status
    activate DB
    DB-->>API: No record
    deactivate DB

    API->>DB: INSERT Enrollment & UPDATE Count
    activate DB
    DB-->>API: Success
    deactivate DB

    API-->>FE: 201 Created
    deactivate API
    FE-->>Student: Show "You're enrolled!"

```

---

### 3. Lesson + Quiz (The Core Flow)

This is the most complex timeline. It shows the API "holding" the process while it calculates scores.

```mermaid
sequenceDiagram
    participant Student
    participant FE as Frontend
    participant LAPI as LearningAPI
    participant DB as Database

    Student->>FE: Finish lesson
    FE->>LAPI: POST /api/lessons/:id/complete
    activate LAPI
    LAPI->>DB: Mark viewed
    LAPI-->>FE: 200 OK
    deactivate LAPI

    Note over Student, FE: Quiz Interaction
    Student->>FE: Submit answers
    FE->>LAPI: POST /api/submit-quiz
    activate LAPI
    LAPI->>DB: Get correct answers
    activate DB
    DB-->>LAPI: Data
    deactivate DB
    
    LAPI->>LAPI: Calculate Score
    
    LAPI->>DB: INSERT Results & UPDATE Progress
    activate DB
    DB-->>LAPI: Success
    deactivate DB
    
    LAPI-->>FE: Result {score, passed}
    deactivate LAPI

```

---

### 4. Instructor Course Creation

This demonstrates a "loop" timeline where the instructor keeps the process active while adding multiple questions.

```mermaid
sequenceDiagram
    participant Inst as Instructor
    participant FE as Frontend
    participant API as CourseAPI
    participant DB as Database

    Inst->>FE: Create course
    FE->>API: POST /api/courses
    activate API
    API->>DB: INSERT Course
    DB-->>API: course_id
    API-->>FE: 201 Created
    deactivate API

    loop Every Question
        Inst->>FE: Add question
        FE->>API: POST /api/questions
        activate API
        API->>DB: INSERT Question + Options
        DB-->>API: OK
        API-->>FE: Success
        deactivate API
    end

```

---

### 5. Certificate Issuance

Notice the `System` and `CertificateService` interacting to show an automated backend timeline.

```mermaid
sequenceDiagram
    participant Sys as System
    participant CS as CertService
    participant DB as Database
    participant Student

    Note over Sys: Triggered on 100% Progress
    Sys->>CS: Check completion
    activate CS
    CS->>DB: SELECT Progress
    activate DB
    DB-->>CS: 100% Complete
    deactivate DB
    
    CS->>CS: Generate certificateId
    
    CS->>DB: INSERT Certificate
    activate DB
    DB-->>CS: Success
    deactivate DB
    
    CS-->>Sys: Certificate Ready
    deactivate CS
    Sys-->>Student: "Congratulations!"

```

---

### 6. Forum Interaction

A simple timeline showing the request-response cycle for community features.

```mermaid
sequenceDiagram
    participant User
    participant FE as Frontend
    participant API as CommunityAPI
    participant DB as Database

    User->>FE: Post comment
    FE->>API: POST /api/comments
    activate API
    API->>DB: INSERT Comment
    activate DB
    DB-->>API: _id
    deactivate DB
    API-->>FE: 201 Created
    deactivate API
    FE-->>User: Show comment
```
