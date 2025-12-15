# Build To Learn LMS - Requirements Specification

## Functional Requirements

### 1. User Management

#### 1.1 Authentication & Authorization

- **FR-1.1.1**: System shall allow users to register with name, email, and password
- **FR-1.1.2**: System shall authenticate users using email and password
- **FR-1.1.3**: System shall support role-based access control (Public, Student, Instructor, Admin)
- **FR-1.1.4**: System shall maintain user sessions using JWT tokens
- **FR-1.1.5**: System shall allow users to logout and invalidate sessions

#### 1.2 User Profile Management

- **FR-1.2.1**: Users shall be able to update their profile (name, avatar, bio, headline)
- **FR-1.2.2**: Users shall be able to add and manage skills
- **FR-1.2.3**: Users shall be able to add work experience with company, role, dates, and description
- **FR-1.2.4**: Users shall be able to add education history
- **FR-1.2.5**: Users shall be able to add social media links (LinkedIn, GitHub, Twitter, Website)
- **FR-1.2.6**: Users shall be able to generate and download a professional CV

### 2. Course Management

#### 2.1 Course Creation (Instructor)

- **FR-2.1.1**: Instructors shall be able to create new courses with title, description, category, and thumbnail
- **FR-2.1.2**: Instructors shall be able to edit their own courses
- **FR-2.1.3**: Instructors shall be able to delete their own courses
- **FR-2.1.4**: Instructors shall be able to add modules to courses
- **FR-2.1.5**: Instructors shall be able to reorder modules

#### 2.2 Module & Lesson Management

- **FR-2.2.1**: Instructors shall be able to add lessons to modules
- **FR-2.2.2**: System shall support multiple lesson types: Video, Text, MCQ, Project
- **FR-2.2.3**: Instructors shall be able to upload video URLs for video lessons
- **FR-2.2.4**: Instructors shall be able to write markdown content for text lessons
- **FR-2.2.5**: Instructors shall be able to create MCQ questions with multiple options
- **FR-2.2.6**: Instructors shall be able to configure quiz settings (time limit, passing score, shuffle)
- **FR-2.2.7**: Instructors shall be able to create project assignments with submission requirements

#### 2.3 Course Discovery (Student)

- **FR-2.3.1**: Students shall be able to browse all available courses
- **FR-2.3.2**: Students shall be able to search courses by title or description
- **FR-2.3.3**: Students shall be able to filter courses by category
- **FR-2.3.4**: Students shall be able to view course details including modules and lessons
- **FR-2.3.5**: System shall display course metadata (instructor, enrolled count, rating)

### 3. Enrollment & Learning

#### 3.1 Course Enrollment

- **FR-3.1.1**: Students shall be able to enroll in courses
- **FR-3.1.2**: System shall enforce one active enrollment limit per student
- **FR-3.1.3**: System shall track enrollment date and progress
- **FR-3.1.4**: Students shall be able to view their active enrollments on dashboard

#### 3.2 Learning Experience

- **FR-3.2.1**: Students shall access a dedicated learning interface for enrolled courses
- **FR-3.2.2**: System shall display video lessons using an embedded player
- **FR-3.2.3**: System shall render text lessons with markdown formatting
- **FR-3.2.4**: System shall provide interactive MCQ quizzes
- **FR-3.2.5**: System shall allow project submission via GitHub repository URLs
- **FR-3.2.6**: System shall implement progressive module unlocking (sequential access)
- **FR-3.2.7**: System shall auto-resume to the last incomplete lesson

#### 3.3 Progress Tracking

- **FR-3.3.1**: System shall track completed modules per enrollment
- **FR-3.3.2**: System shall calculate and display course completion percentage
- **FR-3.3.3**: System shall mark modules as complete when all lessons are finished
- **FR-3.3.4**: System shall update enrollment status upon course completion

### 4. Assessment & Evaluation

#### 4.1 Quiz System

- **FR-4.1.1**: System shall present quiz questions to students
- **FR-4.1.2**: System shall support single-choice, multiple-choice, and text-answer questions
- **FR-4.1.3**: System shall automatically grade MCQ submissions
- **FR-4.1.4**: System shall calculate quiz scores and pass/fail status
- **FR-4.1.5**: System shall store quiz results with timestamp
- **FR-4.1.6**: System shall display correct answers and explanations after submission

#### 4.2 Anti-Cheat System

- **FR-4.2.1**: System shall detect and log tab switching during quizzes
- **FR-4.2.2**: System shall detect and prevent paste operations during quizzes
- **FR-4.2.3**: System shall store cheating flags with quiz results
- **FR-4.2.4**: System shall notify instructors of suspicious quiz attempts

#### 4.3 Project Evaluation

- **FR-4.3.1**: Students shall submit project URLs
- **FR-4.3.2**: System shall store project submissions with timestamps
- **FR-4.3.3**: Instructors shall be able to review project submissions

### 5. Certification

#### 5.1 Certificate Generation

- **FR-5.1.1**: System shall generate certificates upon course completion
- **FR-5.1.2**: Each certificate shall have a unique verification ID
- **FR-5.1.3**: Certificates shall include immutable snapshots (course title, user name, instructor name)
- **FR-5.1.4**: System shall store issue date for each certificate

