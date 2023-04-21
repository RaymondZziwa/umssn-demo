const mysql = require('mysql2')

var pool = mysql.createPool({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE,
    connectionLimit : 100
});
 
exports.pool = pool;