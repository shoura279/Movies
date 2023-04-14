const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "camp23",
  port: "3306",
});
module.exports = pool;
