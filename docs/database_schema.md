# Build To Learn LMS - Database Schema Documentation

Complete database schema for the Learning Management System platform.

## Overview

- **Total Collections**: 10 MongoDB collections
- **Normalized Tables**: 22 SQL tables
- **Architecture**: Document-based (MongoDB) with relational mapping

---

## Entity Relationship Diagram

```mermaid
erDiagram
    %% ========================================
    %% USER MANAGEMENT
    %% ========================================
    Users ||--o{ User_Skills : "has"
    Users ||--o{ User_Experience : "has"
    Users ||--o{ User_Education : "has"
    Users ||--|| User_Social_Links : "has"

    %% ========================================
    %% COURSE RELATIONSHIPS
    %% ========================================
    Users ||--o{ Courses : "instructs"
    Users ||--o{ Course_Students : "enrolls as"
    Courses ||--o{ Course_Students : "has"
    Courses ||--o{ Modules : "contains"
    Modules ||--o{ Lessons : "contains"

    %% ========================================
    %% QUIZ & ASSESSMENT
    %% ========================================
    Lessons ||--o{ Quiz_Questions : "contains"
    Lessons ||--|| Quiz_Settings : "configured by"
    Quiz_Questions ||--o{ Quiz_Options : "has"

    Users ||--o{ Quiz_Results : "attempts"
    Courses ||--o{ Quiz_Results : "tracks attempts for"
    Modules ||--o{ Quiz_Results : "has attempts"
    Quiz_Results ||--o{ Quiz_Answers : "contains"
    Quiz_Results ||--o{ Cheating_Flags : "may have"

    %% ========================================
    %% ENROLLMENT & PROGRESS
    %% ========================================
    Users ||--o{ Enrollments : "enrolls in"
    Courses ||--o{ Enrollments : "has"
    Enrollments ||--o{ Completed_Modules : "tracks"
    Modules ||--o{ Completed_Modules : "completed in"

    %% ========================================
    %% CERTIFICATES
    %% ========================================
    Users ||--o{ Certificates : "earns"
    Courses ||--o{ Certificates : "generates"

    %% ========================================
    %% COMMUNITY
    %% ========================================
    Users ||--o{ Posts : "authors"
    Courses ||--o{ Posts : "relates to"
    Posts ||--o{ Post_Tags : "has"
    Posts ||--o{ Post_Likes : "has"
    Posts ||--o{ Comments : "has"
    Users ||--o{ Post_Likes : "likes"
    Users ||--o{ Comments : "writes"
    Comments ||--o{ Comments : "replies to"

    %% ========================================
    %% ENTITY DEFINITIONS
    %% ========================================

    Users {
        string _id PK
        string name
        string email UK
        string passwordHash
        enum role "public, student, instructor, admin"
        string avatar
        text bio
        string headline
        string cv
        int points
        timestamp createdAt
        timestamp updatedAt
    }

    User_Skills {
        string user_id FK
        string skill
    }

    User_Experience {
        string _id PK
        string user_id FK
        string company
        string role
        date startDate
        date endDate
        text description
        boolean current
    }

    User_Education {
        string _id PK
        string user_id FK
        string school
        string degree
        string fieldOfStudy
        date startDate
        date endDate
        text description
    }

    User_Social_Links {
        string user_id PK_FK
        string website
        string linkedin
        string github
        string twitter
    }

    Courses {
        string _id PK
        string title
        text description
        string category
        string thumbnail
        string instructor_id FK
        int enrolledCount
        float rating
        timestamp createdAt
        timestamp updatedAt
    }

    Course_Students {
        string course_id FK
        string student_id FK
        timestamp enrolledAt
    }

    Modules {
        string _id PK
        string course_id FK
        string title
        int order_index
        timestamp createdAt
        timestamp updatedAt
    }

    Lessons {
        string _id PK
        string module_id FK
        string title
        enum type "video, documentation, mcq, project, text"
        text content
        string videoUrl
        string repoLinkPlaceholder
        timestamp createdAt
    }

    Quiz_Questions {
        string _id PK
        string lesson_id FK
        text text
        enum type "single, multiple, text"
        text correctAnswer
        int points
        text explanation
    }

    Quiz_Options {
        string _id PK
        string question_id FK
        string text
        boolean isCorrect
    }

    Quiz_Settings {
        string lesson_id PK_FK
        int timeLimit
        int passingScore
        boolean shuffleQuestions
    }

    Quiz_Results {
        string _id PK
        string student_id FK
        string course_id FK
        string module_id FK
        int score
        int totalPoints
        boolean passed
        timestamp attemptDate
        timestamp createdAt
        timestamp updatedAt
    }

    Quiz_Answers {
        string _id PK
        string quiz_result_id FK
        string questionId
        text answer
        boolean isCorrect
    }

    Cheating_Flags {
        string _id PK
        string quiz_result_id FK
        enum type "blur, paste, other"
        timestamp timestamp
        text details
    }

    Enrollments {
        string _id PK
        string user_id FK
        string course_id FK
        timestamp enrolledAt
        timestamp completedAt
        int progress
    }

    Completed_Modules {
        string enrollment_id FK
        string module_id FK
        timestamp completedAt
    }

    Certificates {
        string _id PK
        string certificateId UK
        string user_id FK
        string course_id FK
        string courseTitle
        string userName
        string instructorName
        timestamp issueDate
        timestamp createdAt
        timestamp updatedAt
    }

    Posts {
        string _id PK
        enum type "blog, forum, discussion, question"
        string title
        text content
        string author_id FK
        string course_id FK
        string image
        int views
        timestamp createdAt
        timestamp updatedAt
    }

    Post_Tags {
        string post_id FK
        string tag
    }

    Post_Likes {
        string post_id FK
        string user_id FK
        enum type "upvote, downvote, like"
        timestamp createdAt
    }

    Comments {
        string _id PK
        string post_id FK
        string author_id FK
        text content
        string parent_id FK
        timestamp createdAt
        timestamp updatedAt
    }
```

