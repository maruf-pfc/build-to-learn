# Build To Learn LMS - Low-Level Architecture

## Detailed Component Design

This document provides in-depth technical specifications for each system component.

---

## 1. Frontend Architecture

### 1.1 Next.js App Router Structure

```
client/src/app/
├── layout.jsx                    # Root layout with Providers
├── page.jsx                      # Landing page
│
├── (auth)/                       # Authentication group
│   ├── layout.jsx               # Auth layout (no navbar/footer)
│   ├── login/page.jsx
│   └── register/page.jsx
│
├── (dashboard)/                  # Protected dashboard group
│   ├── layout.jsx               # Dashboard layout with Sidebar
│   ├── dashboard/page.jsx       # Main dashboard
│   ├── profile/page.jsx         # User profile
│   ├── leaderboard/page.jsx     # Gamification leaderboard
│   ├── cv-builder/page.jsx      # CV generator
│   └── instructor/              # Instructor-specific pages
│       ├── create-course/page.jsx
│       └── edit-course/[id]/page.jsx
│
├── (public)/                     # Public pages group
│   ├── layout.jsx               # Public layout with Navbar/Footer
│   ├── courses/
│   │   ├── page.jsx            # Course catalog
│   │   └── [id]/page.jsx       # Course details
│   ├── blog/
│   │   ├── page.jsx            # Blog list
│   │   └── [id]/page.jsx       # Blog post
│   ├── forum/
│   │   ├── page.jsx            # Forum list
│   │   └── [id]/page.jsx       # Forum thread
│   ├── certificate/[id]/page.jsx
│   ├── about/page.jsx
│   ├── contact/page.jsx
│   └── help/page.jsx
│
└── learning/[courseId]/          # Dedicated learning interface
    ├── layout.jsx               # Full-screen layout
    └── page.jsx                 # Learning player
```

### 1.2 State Management (Zustand)

#### useAuthStore

```javascript
{
  user: {
    _id, name, email, role, avatar, points,
    enrolledCourses: [{ course, progress, completedModules }]
  },
  isAuthenticated: boolean,
  isLoading: boolean,

  // Actions
  login(email, password),
  register(userData),
  logout(),
  checkAuth(),
  updateProfile(data)
}
```

#### useCourseStore

```javascript
{
  courses: [],
  currentCourse: null,
  filters: { search, category, level },

  // Actions
  fetchCourses(params),
  getCourseById(id),
  createCourse(data),
  updateCourse(id, data),
  enrollCourse(id)
}
```

### 1.3 API Client Layer

```javascript
// lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (add auth token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor (handle errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

### 1.4 Component Architecture

#### Learning Page Component Hierarchy

```
LearningPage
├── Header
│   ├── BackButton
│   ├── CourseTitle
│   └── SidebarToggle
│
├── ContentArea (ScrollArea)
│   ├── LessonTitle
│   ├── LessonMeta (Badge, progress)
│   └── ContentPlayer
│       ├── VideoPlayer (react-player)
│       ├── TextLesson (ReactMarkdown)
│       ├── MCQPlayer
│       └── ProjectSubmission
│
├── NavigationBar (fixed bottom)
│   ├── PreviousButton
│   ├── CertificateButton (conditional)
│   └── NextButton / CompleteButton
│
└── Sidebar (fixed right)
    ├── SidebarHeader
    ├── ModuleList (ScrollArea)
    │   └── ModuleCard[]
    │       ├── ModuleHeader (title, status)
    │       └── LessonList
    │           └── LessonButton[]
    └── ProgressFooter
```

---

## 2. Backend Architecture

### 2.1 Express Server Structure

```javascript
// server/src/app.js
const express = require("express");
const app = express();

// 1. Global Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// 2. Security Middleware
app.use(arcjetMiddleware);

// 3. Static Files
app.use("/uploads", express.static("uploads"));

// 4. API Routes
app.use("/api/v1", routes);

// 5. Error Handling
app.use(errorHandler);
```

### 2.2 Module Pattern

Each module follows this structure:

```
module/
├── module.model.js       # Mongoose schema
├── module.controller.js  # Request handlers
├── module.service.js     # Business logic (optional)
├── module.routes.js      # Route definitions
└── module.validation.js  # Input validation (optional)
```

#### Example: Course Module

**course.model.js**

```javascript
const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: String,
    instructor: { type: ObjectId, ref: "User", required: true },
    students: [{ type: ObjectId, ref: "User" }],
    enrolledCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);
```

**course.controller.js**

```javascript
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name")
      .populate("students", "name");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const modules = await Module.find({ course: req.params.id }).sort("order");

    res.json({ ...course.toObject(), modules });
  } catch (err) {
    next(err);
  }
};
```

**course.routes.js**

```javascript
const router = require("express").Router();
const controller = require("./course.controller");
const { auth } = require("../../middlewares/auth.middleware");

router.get("/", controller.getAllCourses);
router.get("/:id", controller.getCourseById);
router.post("/", auth, controller.createCourse);
router.put("/:id", auth, controller.updateCourse);
router.post("/:id/enroll", auth, controller.enrollCourse);
router.post(
  "/:id/modules/:moduleId/complete",
  auth,
  controller.markModuleCompleted
);

module.exports = router;
```

### 2.3 Authentication Middleware

```javascript
// middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
const User = require("../modules/users/user.model");

exports.auth = async (req, res, next) => {
  try {
    // Extract token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token verification failed" });
  }
};
```

### 2.4 Arcjet Security Middleware

```javascript
// middlewares/arcjet.middleware.js
const arcjet = require("@arcjet/node").default;

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield against common attacks
    shield({ mode: "LIVE" }),

    // Bot detection
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    // Rate limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

