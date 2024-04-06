const express = require("express");
//const dotenv= require('dotenv')
const app = express();
app.use(express.json);

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sales",
});

let component2, component4, component6;

app.listen(5000, () => {
  connection.connect();

  connection.query("SELECT * FROM Component2", (err, rows, fields) => {
    if (err) throw err;
    component2 = rows;
    console.log("The solution is: ", rows);
  });
  connection.query("SELECT * FROM Component4", (err, rows, fields) => {
    if (err) throw err;
    component4 = rows;
   // console.log("The solution is: ", rows);
  });

  connection.query("SELECT * FROM Component6", (err, rows, fields) => {
    if (err) throw err;
    component6 = rows;
   // console.log("The solution is: ", rows);
  });

  //   //   connection.end();
  console.log("open on port 5000");
});