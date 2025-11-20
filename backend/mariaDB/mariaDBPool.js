
const maria = require('mariadb'); 
// https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/master/documentation/promise-api.md


const pool = maria.createPool({
    host : '127.0.0.1',
    port : 3306,
    user:'root',
    password:'1234',
    database: 'sandwich_db',
    connectionLimit : 1000
});

module.exports = pool; 