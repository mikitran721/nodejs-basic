// get the client
// const mysql = require('mysql2');
// import mysql from "mysql2";
import mysql from "mysql2/promise.js";

console.log(`>>> connecting DB with pool`);
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
});
// create the connection to database
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "nodejsbasic",
// });

// simple query
// connection.query("SELECT * FROM `users`", function (err, results, fields) {
//   console.log(`>>> check mysql: `);
//   console.log(results); // results contains rows returned by server
//   console.log(results[0]);
//   //   console.log(fields); // fields contains extra meta data about results, if available
// });

export default pool;
