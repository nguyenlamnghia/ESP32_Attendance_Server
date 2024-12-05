const db = require("../util/database");

module.exports = class Atendance_Process {
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
      return rows;
    } catch (err) {
      throw err;
    }
  }
}