#### 5.2 Certificate Management

- **FR-5.2.1**: Students shall be able to view all earned certificates
- **FR-5.2.2**: Students shall be able to access certificate details via unique URL
- **FR-5.2.3**: Certificates shall be publicly verifiable via certificate ID
- **FR-5.2.4**: System shall display certificates on user dashboard

### 6. Gamification

#### 6.1 Points System

- **FR-6.1.1**: System shall award points for completing modules
- **FR-6.1.2**: System shall award points for completing courses
- **FR-6.1.3**: System shall award points for project submissions
- **FR-6.1.4**: System shall maintain cumulative point totals per user

#### 6.2 Leaderboard

- **FR-6.2.1**: System shall display top 10 students by points
- **FR-6.2.2**: Leaderboard shall show user name, avatar, and total points
- **FR-6.2.3**: Leaderboard shall update in real-time as points are earned

### 7. Community Features

#### 7.1 Forum & Blog

- **FR-7.1.1**: Users shall be able to create forum posts
- **FR-7.1.2**: Users shall be able to create blog articles
- **FR-7.1.3**: Posts shall support markdown formatting
- **FR-7.1.4**: Users shall be able to add tags to posts
- **FR-7.1.5**: Users shall be able to upload cover images for posts

#### 7.2 Engagement

- **FR-7.2.1**: Users shall be able to upvote/downvote posts
- **FR-7.2.2**: Users shall be able to comment on posts
- **FR-7.2.3**: Users shall be able to reply to comments (nested threading)
- **FR-7.2.4**: System shall track post view counts

### 8. File Management

#### 8.1 File Upload

- **FR-8.1.1**: System shall support image uploads for avatars, thumbnails, and post covers
- **FR-8.1.2**: System shall integrate with Cloudinary for CDN delivery
- **FR-8.1.3**: System shall fallback to local storage if Cloudinary is unavailable
- **FR-8.1.4**: System shall validate file types (JPEG, PNG, GIF)
- **FR-8.1.5**: System shall enforce file size limits (5MB)

### 9. Admin Functions

#### 9.1 User Management

- **FR-9.1.1**: Admins shall be able to view all users
- **FR-9.1.2**: Admins shall be able to update user roles
- **FR-9.1.3**: Admins shall be able to view system statistics (total users, courses, students, instructors)

#### 9.2 Content Moderation

- **FR-9.2.1**: Admins shall be able to delete inappropriate posts
- **FR-9.2.2**: Admins shall be able to delete courses
- **FR-9.2.3**: Admins shall be able to review flagged quiz attempts

---

## Non-Functional Requirements

### 1. Performance

#### 1.1 Response Time

- **NFR-1.1.1**: API endpoints shall respond within 200ms for 95% of requests
- **NFR-1.1.2**: Page load time shall not exceed 3 seconds on standard broadband
- **NFR-1.1.3**: Database queries shall execute within 100ms for indexed lookups
- **NFR-1.1.4**: Video player shall start streaming within 2 seconds

#### 1.2 Throughput

- **NFR-1.2.1**: System shall support 1000 concurrent users
- **NFR-1.2.2**: System shall handle 100 requests per second
- **NFR-1.2.3**: Database shall support 500 read operations per second

#### 1.3 Scalability

- **NFR-1.3.1**: Frontend shall be horizontally scalable (stateless instances)
- **NFR-1.3.2**: Backend shall support horizontal scaling via load balancer
- **NFR-1.3.3**: Database shall support replica sets for read scaling

### 2. Security

#### 2.1 Authentication & Authorization

- **NFR-2.1.1**: Passwords shall be hashed using bcrypt with salt rounds ≥ 10
- **NFR-2.1.2**: JWT tokens shall expire after 7 days
- **NFR-2.1.3**: System shall use HTTPS for all communications
- **NFR-2.1.4**: Sensitive data shall never be logged or exposed in error messages

#### 2.2 Attack Prevention

- **NFR-2.2.1**: System shall implement rate limiting (5 requests per 10 seconds per IP)
- **NFR-2.2.2**: System shall detect and block malicious bots
- **NFR-2.2.3**: System shall prevent SQL injection via parameterized queries
- **NFR-2.2.4**: System shall prevent XSS attacks via input sanitization
- **NFR-2.2.5**: System shall implement CSRF protection

#### 2.3 Data Protection

- **NFR-2.3.1**: User passwords shall never be stored in plain text
- **NFR-2.3.2**: Personal data shall be encrypted at rest
- **NFR-2.3.3**: System shall comply with data privacy regulations (GDPR)

### 3. Reliability

#### 3.1 Availability

- **NFR-3.1.1**: System shall maintain 99.5% uptime
- **NFR-3.1.2**: Planned maintenance shall not exceed 4 hours per month
- **NFR-3.1.3**: System shall gracefully handle database connection failures

#### 3.2 Fault Tolerance

- **NFR-3.2.1**: System shall recover from crashes within 5 minutes
- **NFR-3.2.2**: Failed transactions shall be rolled back automatically
- **NFR-3.2.3**: System shall log all errors for debugging

