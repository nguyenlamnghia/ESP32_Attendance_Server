const db = require("../util/database");

module.exports = class Enrollment {
  constructor(enrollment_id, student_id, class_id) {
    this.enrollment_id = enrollment_id;
    this.student_id = student_id;
    this.class_id = class_id;
  }

//   static async getAllEnrollment() {
//     try {
//       const [rows, fields] = await db.execute(
//         "SELECT * FROM english_center.class"
//       );

//       // load data from database
//       const classes = [];
//       for (const each_class of rows) {
//         classes.push(
//           new Class(
//             each_class.class_id,
//             each_class.start_time,
//             each_class.end_time,
//             each_class.course_id,
//             each_class.lecturer_id,
//             each_class.max_student,
//             each_class.number_student
//           )
//         );
//       }
//       return classes;
//     } catch (err) {
//       throw err;
//     }
//   }

  static async getEnrollmentByClassId(class_id) {
    try {
        const [rows, fields] = await db.execute(
            "SELECT * FROM english_center.enrollment WHERE class_id = ?",
            [class_id]
        );

        const enrollments = [];
        for (const enrollment of rows) {
            enrollments.push(
                new Enrollment(
                    enrollment.enrollment_id,
                    enrollment.student_id,
                    enrollment.class_id
                )
            );
        }
        return enrollments;
    }
    catch (err) {
        throw err;
    }
}

  // add course function
  static async addCourse(course) {
    try {
      const [rows, fields] = await db.execute(
        "INSERT INTO english_center.course (course_id, title, infomation, ref, fee, thumbnail) VALUES (?, ?, ?, ?, ?, ?)",
        [
          course.course_id,
          course.title,
          course.infomation,
          course.ref,
          course.fee,
          course.thumbnail,
        ]
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }

  // get course by id function
  static async getCourseById(course_id) {
    try {
      const [rows, fields] = await db.execute(
        "SELECT * FROM english_center.course WHERE course_id = ?",
        [course_id]
      );
      const course = rows[0];
      return new Course(
        course.course_id,
        course.title,
        course.infomation,
        course.ref,
        course.fee,
        course.thumbnail
      );
    } catch (err) {
      throw err;
    }
  }

  //update course function
  static async updateCourse(course) {
    try {
      const [rows, fields] = await db.execute(
        "UPDATE english_center.course SET title = ?, infomation = ?, ref = ?, fee = ?, thumbnail = ? WHERE course_id = ?",
        [
          course.title,
          course.infomation,
          course.ref,
          course.fee,
          course.thumbnail,
          course.course_id,
        ]
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }

  //delete course function
  static async deleteCourse(course_id) {
    try {
      const [rows, fields] = await db.execute(
        "DELETE FROM english_center.course WHERE course_id = ?",
        [course_id]
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }
};
