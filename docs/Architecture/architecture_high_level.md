# Build To Learn LMS - High-Level Architecture

## System Overview

Build To Learn is a full-stack Learning Management System built with a modern microservices-inspired architecture, utilizing Next.js for the frontend and Node.js/Express for the backend, with MongoDB as the primary database.

---

## Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        Mobile[Mobile Browser]
    end

    subgraph "Frontend - Next.js 16"
        NextApp[Next.js App Router]
        Pages[Pages & Layouts]
        Components[React Components]
        StateManagement[Zustand Store]
        APIClient[API Client]
    end

    subgraph "Security Layer"
        Arcjet[Arcjet Security]
        RateLimit[Rate Limiter]
        BotDetection[Bot Detection]
        Shield[Attack Shield]
    end

    subgraph "Backend - Node.js/Express"
        ExpressApp[Express Server]
        Routes[API Routes]
        Controllers[Controllers]
        Middleware[Middleware]
        Services[Business Logic]
    end

    subgraph "Data Layer"
        MongoDB[(MongoDB)]
        FileStorage[File Storage]
        Cloudinary[Cloudinary CDN]
    end

    subgraph "External Services"
        Email[Email Service]
        Analytics[Analytics]
    end

    Browser --> NextApp
    Mobile --> NextApp
    NextApp --> Pages
    Pages --> Components
    Components --> StateManagement
    StateManagement --> APIClient

    APIClient --> Arcjet
    Arcjet --> RateLimit
    Arcjet --> BotDetection
    Arcjet --> Shield

    Arcjet --> ExpressApp
    ExpressApp --> Routes
    Routes --> Middleware
    Middleware --> Controllers
    Controllers --> Services

    Services --> MongoDB
    Services --> FileStorage
    FileStorage --> Cloudinary

    Services -.-> Email
    Services -.-> Analytics
```

---

## Technology Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES6+)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Component Library**: Shadcn UI (Radix Primitives)
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Media Player**: react-player
- **Markdown**: react-markdown

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Security**: Arcjet, Helmet, CORS

### Infrastructure

- **Database**: MongoDB Atlas / Local MongoDB
- **File Storage**: Cloudinary (images) / Local storage (fallback)
- **Security**: Arcjet (bot detection, rate limiting, attack shield)

---

## Core Components

### 1. Frontend Architecture

#### App Router Structure

```
app/
├── (auth)/          # Authentication routes
├── (dashboard)/     # Protected dashboard routes
├── (public)/        # Public-facing pages
├── learning/        # Dedicated learning interface
└── layout.jsx       # Root layout
```

#### State Management

- **Zustand Stores**:
  - `useAuthStore`: User authentication state
  - `useCourseStore`: Course catalog and details
  - Global state for UI preferences

#### Component Hierarchy

```
Layout Components
├── Navbar (Public)
├── Sidebar (Dashboard)
└── Footer

Feature Components
├── CourseCard
├── ModuleList
├── LessonPlayer
├── MCQPlayer
└── CertificateView

UI Components (Shadcn)
├── Button, Input, Card
├── Dialog, Sheet, Tabs
└── ScrollArea, Badge
```

### 2. Backend Architecture

#### Module Structure

```
modules/
├── auth/            # Authentication & authorization
├── users/           # User management
├── course/          # Course CRUD operations
├── certificate/     # Certificate generation
├── forum/           # Community forum
├── community/       # Blog posts
├── gamification/    # Leaderboard & points
├── admin/           # Admin operations
└── upload/          # File upload handling
```

#### Middleware Stack

1. **Arcjet Security** (bot detection, rate limiting, shield)
2. **CORS** (cross-origin resource sharing)
3. **Helmet** (security headers)
4. **Morgan** (logging)
5. **Authentication** (JWT verification)
6. **Error Handling** (centralized error responses)

### 3. Database Architecture

#### Collections (10)

1. **Users** - User accounts and profiles
2. **Courses** - Course catalog
3. **Modules** - Course curriculum units
4. **QuizResults** - Quiz attempt tracking
5. **Certificates** - Achievement certificates
6. **Posts** - Forum and blog posts
7. **Comments** - Nested comment threads
8. **Enrollments** - Embedded in Users
9. **Skills/Experience/Education** - Embedded in Users
10. **Quiz Questions/Options** - Embedded in Modules

---

## Data Flow

### 1. User Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Arcjet
    participant Backend
    participant MongoDB

    User->>Frontend: Login Request
    Frontend->>Arcjet: API Call
    Arcjet->>Arcjet: Rate Limit Check
    Arcjet->>Backend: Forward Request
    Backend->>MongoDB: Verify Credentials
    MongoDB-->>Backend: User Data
    Backend->>Backend: Generate JWT
    Backend-->>Frontend: JWT Token
    Frontend->>Frontend: Store in Zustand
    Frontend-->>User: Redirect to Dashboard
```

