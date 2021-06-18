const mysql = require('mysql');
require ('dotenv').config();
const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD||'',
    database: "health_centre",
    multipleStatements: true
});
// con.connect(function(err) {
//     if (!err) {
//         console.log("Database is connected");
//     } else {
//         console.log("Error while connecting with database");
//         console.log(err);
//     }
// });
module.exports = con;
