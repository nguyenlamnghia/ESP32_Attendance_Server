const db = require("../util/database");

module.exports = class Course {
  constructor(course_id, title, infomation, ref, fee, thumbnail) {
    this.course_id = course_id;
    this.title = title;
    this.infomation = infomation;
    this.ref = ref;
    this.fee = fee;
    this.thumbnail = thumbnail;
  }

  static async getAllCourses() {
    try {
      const [rows, fields] = await db.execute(
        "SELECT * FROM english_center.course"
      );

      // load data from database
      const courses = [];
      for (const course of rows) {
        courses.push(
          new Course(
            course.course_id,
            course.title,
            course.infomation,
            course.ref,
            course.fee,
            course.thumbnail
          )
        );
      }
      return courses;
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
