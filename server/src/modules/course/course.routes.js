const router = require("express").Router();
const controller = require("./course.controller");
const { auth } = require("../../middlewares/auth.middleware");

// Public
router.get("/", controller.getAllCourses);
router.get("/:id", controller.getCourseById);

// Protected
router.post("/", auth, controller.createCourse);
router.put("/:id", auth, controller.updateCourse);
router.get("/instructor/stats", auth, controller.getInstructorStats);
router.post("/:id/enroll", auth, controller.enrollCourse);
// CRUD
router.post("/:id/modules", auth, controller.addModule);
router.put("/:id/modules/reorder", auth, controller.reorderModules);
router.put("/:id/modules/:moduleId", auth, controller.updateModule);
router.delete("/:id/modules/:moduleId", auth, controller.deleteModule);

router.post("/:id/modules/:moduleId/lessons", auth, controller.addLesson);
router.put(
  "/:id/modules/:moduleId/lessons/:lessonId",
  auth,
  controller.updateLesson,
);
router.delete(
  "/:id/modules/:moduleId/lessons/:lessonId",
  auth,
  controller.deleteLesson,
);

router.post(
  "/:id/modules/:moduleId/complete",
  auth,
  controller.markModuleCompleted,
);
router.post("/:id/modules/:moduleId/submit-mcq", auth, controller.submitMCQ);
router.post(
  "/:id/modules/:moduleId/submit-project",
  auth,
  controller.submitProject,
);

module.exports = router;