### 2. Course Enrollment Flow

```mermaid
sequenceDiagram
    participant Student
    participant Frontend
    participant Backend
    participant MongoDB

    Student->>Frontend: Click Enroll
    Frontend->>Backend: POST /courses/:id/enroll
    Backend->>MongoDB: Check Active Enrollments
    MongoDB-->>Backend: Enrollment Count
    Backend->>Backend: Validate (max 1 active)
    Backend->>MongoDB: Create Enrollment
    Backend->>MongoDB: Update Course.enrolledCount
    MongoDB-->>Backend: Success
    Backend-->>Frontend: Enrollment Created
    Frontend->>Frontend: Update Auth Store
    Frontend-->>Student: Redirect to Learning Page
```

### 3. Quiz Submission Flow

```mermaid
sequenceDiagram
    participant Student
    participant Frontend
    participant Backend
    participant MongoDB

    Student->>Frontend: Submit Quiz
    Frontend->>Backend: POST /courses/:id/modules/:moduleId/submit-mcq
    Backend->>MongoDB: Fetch Quiz Questions
    MongoDB-->>Backend: Questions with Answers
    Backend->>Backend: Calculate Score
    Backend->>Backend: Check Cheating Flags
    Backend->>MongoDB: Save QuizResult
    Backend->>MongoDB: Update User Points
    MongoDB-->>Backend: Success
    Backend-->>Frontend: Score & Pass/Fail
    Frontend-->>Student: Show Results
```

---

## Security Architecture

### 1. Arcjet Security Layer

- **Bot Detection**: Blocks malicious bots, allows search engines
- **Rate Limiting**: Token bucket algorithm (5 req/10s, capacity 10)
- **Shield**: Protection against SQL injection, XSS, CSRF

### 2. Authentication & Authorization

- **JWT Tokens**: Stored in HTTP-only cookies
- **Role-Based Access**: Public, Student, Instructor, Admin
- **Protected Routes**: Middleware checks for valid JWT

### 3. Data Validation

- **Backend**: express-validator for input sanitization
- **Frontend**: React Hook Form with Zod schemas
- **Database**: Mongoose schema validation

---

## Scalability Considerations

### Horizontal Scaling

- **Frontend**: Stateless Next.js instances (Vercel/Docker)
- **Backend**: Multiple Express instances behind load balancer
- **Database**: MongoDB replica sets for read scaling

### Caching Strategy

- **Frontend**: Next.js static generation for public pages
- **Backend**: Redis cache for frequently accessed data (future)
- **CDN**: Cloudinary for image/video delivery

### Performance Optimization

- **Code Splitting**: Next.js automatic code splitting
- **Lazy Loading**: React.lazy for heavy components
- **Database Indexes**: Optimized queries on frequently accessed fields
- **Image Optimization**: Next.js Image component

---

## Deployment Architecture

```mermaid
graph LR
    subgraph "Production Environment"
        LB[Load Balancer]

        subgraph "Frontend Cluster"
            Next1[Next.js Instance 1]
            Next2[Next.js Instance 2]
        end

        subgraph "Backend Cluster"
            API1[Express Instance 1]
            API2[Express Instance 2]
        end

        subgraph "Data Layer"
            MongoDB[(MongoDB Replica Set)]
            CDN[Cloudinary CDN]
        end
    end

    LB --> Next1
    LB --> Next2
    Next1 --> API1
    Next2 --> API2
    API1 --> MongoDB
    API2 --> MongoDB
    API1 --> CDN
    API2 --> CDN
```

---

## Monitoring & Logging

### Application Monitoring

- **Morgan**: HTTP request logging
- **Console Logs**: Error tracking and debugging
- **Arcjet Inspect**: Security event monitoring

### Performance Metrics

- **Response Times**: API endpoint latency
- **Database Queries**: Slow query detection
- **Error Rates**: 4xx/5xx response tracking

---

## Future Enhancements

1. **Microservices Migration**: Separate services for auth, courses, certificates
2. **Redis Caching**: Session storage and query caching
3. **WebSocket Integration**: Real-time notifications and chat
4. **GraphQL API**: Alternative to REST for flexible queries
5. **Kubernetes Deployment**: Container orchestration
6. **CI/CD Pipeline**: Automated testing and deployment

---

_Build To Learn LMS - High-Level Architecture v2.0_
