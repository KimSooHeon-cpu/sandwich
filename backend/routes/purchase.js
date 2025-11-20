// 필요한 모듈 불러오기
const express = require('express');         // Express 프레임워크 불러옴
const router = express.Router();            // 라우터 객체 생성
const mysql = require('mysql2');            // MySQL 연동을 위한 mysql2 모듈 불러옴

// DB 연결 객체 생성
const conn = mysql.createConnection({
  host: 'localhost',                        // DB 주소
  user: 'root',                             // DB 계정 ID
  password: '1234',                         // 비밀번호 (환경에 맞게 수정)
  database: 'sandwich_db'                   // 사용할 DB 이름
});

/*-------------------- 기본 테스트용 GET 라우터 --------------------*/

// GET 방식 - 단순 연결 확인용 (브라우저에서 /api/purchase 접속 시 메시지 출력)
router.get('/', (req, res) => {
  res.send('구매 API 작동 중');             // 텍스트 응답
});

/*-------------------- POST 방식 - 상품 구매 저장 --------------------*/

// POST 방식 - 구매 정보 저장 (클라이언트가 보낸 구매 정보를 DB에 저장)
router.post('/', (req, res) => {
  // 요청 바디에서 구매 정보 꺼내기 (JSON 형식)
  const { phone, product_id, quantity } = req.body; // ✅ 수정: member_id → phone

  // SQL 쿼리문: 구매 내역 테이블에 데이터 삽입
  const sql = 'INSERT INTO purchases (phone, product_id, quantity) VALUES (?, ?, ?)'; // ✅ 수정

  // 쿼리 실행 → 물음표 자리에 위에서 꺼낸 값 삽입
  conn.query(sql, [phone, product_id, quantity], (err, result) => {
    if (err) {
      console.log('구매 저장 오류:', err);         // 에러 콘솔 출력
      return res.status(500).json({ success: false }); // 실패 응답
    }

    res.json({ success: true });                    // 성공 응답
  });
});

/*-------------------- 외부에서 라우터 사용할 수 있게 내보냄 --------------------*/
module.exports = router;
