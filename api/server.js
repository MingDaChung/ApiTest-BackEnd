var express = require("express");
var app = express();
var cors = require("cors");

const sql = require("msnodesqlv8");
const { rows } = require("mssql");

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

const connectionString =
  "server=(localdb)\\MSSQLLocalDB;Database=Youbike;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const query = "SELECT * FROM Youbike_table";

app.get("/", function(req, res) {
  sql.query(connectionString, query, (err, rows) => {
    let result = req.query.keyword
      ? rows.filter((rows) => rows.ar.indexOf(req.query.keyword) > -1) //if else 簡化
      : rows;
    res.send(result);
  });
});

app.listen(3000, function() {
  console.log("Server is running!");
});
