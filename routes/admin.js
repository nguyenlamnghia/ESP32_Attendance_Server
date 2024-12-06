const express = require("express");

const adminController = require("../controllers/admin");

const checkRole = require("../middleware/check-role");

// import upload middleware
const uploadMiddleware = require("../middleware/upload");

const router = express.Router();

// ------------ STUDENT CONTROLLER ------------

// /admin => GET
router.get("/", checkRole("admin"), adminController.getIndex);

// /admin/students => GET
router.get("/students", checkRole("admin"), adminController.getStudents);

// /admin/add-student => GET
router.get("/add-student", checkRole("admin"), adminController.getAddStudent);

// /admin/add-student => POST
router.post(
  "/add-student",
  checkRole("admin"),
  uploadMiddleware,
  adminController.postAddStudent
);

// /admin/students/:student_id => GET
router.get(
  "/students/:student_id",
  checkRole("admin"),
  adminController.getStudent
);

// /admin/students/:student_id => POST
router.post(
  "/students/:student_id",
  checkRole("admin"),
  uploadMiddleware,
  adminController.postStudent
);

// admin/students/delete/:student_id => GET
router.get(
  "/students/delete/:student_id",
  checkRole("admin"),
  adminController.deleteStudent
);

// ------------- END --------------

// ------------ LECTURER CONTROLLER ------------

// /admin/lecturers => GET
router.get("/lecturers", checkRole("admin"), adminController.getLecturers);

// /admin/add-lecturer => GET
router.get("/add-lecturer", checkRole("admin"), adminController.getAddLecturer);

// /admin/add-lecturer => POST
router.post(
  "/add-lecturer",
  checkRole("admin"),
  uploadMiddleware,
  adminController.postAddLecturer
);

// /admin/lecturer/:lecturer_id => GET
router.get(
  "/lecturers/:lecturer_id",
  checkRole("admin"),
  adminController.getLecturer
);

// /admin/lecturer/:lecturer_id => POST
router.post(
  "/lecturers/:lecturer_id",
  checkRole("admin"),
  uploadMiddleware,
  adminController.postLecturer
);

// /admin/add-lecturer => POST
router.post(
  "/add-lecturer",
  checkRole("admin"),
  adminController.postAddLecturer
);

// /admin/lecturers/delete/:lecturer_id => GET
router.get(
  "/lecturers/delete/:lecturer_id",
  checkRole("admin"),
  adminController.deleteLecturer
);

// ------------ END --------------

// ------------ COURSE CONTROLLER ------------
// /admin/courses => GET
router.get("/courses", checkRole("admin"), adminController.getCourses);
// admin/add-course => GET
router.get("/add-course", checkRole("admin"), adminController.getAddCourse);
// admin/add-course => POST
router.post(
  "/add-course",
  checkRole("admin"),
  uploadMiddleware,
  adminController.postAddCourse
);
// /admin/courses/:lecturer_id => GET
router.get(
  "/courses/:course_id",
  checkRole("admin"),
  adminController.getCourse
);

// /admin/courses/:course_id => POST
router.post(
  "/courses/:course_id",
  checkRole("admin"),
  uploadMiddleware,
  adminController.postCourse
);
// /admin/courses/delete/:course_id => GET
router.get(
  "/courses/delete/:course_id",
  checkRole("admin"),
  adminController.deleteCourse
);
// ------------ END --------------


// ------------- CLASS CONTROLLER -------------
// /admin/classes => GET
router.get("/classes", checkRole("admin"), adminController.getClasses);

// /admin/classes/:class_id => GET
router.get(
  "/classes/:class_id",
  checkRole("admin"),
  adminController.getClass
);
// ------------ END --------------

// ------------- ATTENDANCE CONTROLLER -------------
// /admin/classes => GET
// router.get("/attendance", checkRole("admin"), adminController.getAttendance);
router.get(
  "/attendances/:class_id",
  checkRole("admin"),
  adminController.getAttendances
);

// /admin/classes/:class_id/:attendance_id => GET
router.get(
  "/attendances/:class_id/:attendance_id",
  checkRole("admin"),
  adminController.getAttendance
);

// /admin/classes/:class_id/:attendance_id => POST
router.post(
  "/attendances/:class_id/:attendance_id",
  checkRole("admin"),
  adminController.postAttendance
);

// /admin/add-attendance/:class_id => GET
router.get(
  "/add-attendance/:class_id",
  checkRole("admin"),
  adminController.getAddAttendance
);

// /admin/add-attendance/:class_id => POST
router.post(
  "/add-attendance/:class_id",
  checkRole("admin"),
  adminController.postAddAttendance
);

module.exports = router;