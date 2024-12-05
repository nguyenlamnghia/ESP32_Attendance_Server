const db = require("../util/database");

module.exports = class Attendance {
  constructor(attendance_id, class_id, time) {
    this.attendance_id = attendance_id;
    this.class_id = class_id;
    this.time = time;
  }

  static async getAllAttendances() {
    try {
      const [rows, fields] = await db.execute(
        "SELECT * FROM english_center.attendance"
      );

      // load data from database
      const attendances = [];
      for (const attendance of rows) {
        attendances.push(
          new Attendance(
            attendance.attendance_id,
            attendance.class_id,
            attendance.time
          )
        );
      }
      return attendances;
    } catch (err) {
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
  static async getAttendanceByClassId(class_id) {
    try {
      const [rows, fields] = await db.execute(
        "SELECT * FROM english_center.attendance WHERE class_id = ?",
        [class_id]
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }

  // get attendance by attendance_id function
  static async getAttendanceById(attendance_id) {
    try {
      const [rows, fields] = await db.execute(
        "SELECT * FROM english_center.attendance WHERE attendance_id = ?",
        [attendance_id]
      );
      return new Attendance(
        rows[0].attendance_id,
        rows[0].class_id,
        rows[0].time
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
