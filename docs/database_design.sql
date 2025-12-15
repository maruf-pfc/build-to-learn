-- ============================================================================
-- SECTION 1: USER MANAGEMENT
-- ============================================================================

-- 1. Users Table (Core user accounts and authentication)
CREATE TABLE Users (
    _id VARCHAR(24) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role ENUM('public', 'student', 'instructor', 'admin') DEFAULT 'public',
    
    -- Profile Information
    avatar VARCHAR(255),
    bio TEXT,
    headline VARCHAR(255),
    cv VARCHAR(255), -- URL to CV file
    
    -- Gamification
    points INT DEFAULT 0,
    
    -- Timestamps
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_points (points DESC)
);

-- 2. User Skills (Many-to-Many)
CREATE TABLE User_Skills (
    user_id VARCHAR(24) NOT NULL,
    skill VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, skill),
    FOREIGN KEY (user_id) REFERENCES Users(_id) ON DELETE CASCADE
);

-- 3. User Experience
CREATE TABLE User_Experience (
    _id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    company VARCHAR(255),
    role VARCHAR(255),
    startDate DATE,
    endDate DATE,
    description TEXT,
    current BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(_id) ON DELETE CASCADE,
    INDEX idx_experience_user (user_id)
);

-- 4. User Education
CREATE TABLE User_Education (
    _id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    school VARCHAR(255),
    degree VARCHAR(255),
    fieldOfStudy VARCHAR(255),
    startDate DATE,
    endDate DATE,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(_id) ON DELETE CASCADE,
    INDEX idx_education_user (user_id)
);

-- 5. User Social Links
CREATE TABLE User_Social_Links (
    user_id VARCHAR(24) PRIMARY KEY,
    website VARCHAR(255),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    twitter VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(_id) ON DELETE CASCADE
);

-- ============================================================================
-- SECTION 2: COURSE MANAGEMENT
-- ============================================================================

-- 6. Courses Table
CREATE TABLE Courses (
    _id VARCHAR(24) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    thumbnail VARCHAR(255),
    instructor_id VARCHAR(24) NOT NULL,
    
    -- Statistics
    enrolledCount INT DEFAULT 0,
    rating FLOAT DEFAULT 0,
    
    -- Timestamps
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (instructor_id) REFERENCES Users(_id),
    INDEX idx_courses_instructor (instructor_id),
    INDEX idx_courses_category (category),
    INDEX idx_courses_rating (rating DESC)
);

