// 필요한 모듈 불러오기
const express = require('express');       // Express 프레임워크 불러옴
const router = express.Router();          // 여러 API 경로를 담을 수 있는 라우터 객체 생성
const mysql = require('mysql2');          // MySQL 연동을 위한 mysql2 모듈 불러옴

// DB 연결 객체 생성 (쿼리 실행 시 사용됨)
const conn = mysql.createConnection({
  host: 'localhost',                      // 데이터베이스 주소
  user: 'root',                           // 데이터베이스 계정 ID
  password: '1234',                       // 계정 비밀번호 (개인 환경에 따라 수정)
  database: 'sandwich_db'                // 사용할 DB명
});

// GET 방식 - 모든 상품 목록 조회 API
router.get('/', (req, res) => {           // 프론트에서 /products로 GET 요청이 들어오면 실행
  const sql = 'SELECT * FROM products';   // products DB 테이블 sql쿼리문으로 조회

  conn.query(sql, (err, rows) => {        // sql 쿼리 실행 (에러(err) 혹은 결과(rows) 출력하기)
    if (err) {                            // 에러 발생 시
      console.log('상품 목록 조회 오류:', err);  // 콘솔에 오류 출력
      return res.status(500).json({ success: false }); // 실패 응답 전송
    }
    res.json(rows);                       // 성공 시 조회된 상품 목록을 JSON 형태로 응답
  });
});

// 외부에서 사용할 수 있도록 router 내보내기
module.exports = router;
