import { useState } from 'react';                        // [기본] React 상태 관리
import { Label, Input, Button } from 'reactstrap';        // [기본] UI 컴포넌트
import 'bootstrap/dist/css/bootstrap.min.css';            // [기본] Bootstrap 스타일 적용
import { useNavigate } from 'react-router-dom';           // [이동] 회원가입 성공 후 로그인 페이지 이동용
import './css/style.css';                                 // 🎨 공통 스타일 적용

function Register() {
  const [phone, setPhone] = useState('');                 // [기본] 전화번호 입력값
  const [password, setPassword] = useState('');           // [기본] 비밀번호 입력값

  const [phoneCheck, setPhoneCheck] = useState(false);    // [정규식] 전화번호 유효성
  const [phoneError, setPhoneError] = useState("");       // [정규식] 전화번호 에러 메시지

  const [passwordCheck, setPasswordCheck] = useState(false); // [정규식] 비밀번호 유효성
  const [passwordError, setPasswordError] = useState("");    // [정규식] 비밀번호 에러 메시지

  const phoneRegex = /^010\d{3,4}\d{4}$/;                 // [정규식] 010시작 10~11자리
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/; // [정규식] 문자+숫자+특수문자 8~16

  // [정규식] 전화번호 입력 유효성 검사
  const handlePhoneCheck = (e) => {
    const value = e.target.value;
    setPhone(value);                                      // [기본] 입력값 반영
    if (phoneRegex.test(value)) {                         // [정규식] 유효성 검사
      setPhoneCheck(true);
      setPhoneError("");
    } else {
      setPhoneCheck(false);
      setPhoneError("올바른 전화번호 형식이 아닙니다.");   // [정규식] 에러 메시지
    }
  };

  // [정규식] 비밀번호 입력 유효성 검사
  const handlePasswordCheck = (e) => {
    const value = e.target.value;
    setPassword(value);                                   // [기본] 입력값 반영
    if (passwordRegex.test(value)) {                      // [정규식] 유효성 검사
      setPasswordCheck(true);
      setPasswordError("");
    } else {
      setPasswordCheck(false);
      setPasswordError("비밀번호는 문자+숫자+특수문자 포함 8~16자리여야 합니다."); // [정규식] 에러 메시지
    }
  };

  const navigate = useNavigate();                        // [이동] 회원가입 성공 시 페이지 이동용

  // [회원가입] 회원가입 요청 처리 함수
  const handleRegister = async () => {
    if (!phoneCheck || !passwordCheck) {                  // [정규식] 유효성 미통과 시 안내
      alert("입력값을 다시 확인해 주세요.");
      return;
    }

    try {
      // [회원가입] 서버로 회원가입 요청
      const response = await fetch("http://localhost:3000/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password })
      });

      const data = await response.json();
      if (data.success) {                                // [회원가입] 성공
        alert("회원가입 성공!");
        navigate("/login");                              // [이동] 회원가입 성공 시 로그인 페이지로 이동
      } else {
        alert("회원가입 실패: " + data.message);         // [회원가입] 실패 메시지
      }
    } catch (err) {
      alert("서버 오류 발생: " + err.message);           // [회원가입] 서버 에러
    }
  };

  return (
    <div className="wrap-center"> {/* 🎨 전체 배경 및 정렬 */}
      <div className="member-wrap"> {/* 🎨 카드 형태의 로그인 영역 */}

        <div className="input-fld-pnl"> {/* 🎨 입력 필드 묶음 */}
          <Label for="phone" className="mt-2 label-title">전화번호</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="전화번호"
            value={phone}
            onChange={handlePhoneCheck} // [정규식] 전화번호 유효성 검사
          />
          {phone && !phoneCheck && (
            <div className="error-text">{phoneError}</div> // [정규식] 에러 출력
          )}
        </div>

        <div className="input-fld-pnl"> {/* 🎨 입력 필드 묶음 */}
          <Label for="password" className="mt-2 label-title">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordCheck} // [정규식] 비밀번호 유효성 검사
          />
          {password && !passwordCheck && (
            <div className="error-text">{passwordError}</div> // [정규식] 에러 출력
          )}
        </div>

        <div className="btn-fld-pnl mt-3"> {/* 🎨 버튼 영역 */}
          <div className="mx-3">
            <Button color="primary" outline onClick={handleRegister}>Register</Button>
            {/* [이동] 클릭 시 회원가입 요청 및 성공 시 이동 */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;                                 // [기본] 컴포넌트 내보내기