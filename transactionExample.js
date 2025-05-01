// transactionExample.js
const pool = require('./db');

async function doTransaction() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // 開始交易

    const studentId = 'S10810005';
    const newDeptId = 'BA001';

    let sql = 'SELECT * FROM STUDENT WHERE Student_ID = ?';
    const studentCheck = await conn.query(sql, [studentId]);

    if (studentCheck.length === 0) {
      console.error('操作失敗：查無此人');
      await conn.rollback();
      return;
    }

    const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
    await conn.query(updateStudent, [newDeptId, studentId]);

    const updateCourses = 'UPDATE ENROLLMENT SET Status = ? WHERE Student_ID = ?';
    await conn.query(updateCourses, ['轉系', studentId]);

    sql = `
      SELECT s.Student_ID, s.Name, d.Name AS Department_Name
      FROM STUDENT s
      JOIN DEPARTMENT d ON s.Department_ID = d.Department_ID
      WHERE s.Student_ID = ?
    `;
    const result = await conn.query(sql, [studentId]);
    console.log('目前學生的系所資訊：', result[0]);

    await conn.commit(); // 成功提交
    console.log('交易成功，已提交');

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('交易失敗，已回滾：', err);
  } finally {
    if (conn) conn.release();
  }
}

doTransaction();
