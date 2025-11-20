import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProductList from './ProductList';
import TempProductDetailWrapper from './TempProductDetailWrapper'; // ✅ 테스트용

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<TempProductDetailWrapper />} /> {/* ✅ 테스트 연결 */}
      </Routes>
    </Router>
  );
}
{/* 기존 상품 해출 경로...테스트 완료 후, 주석 해제 */}
{/* <Route path="/products/:id" element={<ProductDetail />} />  */}

export default App;