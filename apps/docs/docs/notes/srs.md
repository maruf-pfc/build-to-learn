# Software Requirements Specification: Build to Learn

**Version:** 1.0
**Date:** May 20, 2025

## 1. Introduction

1.1. **Purpose:**
This document outlines the requirements for the "Build to Learn" project-based learning platform.

1.2. **Scope:**
The platform enables students to learn via project-based courses featuring content delivery (documentation, video), project submission, automated MCQ testing, tiered user support, and community interaction through forums and blogs. It supports roles including Students, Instructors, Moderators, and Admins.

1.3. **Definitions, Acronyms, and Abbreviations:**

- PBL: Project-Based Learning
- MCQ: Multiple Choice Question
- UI: User Interface
- API: Application Programming Interface
- DB: Database

  1.4. **References:**
  (Links to design docs, competitor analysis, etc.)

  1.5. **Overview:**
  This SRS details functional and non-functional requirements, user roles, and system constraints.

## 2. Overall Description

2.1. **Product Perspective:**
A web-based educational platform bridging theory and practice through real-world projects, enriched with a community forum and blog for collaborative learning.

2.2. **Product Functions (High-Level):**

- User Registration and Authentication
- Course Browsing and Enrollment
- Sequential Content Delivery (Docs, Videos, Labs, Projects, MCQs)
- Project Submission and Feedback Mechanism
- MCQ Testing with Basic Cheat Detection
- Certificate Generation
- User Role Management (Student, Instructor, Moderator, Admin)
- Instructor Content Creation Tools
- Moderator Review System for Instructor Applications
- Subscription Management (Free/Premium)
- One-to-one Support System (Premium)
- **Forum System for Community Discussion**
- **Blog System for Platform Articles and News**

  2.3. **User Characteristics:**

- **Students:** Practical skill seekers, self-motivated learners.
- **Instructors:** Subject experts creating project-based courses and providing support.
- **Moderators:** Quality control and verification of instructor applications.
- **Admin:** Platform management, role assignments, system configuration.

  2.4. **Constraints:**

- Development timeline: April 2025 - February 2026
- Team size: 3 members
- Tech stack: MERN/Next.js primarily
- Budget: Typical student project constraints (free tiers preferred)
- MCQ cheat detection is basic (tab-switching focus detection)

  2.5. **Assumptions and Dependencies:**

- Stable internet access
- Modern web browsers
- Reliable third-party services (YouTube, cloud storage)

## 3. Specific Requirements

### 3.1 Functional Requirements

#### FR1: User Management

- FR1.1: User Registration (default role: Student)
- FR1.2: User Login/Logout
- FR1.3: Password Reset
- FR1.4: Profile Management (View/Edit)
- FR1.5: Instructor Application Submission (by Students)

#### FR2: Course Management (Instructor/Admin)

- FR2.1: Create/Edit/Delete Courses
- FR2.2: Define Course Structure (Modules, Parts)
- FR2.3: Upload/Link Documentation (Markdown)
- FR2.4: Embed Video Tutorials (YouTube links)
- FR2.5: Create Lab Instructions
- FR2.6: Create Recap Notes
- FR2.7: Define Project Assignments
- FR2.8: Create MCQs with correct answers and time limits
- FR2.9: Publish/Unpublish Courses

#### FR3: Course Consumption (Student)

- FR3.1: Browse Available Courses
- FR3.2: Enroll in one course at a time (only if no active or previously completed)
- FR3.3: Access course content sequentially (Docs + Video, Lab, Recap, Project, MCQ)
- FR3.4: Mark content parts as complete to unlock next
- FR3.5: View documentation and embedded videos
- FR3.6: Submit projects for completed modules
- FR3.7: Take MCQs for modules

  - FR3.7.1: MCQ Timer (30 seconds per question)
  - FR3.7.2: MCQ Cheat Detection (flag on tab switch, skip MCQ)
  - FR3.7.3: Store MCQ results and cheat flags