module.exports = async (req, res, next) => {
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return res.status(429).json({ message: "Too many requests" });
    }
    if (decision.reason.isBot()) {
      return res.status(403).json({ message: "Bot detected" });
    }
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};
```

---

## 3. Database Design Patterns

### 3.1 Embedding vs Referencing

#### Embedded Documents (1-to-Few)

```javascript
// User skills (few items, rarely queried independently)
User: {
  skills: ['JavaScript', 'React', 'Node.js']
}

// Module lessons (always loaded with module)
Module: {
  subModules: [
    { title: 'Intro', type: 'video', videoUrl: '...' },
    { title: 'Quiz', type: 'mcq', questions: [...] }
  ]
}
```

#### Referenced Documents (1-to-Many)

```javascript
// Course modules (many items, queried independently)
Course: {
  _id: '...',
  title: 'React Course'
}

Module: {
  _id: '...',
  course: ObjectId('...'),  // Reference
  title: 'Module 1'
}
```

### 3.2 Denormalization for Performance

```javascript
// Certificate stores snapshots to avoid joins
Certificate: {
  user: ObjectId('...'),
  course: ObjectId('...'),
  courseTitle: 'React Masterclass',      // Snapshot
  userName: 'John Doe',                  // Snapshot
  instructorName: 'Jane Smith',          // Snapshot
  issueDate: Date
}
```

### 3.3 Indexing Strategy

```javascript
// Compound index for common queries
CourseSchema.index({ category: 1, rating: -1 });

// Text index for search
CourseSchema.index({ title: "text", description: "text" });

// Unique constraint
UserSchema.index({ email: 1 }, { unique: true });
```

---

## 4. API Design

### 4.1 RESTful Endpoints

#### Authentication

```
POST   /api/v1/auth/register       # Register new user
POST   /api/v1/auth/login          # Login user
GET    /api/v1/auth/me             # Get current user
POST   /api/v1/auth/logout         # Logout user
```

#### Courses

```
GET    /api/v1/courses                    # List all courses (with filters)
GET    /api/v1/courses/:id                # Get course details
POST   /api/v1/courses                    # Create course (instructor)
PUT    /api/v1/courses/:id                # Update course (instructor)
DELETE /api/v1/courses/:id                # Delete course (instructor)
POST   /api/v1/courses/:id/enroll         # Enroll in course (student)
```

#### Modules

```
POST   /api/v1/courses/:id/modules                    # Add module
PUT    /api/v1/courses/:id/modules/:moduleId          # Update module
DELETE /api/v1/courses/:id/modules/:moduleId          # Delete module
POST   /api/v1/courses/:id/modules/:moduleId/complete # Mark complete
```

#### Certificates

```
GET    /api/v1/certificates/my             # Get user's certificates
GET    /api/v1/certificates/:id            # Get certificate by ID
POST   /api/v1/certificates/generate       # Generate certificate
```

### 4.2 Request/Response Format

#### Success Response

```json
{
  "data": { ... },
  "message": "Success"
}
```

#### Error Response

```json
{
  "message": "Error description",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

#### Pagination

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## 5. Design Patterns

### 5.1 Controller-Service Pattern

```javascript
// Controller handles HTTP
exports.createCourse = async (req, res, next) => {
  try {
    const course = await courseService.create(req.body, req.user.id);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

// Service handles business logic
courseService.create = async (data, instructorId) => {
  // Validation
  if (!data.title) throw new Error("Title required");

  // Business logic
  const course = await Course.create({
    ...data,
    instructor: instructorId,
  });

  return course;
};
```

### 5.2 Middleware Chain Pattern

```javascript
router.post(
  "/courses",
  auth, // Authentication
  validateCourse, // Validation
  checkInstructorRole, // Authorization
  controller.createCourse // Handler
);
```

### 5.3 Repository Pattern (Optional)

```javascript
class CourseRepository {
  async findById(id) {
    return Course.findById(id).populate("instructor");
  }

  async findWithFilters(filters) {
    const query = {};
    if (filters.category) query.category = filters.category;
    return Course.find(query);
  }
}
```

---

## 6. Error Handling

### 6.1 Custom Error Classes

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}
```

### 6.2 Global Error Handler

```javascript
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Development mode
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  // Production mode
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Programming errors - don't leak details
  console.error("ERROR:", err);
  res.status(500).json({ message: "Something went wrong" });
};
```

---

## 7. File Upload System

### 7.1 Multer Configuration

```javascript
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  },
});
```

### 7.2 Cloudinary Integration

```javascript
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "lms_platform",
  });

  // Delete local file
  fs.unlinkSync(req.file.path);

  res.json({
    url: result.secure_url,
    public_id: result.public_id,
  });
};
```

---

## 8. Testing Strategy

### 8.1 Unit Tests (Jest)

```javascript
describe("Course Controller", () => {
  test("should create course", async () => {
    const mockCourse = { title: "Test Course" };
    Course.create = jest.fn().mockResolvedValue(mockCourse);

    const result = await courseController.createCourse(mockReq, mockRes);
    expect(result.title).toBe("Test Course");
  });
});
```

### 8.2 Integration Tests

```javascript
describe("POST /api/v1/courses", () => {
  test("should create course with valid data", async () => {
    const response = await request(app)
      .post("/api/v1/courses")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Course", description: "..." });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("New Course");
  });
});
```

---

_Build To Learn LMS - Low-Level Architecture v2.0_
