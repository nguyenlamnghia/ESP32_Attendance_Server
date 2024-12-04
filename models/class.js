const db = require("../util/database");

module.exports = class Class {
  constructor(class_id, start_time, end_time, course_id, lecturer_id, max_student, number_student) {
    this.class_id = class_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.course_id = course_id;
    this.lecturer_id = lecturer_id;
    this.max_student = max_student;
    this.number_student = number_student;
  }

  static async getAllClasses() {
    try {
      const [rows, fields] = await db.execute(
        "SELECT * FROM english_center.class"
      );

      // load data from database
      const classes = [];
      for (const each_class of rows) {
        classes.push(
          new Class(
            each_class.class_id,
            each_class.start_time,
            each_class.end_time,
            each_class.course_id,
            each_class.lecturer_id,
            each_class.max_student,
            each_class.number_student
          )
        );
      }
      return classes;
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
  static async getClassById(class_id) {
    try {
      const [rows, fields] = await db.execute(
        "SELECT * FROM english_center.class WHERE class_id = ?",
        [class_id]
      );
      const class_info = rows[0];
      return new Class(
        class_info.class_id,
        class_info.start_time,
        class_info.end_time,
        class_info.course_id,
        class_info.lecturer_id,
        class_info.max_student,
        class_info.number_student
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