- FR3.8: Unlock certificate upon course completion
- FR3.9: Download certificate (PDF)

#### FR4: Moderation (Moderator/Admin)

- FR4.1: View Pending Instructor Applications
- FR4.2: Verify Instructor Profile and Skills (manual process)
- FR4.3: Approve/Reject Instructor Applications (Moderators with Admin permission)
- FR4.4: Admin can grant/revoke Moderator approval permissions
- FR4.5: Admin can directly change user roles

#### FR5: Support & Feedback

- FR5.1: Instructors provide feedback on project submissions
- FR5.2: Premium students get one-to-one instructor support (chat, scheduled calls)

#### FR6: Subscription Management

- FR6.1: Differentiate Free and Premium features
- FR6.2: (Future) Payment integration for Premium; initially manual premium status by Admin

#### FR7: Forum System

- FR7.1: View forum categories and topics (threads)
- FR7.2: Authenticated users can create new topics with title and rich text content
- FR7.3: Post replies to existing topics
- FR7.4: Edit/Delete own posts and topics (within limits)
- FR7.5: Search forum content by keywords
- FR7.6: Forum moderation (Moderator/Admin)

  - FR7.6.1: View reported posts/topics
  - FR7.6.2: Edit/Delete any post/topic
  - FR7.6.3: Lock/Unlock topics
  - FR7.6.4: Ban users from forum

- FR7.7: Admin can create/edit/delete forum categories
- FR7.8 (Optional): User profiles show forum activity stats
- FR7.9 (Optional): Notifications for replies to subscribed topics

#### FR8: Blog System

- FR8.1: View published blog articles (all users, including anonymous)
- FR8.2: Filter/sort articles by category, tag, date
- FR8.3: Search blog articles by title/content keywords
- FR8.4: Create/Edit/Publish articles (Instructors/Admin)

  - FR8.4.1: Use rich text editor for blog creation
  - FR8.4.2: Save drafts, preview, publish articles
  - FR8.4.3: Assign categories and tags
  - FR8.4.4: Upload cover images

- FR8.5: Blog comments

  - FR8.5.1: Authenticated users can comment on articles
  - FR8.5.2: Edit/Delete own comments (TBD)

- FR8.6: Blog comment moderation (Moderator/Admin)

  - FR8.6.1: View/approve/reject/delete comments

- FR8.7: Admin manages blog categories and global tags

### 3.2 Non-Functional Requirements

- **NFR1: Performance**

  - Page load < 3 seconds
  - API response < 500ms

- **NFR2: Security**

  - Secure password hashing with salt
  - Protection against XSS, CSRF, injection attacks
  - HTTPS enforced
  - Role-based access control
  - Secure handling of API keys/secrets

- **NFR3: Usability**

  - Intuitive navigation
  - Clear user instructions and feedback
  - Responsive design (desktop, tablet)

- **NFR4: Reliability**

  - 99% uptime (except maintenance)
  - Data backup and recovery (MongoDB Atlas)

- **NFR5: Maintainability**

  - Well-documented, consistent code
  - Modular design for easy updates and fixes

- **NFR6: Scalability**

  - Support for growing users and courses (start with \~100 concurrent users)

- **NFRX: Content Moderation (Forum/Blog)**

  - Tools for moderator content control to maintain respectful environment
  - Defined response times for moderation actions

### 3.3 Interface Requirements

- **UI1:** Accessible via modern web browsers (Chrome, Firefox, Safari, Edge)
- **API1:** RESTful APIs for frontend-backend communication

### 3.4 Data Requirements

- Persistent storage of user accounts, courses, modules, content, submissions, progress, MCQ results, forum posts, blog articles, comments, and related metadata (see Database Design).

## 4. Other Requirements

4.1. **Deployment:**

- Dockerized application
- CI/CD pipeline with GitHub Actions

  4.2. **Testing:**

- Unit tests
- Integration tests
- API tests
