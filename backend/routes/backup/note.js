// 로그인 요청을 처리하는 POST 라우터
router.post('/login', (req, res) => {

  // 클라이언트에서 전달된 전화번호와 비밀번호 추출
  const { phone, password } = req.body;

  // members 테이블에서 해당 정보와 일치하는 회원 찾기
  const sql = 'SELECT * FROM members WHERE phone = ? AND password = ?';

  // SQL 쿼리 실행 (전화번호와 비밀번호가 일치하는 데이터 찾기)
  conn.query(sql, [phone, password], (err, rows) => {

    // 쿼리 실행 중 오류 발생 시
    if (err) {
      console.log('로그인 오류:', err); // 에러 로그 출력
      return res.status(500).json({ success: false }); // 클라이언트에 실패 응답 전송
    }

    // rows.length > 0이면 로그인 성공 (일치하는 회원 존재)
    if (rows.length > 0) {
      res.json({ success: true }); // 로그인 성공 응답 전송
    } else {
      res.json({ success: false }); // 일치하는 회원 없음 → 로그인 실패
    }
  });
});