---

## Schema Sections

### 1. User Management (5 tables)

- **Users**: Core user accounts with authentication
- **User_Skills**: User skill tags
- **User_Experience**: Work history
- **User_Education**: Academic background
- **User_Social_Links**: Social media profiles

### 2. Course Management (4 tables)

- **Courses**: Course catalog
- **Course_Students**: Enrollment relationship
- **Modules**: Course curriculum units
- **Lessons**: Individual learning content (video, text, quiz, project)

### 3. Quiz & Assessment (6 tables)

- **Quiz_Questions**: Question bank
- **Quiz_Options**: Multiple choice options
- **Quiz_Settings**: Per-lesson quiz configuration
- **Quiz_Results**: Student quiz attempts
- **Quiz_Answers**: Individual question responses
- **Cheating_Flags**: Anti-cheat detection system

### 4. Enrollment & Progress (2 tables)

- **Enrollments**: Student course enrollments
- **Completed_Modules**: Progress tracking

### 5. Certificates (1 table)

- **Certificates**: Achievement certificates with unique IDs

### 6. Community (4 tables)

- **Posts**: Forum posts and blog articles
- **Post_Tags**: Post categorization
- **Post_Likes**: Upvotes/downvotes
- **Comments**: Nested comment threads

---

## Key Features

### Role-Based Access Control

- **Public**: Unauthenticated users (browse only)
- **Student**: Enroll in courses, take quizzes, earn certificates
- **Instructor**: Create and manage courses
- **Admin**: Full system access

### Learning Flow

1. Student enrolls in a course
2. Course contains ordered modules
3. Modules contain lessons (video, text, quiz, project)
4. Progressive unlocking: Module N+1 unlocks after completing Module N
5. Quiz attempts tracked with anti-cheat
6. Certificate generated upon course completion

### Gamification

- Points awarded for:
  - Completing modules: +10 points
  - Completing courses: +100 points
  - Submitting projects: +50 points
- Leaderboard ranks students by total points

### Anti-Cheat System

Tracks suspicious behavior during quizzes:

- **Blur events**: User switches tabs/windows
- **Paste events**: User pastes content
- **Other**: Custom detection rules

### Content Types

- **Video**: Streaming video lessons
- **Text**: Markdown documentation
- **MCQ**: Multiple choice quizzes
- **Project**: GitHub repository submissions

---

## Database Statistics

| Collection   | Tables | Purpose              | Key Features                                 |
| ------------ | ------ | -------------------- | -------------------------------------------- |
| Users        | 5      | User management      | Role-based access, CV builder, gamification  |
| Courses      | 4      | Course catalog       | Instructor-owned, category-based, ratings    |
| Modules      | 1      | Curriculum structure | Ordered learning units                       |
| Lessons      | 1      | Learning content     | Multi-format support                         |
| Quiz System  | 6      | Assessments          | Questions, options, results, anti-cheat      |
| Enrollments  | 2      | Progress tracking    | One active course limit, completion tracking |
| Certificates | 1      | Achievements         | Unique IDs, immutable snapshots              |
| Community    | 4      | Social features      | Blog, forum, nested comments                 |

**Total**: 10 collections → 22 normalized tables

---

## Indexes & Performance

### Primary Indexes

- All `_id` fields (primary keys)
- `email` (unique constraint on Users)
- `certificateId` (unique constraint on Certificates)

### Foreign Key Indexes

- All foreign key relationships indexed
- Composite indexes for common queries:
  - `(user_id, completedAt)` on Enrollments
  - `(course_id, order_index)` on Modules
  - `(category, rating)` on Courses

### Performance Considerations

- Denormalized snapshots in Certificates (courseTitle, userName, instructorName)
- Embedded documents in MongoDB (Skills, Experience, Education)
- Indexed lookups for leaderboard queries

---

## Data Integrity Rules

1. **One Active Course**: Students can only enroll in one incomplete course at a time
2. **Sequential Unlocking**: Modules must be completed in order
3. **Immutable Certificates**: Certificate data is snapshot at generation time
4. **Cascade Deletes**: Deleting a course removes all related modules, lessons, and enrollments
5. **Soft Deletes**: User accounts retain enrollment history even after course deletion
