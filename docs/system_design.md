# Build To Learn LMS - System Design & Implementation

## Design Philosophy

Build To Learn follows modern web development best practices with a focus on:

- **Scalability**: Horizontal scaling capability
- **Maintainability**: Modular architecture with clear separation of concerns
- **Security**: Multi-layered security with Arcjet integration
- **Performance**: Optimized queries, caching, and code splitting
- **User Experience**: Responsive design, progressive enhancement

---

## System Design Decisions

### 1. Technology Choices

#### Why Next.js 16 (App Router)?

- **Server Components**: Reduced client-side JavaScript
- **File-based Routing**: Intuitive project structure
- **Built-in Optimization**: Image optimization, code splitting
- **SEO-Friendly**: Server-side rendering for public pages
- **Developer Experience**: Hot reload, TypeScript support

#### Why MongoDB over SQL?

- **Flexible Schema**: Easy to iterate on data models
- **Document Model**: Natural fit for nested data (modules, lessons)
- **Horizontal Scaling**: Sharding support for growth
- **JSON-Native**: Seamless integration with JavaScript stack
- **Rich Queries**: Powerful aggregation pipeline

#### Why Zustand over Redux?

- **Simplicity**: Minimal boilerplate
- **Performance**: No context provider overhead
- **TypeScript**: Excellent type inference
- **Size**: Lightweight (~1KB)
- **DevTools**: Built-in debugging support

---

## 2. Architecture Patterns

### 2.1 Frontend Patterns

#### Component Composition

```javascript
// Atomic Design Pattern
atoms/       # Button, Input, Badge
molecules/   # SearchBar, CourseCard
organisms/   # Navbar, CourseList
templates/   # PageLayout
pages/       # HomePage, CoursePage
```

#### Container-Presenter Pattern

```javascript
// Container (logic)
function CourseListContainer() {
  const { courses, loading } = useCourseStore();
  return <CourseListPresenter courses={courses} loading={loading} />;
}

// Presenter (UI)
function CourseListPresenter({ courses, loading }) {
  if (loading) return <Skeleton />;
  return courses.map((course) => <CourseCard key={course._id} {...course} />);
}
```

#### Custom Hooks Pattern

```javascript
// Reusable logic
function useEnrollment(courseId) {
  const [loading, setLoading] = useState(false);
  const { user, checkAuth } = useAuthStore();

  const enroll = async () => {
    setLoading(true);
    await api.post(`/courses/${courseId}/enroll`);
    await checkAuth(); // Refresh user data
    setLoading(false);
  };

  const isEnrolled = user?.enrolledCourses?.some((e) => e.course === courseId);

  return { enroll, isEnrolled, loading };
}
```

### 2.2 Backend Patterns

#### MVC Pattern (Modified)

```
Model       → Mongoose schemas (data layer)
Controller  → Request handlers (HTTP layer)
Service     → Business logic (optional layer)
Routes      → Endpoint definitions
```

#### Dependency Injection

```javascript
// Inject dependencies for testability
class CourseService {
  constructor(courseModel, moduleModel) {
    this.Course = courseModel;
    this.Module = moduleModel;
  }

  async getCourseWithModules(id) {
    const course = await this.Course.findById(id);
    const modules = await this.Module.find({ course: id });
    return { ...course.toObject(), modules };
  }
}

// Usage
const courseService = new CourseService(Course, Module);
```

---

## 3. Data Flow Architecture

### 3.1 Unidirectional Data Flow

```
User Action → Component → Zustand Action → API Call → Backend
                ↑                                        ↓
            Update UI ← Zustand State ← Response ← Database
```

### 3.2 Optimistic Updates

```javascript
// Update UI immediately, rollback on error
const enrollCourse = async (courseId) => {
  // Optimistic update
  const previousState = user.enrolledCourses;
  updateUser({ enrolledCourses: [...previousState, { course: courseId }] });

  try {
    await api.post(`/courses/${courseId}/enroll`);
  } catch (error) {
    // Rollback on error
    updateUser({ enrolledCourses: previousState });
    toast.error("Enrollment failed");
  }
};
```

---

## 4. Security Implementation

### 4.1 Defense in Depth

```
Layer 1: Arcjet (Bot detection, rate limiting, attack shield)
Layer 2: Authentication (JWT verification)
Layer 3: Authorization (Role-based access control)
Layer 4: Input Validation (express-validator)
Layer 5: Database (Mongoose schema validation)
```

### 4.2 OWASP Top 10 Mitigation

| Threat                        | Mitigation                                   |
| ----------------------------- | -------------------------------------------- |
| **Injection**                 | Mongoose sanitization, parameterized queries |
| **Broken Auth**               | JWT with HTTP-only cookies, bcrypt hashing   |
| **XSS**                       | React auto-escaping, Content Security Policy |
| **Broken Access Control**     | Role-based middleware, ownership checks      |
| **Security Misconfiguration** | Helmet.js, environment variables             |
| **Sensitive Data Exposure**   | HTTPS only, password hashing                 |
| **Insufficient Logging**      | Morgan logging, error tracking               |
| **CSRF**                      | SameSite cookies, CORS configuration         |
| **Vulnerable Dependencies**   | npm audit, Dependabot                        |
| **Insufficient Monitoring**   | Arcjet monitoring, error logs                |

