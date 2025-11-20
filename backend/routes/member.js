/*--------------- DB 연결용 상단 코드(mysql + conn 객체) --------------*/

const mysql = require('mysql2'); // mysql2모듈(최신 모듈) 불러옴
const conn = mysql.createConnection({ // DB 연결 객체 생성
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'sandwich_db'
});

/*----------------------- 기본 모듈 및 라우터 ------------------------*/

const express = require('express');
const router = express.Router();

/*----------------------- GET 테스트용 ------------------------*/

// http://localhost:3000/getMember/01012345678
// GET /api/members 요청 시 테스트 메시지 출력
router.get('/', (req, res) => {
  res.send('회원 API 작동 중');
});
//! 어디까지나 서버 정상 작동되는지 확인하는게 목적인 코드 

/*----------------------- 회원가입 - POST 방식(Register.jsx에서 요청) ------------------------*/

// 회원가입 기능 - POST /api/members
router.post('/', (req, res) => { // 💢 경로는 루트(/)
  const { phone, password } = req.body;

  const sql = 'INSERT INTO members (phone, password) VALUES (?, ?)';
  conn.query(sql, [phone, password], (err, result) => {
    if (err) {
      console.log('회원가입 오류:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

/*----------------------- 로그인 - POST 방식 ------------------------*/

// 로그인 기능 - POST /api/members/login
router.post('/login', (req, res) => {
  const { phone, password } = req.body;

  const sql = 'SELECT * FROM members WHERE phone = ? AND password = ?';
  conn.query(sql, [phone, password], (err, rows) => {
    if (err) {
      console.log('로그인 오류:', err);
      return res.status(500).json({ success: false });
    }

    if (rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

/*------------------ 외부에서 사용 가능하게 export -------------------*/

module.exports = router;
