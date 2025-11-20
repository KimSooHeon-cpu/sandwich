//& 🔗 해당 jsx는 상품 목록 정보랑 연동 (DB테이블 연동은 안함)
import React from 'react';                              // [기본] React 사용
import { useNavigate } from 'react-router-dom';         // 🔓 로그아웃 후 페이지 이동 처리용
import './css/style.css';                               // 🎨 Glassmorphism 스타일 적용

const ProductDetail = ({ image, title, productId, price, onBuy, onBack }) => { // [상세] props로 상품 데이터 및 버튼 이벤트 받음
    //&🔗 [연동1] 상품 데이터(props)
    //&🔗 └→ ProductList.jsx에서 상세페이지로 상품 정보 전달

  const navigate = useNavigate();                       // 🔓 로그아웃 후 목록 페이지 이동용
    //&🔗 [연동2] 라우팅 처리 (페이지 이동)
    //&🔗 └→ react-router-dom 라이브러리와 연동
  const userPhone = localStorage.getItem("userPhone");  // 🪪 로그인된 사용자 전화번호 불러오기
    //&🔗 [연동3] 로그인 정보 확인
    //&🔗 └→ 브라우저 localStorage(로그인/회원정보)와 연동

  // 🔓 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem("userPhone");               // 🔓 로그인 정보 제거
    navigate("/productList");                           // 🔓 로그아웃 후 목록으로 이동
    //&🔗 [연동4] 로그아웃 및 페이지 이동
    //&🔗 └→ localStorage(로그아웃 처리) + productList로 라우팅 이동
  };

  return (
    <div className="product-container"> {/* 🎨 전체 상세 페이지 배경 그라데이션 + 중앙 정렬 */}

      {/* 🪪 상단 우측 로그인 정보 + 로그아웃 버튼 */}
      <div className="top-right-buttons"> {/* 🎨 우측 상단 위치 고정 */}
        {userPhone ? (
          <>
            <span className="user-info">🪪 {userPhone} 님</span>
            <button className="top-btn" onClick={handleLogout}>🔓 로그아웃</button>
          </>
        ) : (
          <>
            <button className="top-btn" onClick={() => navigate("/login")}>로그인</button>
            <button className="top-btn" onClick={() => navigate("/register")}>회원가입</button>
          </>
        )}
      </div>

      <div className="product-content"> {/* 🎨 상세 정보 카드 (Glassmorphism + Flex 레이아웃) */}

        <div className="image-box"> {/* 🎨 상품 이미지 카드 왼쪽 영역 */}
          <img src={`/images/${image}`} alt={title} className="product-image" /> {/* 🎨 이미지 자체도 반응형 처리 */}
          {/*//&🔗 [연동5] 이미지 경로 연결 */}
          {/*//&🔗 └→ public/images 폴더(서버에 저장된 이미지 파일)와 연동 */}
        </div>

        <div className="info-box"> {/* 🎨 상품 정보 텍스트 및 버튼 우측 영역 */}
          <h2>{title}</h2> {/* [상세] 상품명 */}
          <p>상품아이디: {productId}</p> {/* [상세] 상품 ID */}
          <p>가격: ₩{price.toLocaleString()}</p> {/* [상세] 가격 (3자리 단위 쉼표) */}
          <button className="buy-button" onClick={onBuy}>Buy</button> {/* 🎨 [구매] 버튼 디자인 적용 */}
          {/*//&🔗 [연동6] onBuy 함수 */}
          {/*//&🔗 └→ 상위 컴포넌트(ProductList.jsx 또는 App.jsx)에서 구매 처리 로직 연동 */}
        </div>
      </div>

      <button className="list-button" onClick={onBack}>List</button> {/* 🎨 [버튼][목록] 목록으로 복귀 버튼 */}
      {/*//&🔗 [연동7] onBack 함수 */}
      {/*//&🔗 └→ 목록 페이지로 이동 (ProductList.jsx 등 라우터와 연동) */}
    </div>
  );
};

export default ProductDetail;                           // [기본] 컴포넌트 내보내기
