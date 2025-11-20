import { useState } from 'react';                     // [기본] 상태 관리 기능 사용
import { Label, Input, Button } from 'reactstrap';    // [기본] UI 컴포넌트
import 'bootstrap/dist/css/bootstrap.min.css';        // [기본] Bootstrap 스타일 적용
import { useNavigate } from 'react-router-dom';       // [회원가입][로그인][이동] 페이지 이동 기능
import './css/style.css';                             // 🎨 공통 스타일 적용

function Login({ onLogin }) {                         // 🪪 로그인 성공 후 상태 변경 콜백 받음
  const navigate = useNavigate();                     // [회원가입][로그인][이동] 페이지 이동 사용

  const [phone, setPhone] = useState('');             // [기본] 전화번호 입력값 저장
  const [password, setPassword] = useState('');       // [기본] 비밀번호 입력값 저장

  // [정규식] 유효성 상태 및 에러 메시지
  const [phoneCheck, setPhoneCheck] = useState(false);        // [정규식] 전화번호 유효성 상태
  const [phoneError, setPhoneError] = useState("");           // [정규식] 전화번호 에러 메시지
  const [passwordCheck, setPasswordCheck] = useState(false);  // [정규식] 비밀번호 유효성 상태
  const [passwordError, setPasswordError] = useState("");     // [정규식] 비밀번호 에러 메시지

  // [정규식] 패턴 정의
  const phoneRegex = /^010\d{3,4}\d{4}$/;                     // [정규식] 010으로 시작, 10~11자리
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/; // [정규식] 영문/숫자/특수문자 조합 8~16자리

  // [정규식] 전화번호 입력 변화 시 체크
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);                                  // [기본] 입력값 상태 저장
    if (phoneRegex.test(value)) {                     // [정규식] 유효성 체크
      setPhoneCheck(true);                            // [정규식] 유효함
      setPhoneError("");                              // [정규식] 에러 초기화
    } else {
      setPhoneCheck(false);                           // [정규식] 유효하지 않음
      setPhoneError("010으로 시작하는 10~11자리 숫자"); // [정규식] 에러 메시지
    }
  };

  // [정규식] 비밀번호 입력 변화 시 체크
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);                               // [기본] 입력값 상태 저장
    if (passwordRegex.test(value)) {                  // [정규식] 유효성 체크
      setPasswordCheck(true);                         // [정규식] 유효함
      setPasswordError("");                           // [정규식] 에러 초기화
    } else {
      setPasswordCheck(false);                        // [정규식] 유효하지 않음
      setPasswordError("영문, 숫자, 특수문자 조합 8~16자"); // [정규식] 에러 메시지
    }
  };

  // [로그인] 로그인 요청 처리 함수
  const handleLogin = async () => {
    if (!phoneCheck || !passwordCheck) {
      alert("입력값을 다시 확인해 주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/members/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password })
      });

      const data = await response.json();
      if (data.success) { // [로그인] 로그인 성공 처리
        alert("로그인 성공!");

        localStorage.setItem("userPhone", phone);         // 🪪 로그인한 전화번호 저장
        if (onLogin) onLogin(phone);                      // 🪪 App.jsx에 전화번호 전달

        navigate("/productList");                         // [이동] 로그인 성공 시 상품 목록 페이지로 이동
      } else {
        alert("로그인 실패: " + data.message); // [로그인] 실패 메시지
      }
    } catch (err) {
      alert("서버 오류 발생: " + err.message); // [로그인] 서버 에러
    }
  };

  return (
    <div className="wrap-center"> {/* 🎨 전체 레이아웃 박스 */}
      <div className="member-wrap"> {/* 🎨 로그인 카드 컨테이너 */}

        {/* [기본] 전화번호 입력 */}
        <div className="input-fld-pnl"> {/* 🎨 입력 필드 패널 */}
          <Label for="phone" className="mt-2 label-title">
            전화번호
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="전화번호"
            value={phone}
            onChange={handlePhoneChange}      // [정규식] 전화번호 입력 유효성 체크
          />
          {phone && !phoneCheck && (
            <div className="error-text">{phoneError}</div> // [정규식] 에러 메시지 출력
          )}
        </div>

        {/* [기본] 비밀번호 입력 */}
        <div className="input-fld-pnl"> {/* 🎨 입력 필드 패널 */}
          <Label for="password" className="mt-2 label-title">
            비밀번호
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}    // [정규식] 비밀번호 입력 유효성 체크
          />
          {password && !passwordCheck && (
            <div className="error-text">{passwordError}</div> // [정규식] 에러 메시지 출력
          )}
        </div>

        {/* [로그인][회원가입] 버튼 영역 */}
        <div className="btn-fld-pnl mt-3"> {/* 🎨 버튼 묶음 컨테이너 */}
          <div className="mx-3">
            <Button color="primary" outline onClick={handleLogin}>로그인</Button>
            {/* [로그인] 클릭 시 로그인 처리 */}
          </div>
          <div className="mx-3">
            <Button color="primary" outline onClick={() => navigate("/register")}>회원가입</Button>
            {/* [이동] 클릭 시 회원가입 페이지 이동 */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;