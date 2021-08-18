var express = require("express");
var app = express();
var cors = require("cors");
// var paginate = require("./youbike");
const sql = require("msnodesqlv8");
const { rows } = require("mssql");

var page = 1;
var numPerPage = 10;
var skip = (page - 1) * numPerPage;
var limit = `ORDER BY sno OFFSET ${skip} ROWS FETCH NEXT ${numPerPage} ROWS ONLY`;

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

const connectionString =
  "server=(localdb)\\MSSQLLocalDB;Database=Youbike;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
// const query = "SELECT * FROM Youbike_table";

app.get("/", function(req, res) {
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var numPerPage = 10;
  var skip = (page - 1) * numPerPage;
  var limit = `ORDER BY sno OFFSET ${skip} ROWS FETCH NEXT ${numPerPage} ROWS ONLY`;
  let keyword = req.query.keyword
    ? `WHERE ar LIKE N'%${req.query.keyword}%' `
    : " ";
  sql.query(
    connectionString,
    "SELECT COUNT(*) AS numRows FROM Youbike_table",
    function(err, rows, fields) {
      if (err) {
        console.log("error: ", err);
      } else {
        var numRows = rows[0].numRows;
        var numPages = Math.ceil(numRows / numPerPage);
        console.log("SELECT * FROM Youbike_table " + keyword + limit);
        sql.query(
          connectionString,
          "SELECT * FROM Youbike_table " + keyword + limit,
          function(err, rows, fields) {
            if (err) {
              console.log("error: ", err);
            } else {
              // console.log(rows);
              // let result = req.query.keyword
              //   ? rows.filter((rows) => rows.ar.indexOf(req.query.keyword) > -1) //if else 簡化
              //   : rows;
              res.send(rows);
            }
          }
        );
      }
    }
  );
});
// app.get("/", function(req, res) {
//   sql.query(connectionString, query, (err, rows) => {
//     let result = req.query.keyword
//       ? rows.filter((rows) => rows.ar.indexOf(req.query.keyword) > -1) //if else 簡化
//       : rows;
//     res.send(result);
//   });
// });

app.listen(3000, function() {
  console.log("Server is running!");
});
