// 로그인 버튼 클릭 시 실행되는 함수
const handleLogin = async () => {

  // 전화번호 또는 비밀번호 유효성 통과 못하면 로그인 중단
  if (!phoneCheck || !passwordCheck) {
    alert("입력값을 다시 확인해 주세요.");
    return;
  }

  try {
    // 서버에 로그인 요청 전송 (POST 방식)
    const response = await fetch("http://localhost:3000/api/members/login", {
      method: "POST", // 로그인은 항상 POST 방식 사용
      headers: { "Content-Type": "application/json" }, // 전송 형식은 JSON
      body: JSON.stringify({ phone, password }) // 입력값을 JSON 문자열로 변환
    });

    // 서버 응답을 JSON으로 변환
    const data = await response.json();

    if (data.success) {
      alert("로그인 성공!");

      // 로그인 성공 시 사용자 전화번호를 localStorage에 저장
      localStorage.setItem("userPhone", phone);

      // App.jsx에 로그인 성공 상태를 전달하는 콜백 실행
      if (onLogin) onLogin(phone);

      // 상품 목록 페이지로 이동
      navigate("/productList");
    } else {
      alert("로그인 실패: " + data.message); // 서버가 보낸 실패 메시지 표시
    }
  } catch (err) {
    alert("서버 오류 발생: " + err.message); // 네트워크 또는 서버 오류 처리
  }
};