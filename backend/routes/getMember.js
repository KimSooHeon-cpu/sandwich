var express = require('express');
var router = express.Router();

//?--------------------------------
let dao = require("../mariaDB/DAO");

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
  // 주의) 간혹 웹브라우저의 종류에 따라(MS IE(Internet Explorer) 11, SmartTV(스마트 TV) 등) 
  // 204 로 Http 상태 코드를 지정하는 경우도 있음
}

// CORS 추가 : localhost:3000 자체 테스트시에는 생략
const cors = require('cors');

var app = express();

// CORS 추가 : localhost:3000 자체 테스트시에는 생략
// app.use(cors());
//?-------------------------------- 

/* GET 방식 */
// router.get('/:phone', cors(corsOptions), function(req, res, next) {
// http://localhost:3000/getMember/01012345678
 router.get('/:phone', function(req, res, next) {

    console.log("개별 회원정보 조회");

    let phone = req.params.phone;

    dao.getMember(phone)
       .then((member) => {
          
          console.log("회원정보 : ", member);
                    
          res.json(member);
      })
      
  });

module.exports = router; 