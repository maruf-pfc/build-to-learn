# Build To Learn - Advanced Learning Management System (LMS)

**Build To Learn** is a modern, full-stack Learning Management System designed to provide a premium educational experience. It connects students with high-quality courses while offering instructors powerful tools to manage content and track progress. The platform features role-based access, interactive learning modules, gamification, and automated certification.

## 🚀 Features

### 🎓 For Students

- **Interactive Learning Classroom:**
  - Split-view interface with video/text content on the left and curriculum sidebar on the right.
  - Support for Video Lessons (`react-player`), Rich Text Documentation (`react-markdown`), and Interactive Quizzes (MCQ).
  - **Progressive Unlocking:** Modules remain locked until previous requirements are met.
  - **Auto-Resume:** Smartly returns you to your last active lesson.
- **Dashboard:** real-time overview of active enrollments, progress bars, and achieved certificates.
- **Gamification:** Earn generic **Points** for completing lessons and modules. View your ranking on the global **Leaderboard**.
- **Certification:** Automatically generate unique, verifiable certificates upon course completion.
- **CV Builder:** Create a professional profile with skills, education, and experience, exportable as a CV.

### 👨‍🏫 For Instructors

- **Course Studio:** Create and manage courses with rich metadata (Categories, Thumbnails, Descriptions).
- **Curriculum Builder:** Drag-and-drop style organization of Modules and Lessons.
- **Analytics Dashboard:** Track total students, course popularity, and estimated earnings.

### 🛡️ System & Security

- **Role-Based Authentication:** Secure JWT-based auth handling Students, Instructors, and Admins.
- **Arcjet Security Shield:**
  - **Bot Detection:** Blocks malicious bots while allowing search engines.
  - **Rate Limiting:** Protects API endpoints from abuse (Token Bucket algorithm).
  - **Attack Protection:** Shields against common SQL injection and XSS attacks.
- **Validation:** Strict backend validation using `express-validator` and Mongoose schemas.

## 🛠️ Technology Stack

### Frontend (Client)

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons:** Lucide React
- **Media:** `react-player` (Video), `react-markdown` (Docs)

### Backend (Server)

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
- **Security:** [Arcjet](https://arcjet.com/), Helmet, Corsair
- **Authentication:** `jsonwebtoken` (JWT), `bcryptjs`
- **File Uploads:** Multer (Local storage config)

## 📂 Project Structure

```bash
lms-platform/
├── client/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/            # App Router (Pages & Layouts)
│   │   │   ├── (auth)/     # Login/Register Routes
│   │   │   ├── (dashboard)/# Protected User Dashboard
│   │   │   ├── (public)/   # Landing, Course Details, etc.
│   │   │   └── learning/   # Dedicated Classroom Layout
│   │   ├── components/     # Reusable UI Components
│   │   ├── lib/            # Utilities (API client, cn helper)
│   │   └── store/          # Zustand Stores (useAuthStore)
│   └── public/             # Static Assets
│
├── server/                 # Express.js Backend Application
│   ├── src/
│   │   ├── config/         # DB Connection
│   │   ├── middlewares/    # Auth, Arcjet, Error Handling
│   │   ├── modules/        # Feature-based Architecture
│   │   │   ├── auth/       # Authentication Logic
│   │   │   ├── course/     # Course & Module Management
│   │   │   ├── users/      # User Profiles & Enrollments
│   │   │   └── certificate/# Certificate Generation
│   │   └── app.js          # App Entry Point
│   └── uploads/            # Local file storage
│
└── docs/                   # Documentation & Assets
```

## Database Schema

![Database Schema](https://drawsql.app/teams/mms-15/diagrams/build-to-learn)

## ⚡ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/maruf-pfc/build-to-learn.git
    cd build-to-learn
    ```

2.  **Setup Backend**

    ```bash
    cd server
    npm install
    ```

    - Create a `.env` file in `server/`:
      ```env
      PORT=3340
      MONGODB_URI=mongodb://localhost:27017/build-to-learn
      JWT_SECRET=your_super_secret_key
      ARCJET_KEY=ajkey_your_arcjet_key
      ```
    - Start the Server:
      ```bash
      npm run dev
      # Server runs on http://localhost:3340
      ```

3.  **Setup Frontend**
    ```bash
    cd client
    npm install
    ```
    - Create a `.env.local` file in `client/`:
      ```env
      NEXT_PUBLIC_API_URL=http://localhost:3340/api/v1
      ```
    - Start the Client:
      ```bash
      npm run dev
      # Client runs on http://localhost:3339
      ```

## 🔒 Security & Best Practices

- **Arcjet Integration:** The platform uses Arcjet middleware (`server/src/middlewares/arcjet.middleware.js`) to provide enterprise-grade security. It proactively blocks suspicious traffic and ensures fair usage via rate limiting.
- **Protected Routes:** Frontend routes utilize `CheckAuth` wrappers to prevent unauthorized access to dashboards and learning content.
- **Data Integrity:** Mongoose models use strict schemas with validation (e.g., unique emails, required fields) to ensure data consistency.
- **Error Handling:** Centralized error handling middleware on the server ensures consistent JSON responses for all failures.

**Developed by Maruf PFC** | _Full Stack LMS Solution_