-- 7. Course Students (Many-to-Many relationship)
CREATE TABLE Course_Students (
    course_id VARCHAR(24) NOT NULL,
    student_id VARCHAR(24) NOT NULL,
    enrolledAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (course_id, student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Users(_id) ON DELETE CASCADE
);

-- 8. Modules Table (Course curriculum units)
CREATE TABLE Modules (
    _id VARCHAR(24) PRIMARY KEY,
    course_id VARCHAR(24) NOT NULL,
    title VARCHAR(255) NOT NULL,
    order_index INT DEFAULT 0,
    
    -- Timestamps
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES Courses(_id) ON DELETE CASCADE,
    INDEX idx_modules_course (course_id),
    INDEX idx_modules_order (course_id, order_index)
);

-- 9. Lessons Table (SubModules - actual learning content)
CREATE TABLE Lessons (
    _id VARCHAR(24) PRIMARY KEY,
    module_id VARCHAR(24) NOT NULL,
    title VARCHAR(255) NOT NULL,
    type ENUM('video', 'documentation', 'mcq', 'project', 'text') NOT NULL,
    
    -- Content fields (type-dependent)
    content TEXT, -- For markdown/text content
    videoUrl VARCHAR(255), -- For video lessons
    repoLinkPlaceholder VARCHAR(255), -- For project submissions
    
    -- Timestamps
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (module_id) REFERENCES Modules(_id) ON DELETE CASCADE,
    INDEX idx_lessons_module (module_id),
    INDEX idx_lessons_type (type)
);

-- ============================================================================
-- SECTION 3: QUIZ & ASSESSMENT SYSTEM
-- ============================================================================

-- 10. Quiz Questions
CREATE TABLE Quiz_Questions (
    _id VARCHAR(24) PRIMARY KEY,
    lesson_id VARCHAR(24) NOT NULL,
    text TEXT NOT NULL,
    type ENUM('single', 'multiple', 'text') DEFAULT 'single',
    correctAnswer TEXT, -- For text-type questions
    points INT DEFAULT 10,
    explanation TEXT, -- Shown after answering
    
    FOREIGN KEY (lesson_id) REFERENCES Lessons(_id) ON DELETE CASCADE,
    INDEX idx_questions_lesson (lesson_id)
);

-- 11. Quiz Options (For MCQ questions)
CREATE TABLE Quiz_Options (
    _id VARCHAR(24) PRIMARY KEY,
    question_id VARCHAR(24) NOT NULL,
    text VARCHAR(255) NOT NULL,
    isCorrect BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (question_id) REFERENCES Quiz_Questions(_id) ON DELETE CASCADE,
    INDEX idx_options_question (question_id)
);

-- 12. Quiz Settings (Per-lesson quiz configuration)
CREATE TABLE Quiz_Settings (
    lesson_id VARCHAR(24) PRIMARY KEY,
    timeLimit INT, -- in minutes
    passingScore INT DEFAULT 70, -- percentage
    shuffleQuestions BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (lesson_id) REFERENCES Lessons(_id) ON DELETE CASCADE
);

-- 13. Quiz Results (Student quiz attempts)
CREATE TABLE Quiz_Results (
    _id VARCHAR(24) PRIMARY KEY,
    student_id VARCHAR(24) NOT NULL,
    course_id VARCHAR(24) NOT NULL,
    module_id VARCHAR(24) NOT NULL,
    
    -- Results
    score INT NOT NULL,
    totalPoints INT NOT NULL,
    passed BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    attemptDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES Users(_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(_id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES Modules(_id) ON DELETE CASCADE,
    INDEX idx_results_student (student_id),
    INDEX idx_results_course (course_id),
    INDEX idx_results_module (module_id)
);

-- 14. Quiz Answers (Individual question responses)
CREATE TABLE Quiz_Answers (
    _id VARCHAR(24) PRIMARY KEY,
    quiz_result_id VARCHAR(24) NOT NULL,
    questionId VARCHAR(24) NOT NULL,
    answer TEXT, -- Student's answer (can be string or JSON)
    isCorrect BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (quiz_result_id) REFERENCES Quiz_Results(_id) ON DELETE CASCADE,
    INDEX idx_answers_result (quiz_result_id)
);

-- 15. Cheating Flags (Anti-cheat system)
CREATE TABLE Cheating_Flags (
    _id VARCHAR(24) PRIMARY KEY,
    quiz_result_id VARCHAR(24) NOT NULL,
    type ENUM('blur', 'paste', 'other') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT,
    
    FOREIGN KEY (quiz_result_id) REFERENCES Quiz_Results(_id) ON DELETE CASCADE,
    INDEX idx_flags_result (quiz_result_id)
);

-- ============================================================================
-- SECTION 4: ENROLLMENT & PROGRESS TRACKING
-- ============================================================================

-- 16. Enrollments Table
CREATE TABLE Enrollments (
    _id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    course_id VARCHAR(24) NOT NULL,
    
    -- Progress tracking
    enrolledAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completedAt TIMESTAMP NULL,
    progress INT DEFAULT 0, -- Percentage (0-100)
    
    -- Constraints
    UNIQUE KEY unique_enrollment (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES Users(_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(_id) ON DELETE CASCADE,
    INDEX idx_enrollments_user (user_id),
    INDEX idx_enrollments_course (course_id),
    INDEX idx_enrollments_active (user_id, completedAt)
);

-- 17. Completed Modules (Join table for enrollment progress)
CREATE TABLE Completed_Modules (
    enrollment_id VARCHAR(24) NOT NULL,
    module_id VARCHAR(24) NOT NULL,
    completedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (enrollment_id, module_id),
    FOREIGN KEY (enrollment_id) REFERENCES Enrollments(_id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES Modules(_id) ON DELETE CASCADE
);

-- ============================================================================
-- SECTION 5: CERTIFICATES
-- ============================================================================

-- 18. Certificates Table
CREATE TABLE Certificates (
    _id VARCHAR(24) PRIMARY KEY,
    certificateId VARCHAR(100) UNIQUE NOT NULL, -- UUID for verification
    
    -- References
    user_id VARCHAR(24) NOT NULL,
    course_id VARCHAR(24) NOT NULL,
    
    -- Immutable snapshots (in case course/user data changes)
    courseTitle VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    instructorName VARCHAR(255) NOT NULL,
    
    -- Metadata
    issueDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES Users(_id),
    FOREIGN KEY (course_id) REFERENCES Courses(_id),
    INDEX idx_certificates_user (user_id),
    INDEX idx_certificates_course (course_id),
    INDEX idx_certificates_id (certificateId)
);

-- ============================================================================
-- SECTION 6: COMMUNITY (FORUM & BLOG)
-- ============================================================================

-- 19. Posts Table (Forum posts and blog articles)
CREATE TABLE Posts (
    _id VARCHAR(24) PRIMARY KEY,
    type ENUM('blog', 'forum', 'discussion', 'question') NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL, -- Markdown supported
    
    -- References
    author_id VARCHAR(24) NOT NULL,
    course_id VARCHAR(24), -- Optional: link to course context
    
    -- Media
    image VARCHAR(255), -- Optional cover image
    
    -- Statistics
    views INT DEFAULT 0,
    
    -- Timestamps
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (author_id) REFERENCES Users(_id),
    FOREIGN KEY (course_id) REFERENCES Courses(_id),
    INDEX idx_posts_author (author_id),
    INDEX idx_posts_type (type),
    INDEX idx_posts_course (course_id),
    INDEX idx_posts_created (createdAt DESC)
);

-- 20. Post Tags (Many-to-Many)
CREATE TABLE Post_Tags (
    post_id VARCHAR(24) NOT NULL,
    tag VARCHAR(100) NOT NULL,
    PRIMARY KEY (post_id, tag),
    FOREIGN KEY (post_id) REFERENCES Posts(_id) ON DELETE CASCADE,
    INDEX idx_tags_tag (tag)
);

-- 21. Post Likes (Upvotes/Downvotes)
CREATE TABLE Post_Likes (
    post_id VARCHAR(24) NOT NULL,
    user_id VARCHAR(24) NOT NULL,
    type ENUM('upvote', 'downvote', 'like') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(_id) ON DELETE CASCADE
);

-- 22. Comments Table (Nested comments support)
CREATE TABLE Comments (
    _id VARCHAR(24) PRIMARY KEY,
    post_id VARCHAR(24) NOT NULL,
    author_id VARCHAR(24) NOT NULL,
    content TEXT NOT NULL,
    
    -- For nested replies
    parent_id VARCHAR(24), -- NULL for top-level comments
    
    -- Timestamps
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (post_id) REFERENCES Posts(_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Users(_id),
    FOREIGN KEY (parent_id) REFERENCES Comments(_id) ON DELETE CASCADE,
    INDEX idx_comments_post (post_id),
    INDEX idx_comments_author (author_id),
    INDEX idx_comments_parent (parent_id)
);

-- ============================================================================
-- ADDITIONAL INDEXES FOR PERFORMANCE
-- ============================================================================

-- Composite indexes for common queries
CREATE INDEX idx_enrollments_user_active ON Enrollments(user_id, completedAt);
CREATE INDEX idx_modules_course_order ON Modules(course_id, order_index);
CREATE INDEX idx_courses_category_rating ON Courses(category, rating DESC);

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