#### 3.3 Data Integrity

- **NFR-3.3.1**: Database shall enforce referential integrity via foreign keys
- **NFR-3.3.2**: Enrollment data shall remain consistent during concurrent updates
- **NFR-3.3.3**: Certificate data shall be immutable after generation

### 4. Usability

#### 4.1 User Interface

- **NFR-4.1.1**: UI shall be responsive and work on mobile, tablet, and desktop
- **NFR-4.1.2**: UI shall follow WCAG 2.1 Level AA accessibility guidelines
- **NFR-4.1.3**: UI shall provide clear error messages and validation feedback
- **NFR-4.1.4**: UI shall use consistent design language (Shadcn UI components)

#### 4.2 User Experience

- **NFR-4.2.1**: Navigation shall be intuitive with no more than 3 clicks to any feature
- **NFR-4.2.2**: Forms shall provide real-time validation
- **NFR-4.2.3**: System shall provide loading indicators for async operations
- **NFR-4.2.4**: System shall display success/error toasts for user actions

#### 4.3 Learnability

- **NFR-4.3.1**: New users shall be able to enroll in a course within 5 minutes
- **NFR-4.3.2**: Instructors shall be able to create a course within 15 minutes
- **NFR-4.3.3**: System shall provide help documentation

### 5. Maintainability

#### 5.1 Code Quality

- **NFR-5.1.1**: Code shall follow consistent style guidelines (ESLint, Prettier)
- **NFR-5.1.2**: Functions shall be modular and reusable
- **NFR-5.1.3**: Code shall include inline comments for complex logic
- **NFR-5.1.4**: Code shall achieve 80% test coverage

#### 5.2 Documentation

- **NFR-5.2.1**: API endpoints shall be documented with request/response examples
- **NFR-5.2.2**: Database schema shall be documented with ER diagrams
- **NFR-5.2.3**: Architecture shall be documented with high-level and low-level designs
- **NFR-5.2.4**: README shall include setup and deployment instructions

#### 5.3 Modularity

- **NFR-5.3.1**: Backend shall follow modular architecture (separate modules per feature)
- **NFR-5.3.2**: Frontend shall use component-based architecture
- **NFR-5.3.3**: Business logic shall be separated from presentation logic

### 6. Portability

#### 6.1 Platform Independence

- **NFR-6.1.1**: Frontend shall run on all modern browsers (Chrome, Firefox, Safari, Edge)
- **NFR-6.1.2**: Backend shall run on any platform supporting Node.js 18+
- **NFR-6.1.3**: Database shall be deployable on MongoDB Atlas or self-hosted

#### 6.2 Deployment

- **NFR-6.2.1**: Application shall be containerized using Docker
- **NFR-6.2.2**: Application shall support deployment on Vercel, AWS, or DigitalOcean
- **NFR-6.2.3**: Environment configuration shall use .env files

### 7. Compatibility

#### 7.1 Browser Support

- **NFR-7.1.1**: System shall support Chrome 90+
- **NFR-7.1.2**: System shall support Firefox 88+
- **NFR-7.1.3**: System shall support Safari 14+
- **NFR-7.1.4**: System shall support Edge 90+

#### 7.2 Device Support

- **NFR-7.2.1**: System shall be responsive on screens from 320px to 4K
- **NFR-7.2.2**: System shall support touch interactions on mobile devices
- **NFR-7.2.3**: System shall optimize images for different screen densities

### 8. Compliance

#### 8.1 Legal

- **NFR-8.1.1**: System shall comply with GDPR for EU users
- **NFR-8.1.2**: System shall comply with COPPA for users under 13
- **NFR-8.1.3**: System shall provide terms of service and privacy policy

#### 8.2 Standards

- **NFR-8.2.1**: API shall follow REST architectural principles
- **NFR-8.2.2**: Code shall follow JavaScript ES6+ standards
- **NFR-8.2.3**: Database design shall follow normalization principles

---

## Constraints

### Technical Constraints

- **C-1**: Frontend must use Next.js 16 with App Router
- **C-2**: Backend must use Node.js with Express.js
- **C-3**: Database must be MongoDB
- **C-4**: Security must integrate Arcjet for bot detection and rate limiting

### Business Constraints

- **C-5**: Students can only enroll in one active course at a time
- **C-6**: Modules must be completed sequentially (progressive unlocking)
- **C-7**: Certificates are immutable once generated

### Resource Constraints

- **C-8**: File uploads limited to 5MB
- **C-9**: Video hosting must use external URLs (YouTube, Vimeo)
- **C-10**: Free tier Cloudinary account (storage limits apply)

---

## Assumptions

- **A-1**: Users have stable internet connection for video streaming
- **A-2**: Instructors provide valid video URLs (YouTube, Vimeo)
- **A-3**: Users have modern browsers with JavaScript enabled
- **A-4**: MongoDB Atlas or local MongoDB instance is available
- **A-5**: Arcjet API key is provided for security features

---

_Build To Learn LMS - Requirements Specification v2.0_
