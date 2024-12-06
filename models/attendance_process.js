const db = require("../util/database");

module.exports = class Attendance_Process {
  constructor(enrollment_id, attendance_id, attend_check) {
    this.enrollment_id = enrollment_id;
    this.attendance_id = attendance_id;
    this.attend_check = attend_check;
  }

  static async getEnrollment_ProcessByAttendanceId(attendance_id) {
    try {
      const [rows, fields] = await db.execute(
        "SELECT * FROM english_center.attendance_process WHERE attendance_id = ?",
        [attendance_id]
      );

      const enrollments = [];
      for (const enrollment of rows) {
        enrollments.push(
          new Attendance_Process(
            enrollment.enrollment_id,
            enrollment.attendance_id,
            enrollment.attend_check
          )
        );
      }

      return enrollments;
    } catch (err) {
      throw err;
    }
  }

  static async updateAttendanceProcess(Attendance_Process) {
    try {
      const result = await db.execute(
        "UPDATE english_center.attendance_process SET attend_check = ? WHERE enrollment_id = ? AND attendance_id = ?",
        [Attendance_Process.attend_check, Attendance_Process.enrollment_id, Attendance_Process.attendance_id]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async addAttendanceProcess(Attendance_Process) {
    try {
      const result = await db.execute(
        "INSERT INTO english_center.attendance_process (enrollment_id, attendance_id, attend_check) VALUES (?, ?, ?)",
        [Attendance_Process.enrollment_id, Attendance_Process.attendance_id, Attendance_Process.attend_check]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async deleteAttendanceProcessByAttendanceId(attendance_id) {
    try {
      const result = await db.execute(
        "DELETE FROM english_center.attendance_process WHERE attendance_id = ?",
        [attendance_id]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }
}