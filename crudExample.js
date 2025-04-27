// crudExample.js
const pool = require('./db');

async function basicCrud() {
  let conn;
  try {
    conn = await pool.getConnection();

    // 1. INSERT 新增
    let sql = 'SELECT * FROM STUDENT WHERE Student_ID = ?';
    let rows = await conn.query(sql, ['S10810001']);
    if (rows.length > 0) {
      console.error('操作失敗：查無此人（已有相同學號）');
    } else {
      sql = 'INSERT INTO STUDENT (Student_ID, Name, Gender, Email, Department_ID) VALUES (?, ?, ?, ?, ?)';
      await conn.query(sql, ['S10810001', '王曉明', 'M', 'wang@example.com', 'CS001']);
      console.log('已新增一筆學生資料');
    }

    // 2. SELECT 查詢
    sql = 'SELECT * FROM STUDENT WHERE Department_ID = ?';
    rows = await conn.query(sql, ['CS001']);
    if (rows.length > 0) {
      console.log('查詢結果：', rows);
    } else {
      console.error('操作失敗：查無此人');
    }

    // 3. UPDATE 更新
    sql = 'SELECT * FROM STUDENT WHERE Student_ID = ?';
    rows = await conn.query(sql, ['S10810001']);
    if (rows.length > 0) {
      sql = 'UPDATE STUDENT SET Name = ? WHERE Student_ID = ?';
      await conn.query(sql, ['王小名', 'S10810001']);
      console.log('已更新學生名稱');
    } else {
      console.error('操作失敗：查無此人');
    }

    // 4. DELETE 刪除
    sql = 'SELECT * FROM STUDENT WHERE Student_ID = ?';
    rows = await conn.query(sql, ['S10810001']);
    if (rows.length > 0) {
      sql = 'DELETE FROM STUDENT WHERE Student_ID = ?';
      await conn.query(sql, ['S10810001']);
      console.log('已刪除該學生');
    } else {
      console.error('操作失敗：查無此人');
    }

  } catch (err) {
    console.error('操作失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}

basicCrud();
