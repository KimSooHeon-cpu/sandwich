import { StrictMode } from 'react'                  // [기본] React의 엄격 모드 적용 (개발용)
import { createRoot } from 'react-dom/client'        // [기본] React 18+의 root 렌더링 방식 사용
import './index.css'                                 // [기본] 전체 스타일 적용
import App from './App.jsx'                          // [기본] App 컴포넌트 import

createRoot(document.getElementById('root')).render(  // [기본] id='root'인 DOM에 렌더링
  // [기본] 자식 컴포넌트에 엄격 모드 적용
  // [기본] 최상위 App 컴포넌트 렌더링
  <StrictMode>
    <App /> 
  </StrictMode>,
)
