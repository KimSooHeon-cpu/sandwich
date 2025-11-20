// 파일명: ProductList.jsx
import React, { useEffect, useState } from 'react';             // [기본] React 훅 사용
import { useNavigate } from 'react-router-dom';                 // 🔓 로그아웃 후 이동 처리용
import './css/style.css';                                       // 🎨 공통 스타일 적용

// 🔍 상세 진입용 단일 상품 카드 컴포넌트
function ProductCard({ product, onSelectProduct }) {
  return (
    <div
      className="wear-pnl"                      // 🎨 카드 전체 틀
      onClick={() => onSelectProduct(product)}
      style={{ cursor: 'pointer' }}
    >
      <div className="wear-gallery-pic">        {/* 🎨 이미지 박스 */}
        <img src={`/images/${product.image}`} alt={product.name} />
      </div>
      <div className="wear-name">{product.name}</div>   {/* 🎨 상품명 텍스트 */}
      <div className="wear-price">              {/* 🎨 가격 텍스트 */}
        {product.price.toLocaleString()}원
      </div>
    </div>
  );
}

function ProductList({ onSelectProduct }) {
  const [products, setProducts] = useState([]);                 // [목록] 상품 목록 상태
  const navigate = useNavigate();                               // 🔓 로그아웃 시 페이지 이동용
  const userPhone = localStorage.getItem("userPhone");          // 🪪 로그인된 사용자 전화번호 불러오기

  useEffect(() => {                                               // 백엔드 서버 DB 요청
    fetch("http://localhost:3000/products")                       // 백엔드 서버 - 상품 목록(products) 테이블에 있는 DB 요청
      .then((res) => res.json())                                  // DB 데이터를 JSON으로 변환
      .then((data) => setProducts(data))                          // 변환된 데이터 저장
      .catch((err) => console.error("상품 목록 로딩 실패:", err));  // 위 과정 중 에러 발생하면 메시지 출력
  }, []);                                                         // 첫 렌더링 때 한 번만 실행

  // 🔓 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem("userPhone");                       // 🔓 저장된 로그인 정보 제거
    navigate("/productList");                                   // 🔓 목록 페이지로 강제 이동
  };

  return (
    <>
      {/* 🪪 상단 우측 고정 로그인 정보 및 로그아웃 버튼 */}
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

      {/* 🎨 상품 목록 중앙 정렬 */}
      <div className="wrap">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </>
  );
}

export default ProductList;