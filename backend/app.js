
const cors = require('cors');//! 250624 🔥Access-Control-Allow-Origin - 가입 기능, 안하면 에러발생함
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');


// 🔗 라우터 불러오기
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const getMemberRouter = require('./routes/getMember');   // 🔄 이름 충돌 방지
const memberRouter = require('./routes/member');         // ✅ 회원가입/로그인
const productsRouter = require('./routes/products');     // ✅ 상품 목록
const purchaseRouter = require('./routes/purchase');     // ✅ 구매 처리

const app = express();

// 📌 미들웨어 설정
app.use(cors()); //! 250624 🔥Access-Control-Allow-Origin - 가입 기능, 안하면 에러발생함
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 📌 라우터 연결
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getMember', getMemberRouter);         // ✅ get 방식 - 개별 회원 조회
app.use('/products', productsRouter);           // ✅ get 방식 - 상품 목록 조회
app.use('/api/purchase', purchaseRouter);       // ✅ post 방식 - 상품 구매 처리
app.use('/api/members', memberRouter);          // ✅ 회원가입/로그인 기능

// 📌 에러 처리
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

module.exports = app;
