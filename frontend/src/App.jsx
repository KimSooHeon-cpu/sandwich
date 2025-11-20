import { useState, useEffect } from "react"; // [로그인] 상태 관리 및 로그인 유지 감지
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'; // [목록][상세][로그인][로그아웃] 라우팅 관련 훅 및 컴포넌트
import { useNavigate } from 'react-router-dom'; //! [상세] 화면 이동 import - useNavigate

import Login from './Login'; // [로그인]
import Register from './Register'; // [회원가입]
import ProductList from './ProductList';   // [목록] 실제 목록 파일
import ProductDetail from './ProductDetail'; // [상세] 실제 상세 파일

import './css/style.css'; // 🎨 전체 공통 스타일(CSS) 적용

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // [로그인] 로그인 상태 값
  const [userPhone, setUserPhone] = useState(null); // 🪪 로그인된 사용자 전화번호 상태
  const [selectedProduct, setSelectedProduct] = useState(null); // [상세] 선택 상품 저장
  const location = useLocation(); // [목록][상세][로그인][로그아웃] 현재 URL 확인
  const navigate = useNavigate(); // [상세] 화면 이동 기능 

  // 🆕 로그인 상태 복원 처리 (새로고침 대비)
  useEffect(() => {
    const savedPhone = localStorage.getItem("userPhone");
    if (savedPhone) {
      setIsLoggedIn(true);         // [로그인] 상태 true로 설정
      setUserPhone(savedPhone);    // 🪪 전화번호 복원
    }
  }, []);

  // [로그아웃] 로그아웃 버튼 클릭 처리
  const handleLogout = () => {
    setIsLoggedIn(false);                         // [로그인] 상태 초기화
    localStorage.removeItem("userPhone");         // 🔓 저장된 전화번호 제거
    setUserPhone(null);                           // 🔓 상태에서도 제거
    navigate("/productList");                     // 🔓 로그아웃 시 상품 목록으로 이동
  };

  // [로그인] 로그인/회원가입 페이지에서는 버튼 숨김
  const hideButtons = location.pathname === '/login' || location.pathname === '/register';

  // [상세] 상품 클릭 시 상세 진입
  const handleSelectProduct = (product) => {
    setSelectedProduct(product); // 상품 데이터 저장
    navigate(`/productList/${product.id}`); //! 이동: 상품 클릭하면 /productList/상품id 상세로 이동
  };

  // [목록] 상세 보기에서 목록으로 복귀
  const handleBack = () => {
    setSelectedProduct(null);
    navigate("/productList"); //! 이동: 상세에서 목록으로 복귀 시 /productList로 이동 
  };

  // [구매] 구매 버튼 클릭 시 DB에 정보 전송
  const handleBuy = () => {
    const phone = localStorage.getItem("userPhone"); // 🪪 로그인된 전화번호 불러오기
    if (!phone) {
      alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      navigate("/login");
      return;
    }

    const payload = {
      phone,
      product_id: selectedProduct.id,
      quantity: 1
    };

    fetch("http://localhost:3000/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("구매가 완료되었습니다.");
        } else {
          alert("구매 실패: " + data.message);
        }
      })
      .catch(err => {
        console.error("구매 중 에러:", err);
        alert("구매 중 오류 발생");
      });
  };

  return (
    <div className="glass-box"> {/* 🎨 전체 wrapper에 스타일 적용 */}
      <h1 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>Sandwich Order</h1> {/* 🎨 제목 꾸밈 */}

      <Routes>
        <Route path="/register" element={<Register />} /> {/* [로그인] 회원가입 폼 */}
        <Route path="/login" element={
          <Login onLogin={() => {
            const savedPhone = localStorage.getItem("userPhone"); // 🪪 로그인 후 phone 설정
            setIsLoggedIn(true);
            setUserPhone(savedPhone);
          }} />
        } />
        <Route
          path="/productList"
          element={<ProductList onSelectProduct={handleSelectProduct} />} // [목록] 상품 목록
        />
        <Route
          path="/productList/:id"
          element={
            selectedProduct 
            ? (
              <ProductDetail
                image={selectedProduct.image}
                title={selectedProduct.name}
                productId={selectedProduct.id}
                price={selectedProduct.price}
                onBuy={handleBuy} // [구매]
                onBack={handleBack}
              />
            ) : (
              <Navigate to="/productList" /> //* 🚨 강제 리디렉트: 선택된 상품 없으면 목록으로 이동
            )
          }
        />
        <Route
          path="/"
          element={<ProductList onSelectProduct={handleSelectProduct} />} // 루트(/)도 목록으로 이동
        />
      </Routes>

      {/* [로그인 상태별 버튼 제어] */}
      {!hideButtons && !isLoggedIn ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}> {/* 🎨 버튼 정렬 */}
          {/* <Link to="/register"><button>회원가입</button></Link>
          <Link to="/login"><button>로그인</button></Link> */}
        </div>
      ) 
      : (
        isLoggedIn && (
          <div style={{ textAlign: "center", marginTop: "20px" }}> {/* 🎨 로그인 시 로그아웃 영역 */}
            {/* <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#fff' }}>
              🪪 {userPhone} 님
            </span> */}
            {/* <button onClick={handleLogout}>🔓 로그아웃</button>  */}
          </div>
        )
      )
      }
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent /> {/* useLocation 훅은 Router 안에서만 사용 가능해서 별도 컴포넌트로 분리 */}
    </Router>
  );
}

export default App;