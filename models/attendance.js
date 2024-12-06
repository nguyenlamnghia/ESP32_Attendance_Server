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

  // update attendance function
  static async updateAttendance(attendance) {
    try {
      const result = await db.execute(
        "UPDATE english_center.attendance SET class_id = ?, time = ? WHERE attendance_id = ?",
        [attendance.class_id, attendance.time, attendance.attendance_id]
      );
      return result;
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

  // add attendance function
  static async addAttendance(attendance) {
    try {
      const [rows, fields] = await db.execute(
        "INSERT INTO english_center.attendance (attendance_id, class_id, time) VALUES (?, ?, ?)",
        [attendance.attendance_id, attendance.class_id, attendance.time]
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }
};
