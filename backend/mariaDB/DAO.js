const pool = require('./mariaDBPool');

// https://ko.javascript.info/import-export
let dao = {

    // insertUser function
    // ! getMember로 만들어야 함
    getMember : async function(phone) {

        let conn; 
        let member; //! member라는 객체를 만들어야 함
        console.log("회원 전화번호: ", phone); //! 콘솔

        try {
            conn = await pool.getConnection();
            console.log("connection : ", conn);

            // https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/master/documentation/promise-api.md#close--void
            member = await conn.query('SELECT * FROM members WHERE phone = ?', phone); //! members에 있는 회원 정보 조회하기

            // console.log(res);
            // msg = "저장 성공";

        } catch (err) {

            console.error("err :", err);
            //msg = "저장 실패";

        } finally {

            if (conn == true) await conn.end();
        } //

        //console.log("getMember : ", msg); // ge

        //return await msg; 
        return await member;

    } // getMember

} // class

module.exports = dao;