### 4.3 Anti-Cheat System

```javascript
// Frontend: Track suspicious behavior
const [cheatingFlags, setCheatingFlags] = useState([]);

useEffect(() => {
  // Detect tab switching
  const handleBlur = () => {
    setCheatingFlags((prev) => [
      ...prev,
      {
        type: "blur",
        timestamp: new Date(),
      },
    ]);
  };

  // Detect paste events
  const handlePaste = (e) => {
    e.preventDefault();
    setCheatingFlags((prev) => [
      ...prev,
      {
        type: "paste",
        timestamp: new Date(),
      },
    ]);
  };

  window.addEventListener("blur", handleBlur);
  document.addEventListener("paste", handlePaste);

  return () => {
    window.removeEventListener("blur", handleBlur);
    document.removeEventListener("paste", handlePaste);
  };
}, []);

// Backend: Store and analyze flags
const submitQuiz = async (answers, cheatingFlags) => {
  const result = await QuizResult.create({
    student: userId,
    answers,
    cheatingFlags,
    score: calculateScore(answers),
  });

  // Flag for review if suspicious
  if (cheatingFlags.length > 5) {
    await notifyInstructor(courseId, userId);
  }
};
```

---

## 5. Performance Optimization

### 5.1 Frontend Optimization

#### Code Splitting

```javascript
// Lazy load heavy components
const MCQPlayer = lazy(() => import("@/components/course/MCQPlayer"));
const CertificateView = lazy(() => import("@/components/CertificateView"));

// Use with Suspense
<Suspense fallback={<Skeleton />}>
  <MCQPlayer />
</Suspense>;
```

#### Image Optimization

```javascript
// Next.js Image component
import Image from "next/image";

<Image
  src={course.thumbnail}
  alt={course.title}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
/>;
```

#### Memoization

```javascript
// Prevent unnecessary re-renders
const CourseCard = memo(({ course }) => {
  return <Card>...</Card>;
});

// Memoize expensive calculations
const sortedCourses = useMemo(() => {
  return courses.sort((a, b) => b.rating - a.rating);
}, [courses]);
```

### 5.2 Backend Optimization

#### Database Indexing

```javascript
// Compound index for common queries
CourseSchema.index({ category: 1, rating: -1 });
ModuleSchema.index({ course: 1, order: 1 });
UserSchema.index({ email: 1 }, { unique: true });
```

#### Query Optimization

```javascript
// Avoid N+1 queries with populate
const courses = await Course.find()
  .populate("instructor", "name avatar")
  .select("title description thumbnail rating")
  .lean(); // Convert to plain JavaScript objects

// Use projection to limit fields
const user = await User.findById(id).select("name email role");
```

#### Pagination

```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const courses = await Course.find().skip(skip).limit(limit);

const total = await Course.countDocuments();

res.json({
  data: courses,
  pagination: {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  },
});
```

---

## 6. Error Handling Strategy

### 6.1 Frontend Error Boundaries

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### 6.2 Backend Error Handling

```javascript
// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) throw new AppError("Course not found", 404);
    res.json(course);
  })
);
```

---

## 7. Testing Strategy

### 7.1 Testing Pyramid

```
        E2E Tests (10%)
       ↗              ↖
  Integration Tests (30%)
 ↗                        ↖
Unit Tests (60%)
```

### 7.2 Test Coverage Goals

- **Unit Tests**: 80% coverage
- **Integration Tests**: Critical paths (auth, enrollment, quiz)
- **E2E Tests**: User journeys (signup → enroll → complete → certificate)

---

## 8. Deployment Strategy

### 8.1 Environment Configuration

```bash
# Development
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lms_dev
JWT_SECRET=dev_secret

# Production
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<strong_random_secret>
ARCJET_KEY=<production_key>
```

### 8.2 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
      - run: npm run deploy
```

### 8.3 Docker Deployment

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3340
CMD ["node", "src/server.js"]
```

---

## 9. Monitoring & Observability

### 9.1 Logging Strategy

```javascript
// Structured logging
const logger = {
  info: (message, meta) =>
    console.log(
      JSON.stringify({ level: "info", message, meta, timestamp: new Date() })
    ),
  error: (message, error) =>
    console.error(
      JSON.stringify({
        level: "error",
        message,
        error: error.stack,
        timestamp: new Date(),
      })
    ),
};

// Usage
logger.info("User enrolled", { userId, courseId });
logger.error("Database connection failed", error);
```

### 9.2 Health Checks

```javascript
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});
```

---

## 10. Future Enhancements

### Phase 2 Features

- [ ] Real-time chat (Socket.io)
- [ ] Video conferencing (WebRTC)
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)
- [ ] Offline mode (PWA)

### Technical Debt

- [ ] Add comprehensive test suite
- [ ] Implement Redis caching
- [ ] Set up monitoring (Sentry, DataDog)
- [ ] Add GraphQL API
- [ ] Migrate to microservices

---

_Build To Learn LMS - System Design & Implementation v2.0_
