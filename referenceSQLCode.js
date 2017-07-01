var mysql = require("mysql");
const Table = require('../');
const chalk = require('chalk');
const fs = require('fs');
const inquirer = require('fs');
const mysql = require('mysql');


function itemSearch() {
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "What item number would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT item, price FROM products WHERE ?";
      connection.query(query, { id: answer.id }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("id: " + res[i].id + " || item: " + res[i].item + " || Price: " + res[i].price);
        }
        runSearch();
      });
    });
}





// var header = [
//   {
//     value : "id",
//     headerColor : "yellow",
//     color: "blue",
//     align : "left",
//     paddingLeft : 5,
//     width : 30
//   },
//   {
//     value : "item",
//     headerColor : "cyan",
//     color: "white",
//     align : "left",
//     paddingLeft : 5,
//     width : 30
//   },
//   {
//     value : "price",
//     color : "red", 
//     width : 10,
//     formatter : function(value){
//       var str = "$" + value.toFixed(2);
//       if(value > 5){
//         str = chalk.underline.green(str);
//       }
//       return str;
//     }
//   },
//   
// ];

// var rows = [
//   {
//     item : "hamburger",
//     price : 2.50,
//     organic : "no"
//   },
//   {
//     item : "el jefe's special cream sauce",
//     price : 0.10,
//     organic : "yes"
//   },
//   {
//     item : "two tacos, rice and beans topped with cheddar cheese",
//     price : 9.80,
//     organic : "no"
//   },
//   {
//     item : "apple slices",
//     price : 1.00,
//     organic : "yes"  
//   },  
//   {
//     item : "ham sandwich",
//     price : 1.50,
//     organic : "no"
//   },
//   {
//     item : "macaroni, ham and peruvian mozzarella",
//     price : 3.75,
//     organic : "no"
//   }
// ];


var connection = mysql.createConnection({
  host: "olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
  port: 3306,
  user: "otctzaj5ktg8bdja",
  password: "om6qg4tak4uuuel7",
  database: "r8hnulrvy9z046ju"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  afterConnection2();
  afterConnection3();
});

function afterConnection() {
  connection.query("SELECT * FROM top5000", function(err, res) {
    if (err) throw err;
    console.log(res);
  });
}

function afterConnection2() {
  connection.query("SELECT * FROM top5000 WHERE artist = 'Celine Dion'", function(err, res) {
    if (err) throw err;
    console.log(res);
  });
}

function afterConnection3() {
  connection.query("SELECT * FROM top5000 WHERE YEAR > 1995", function(err, res) {
    if (err) throw err;
    console.log(res);
  });
}


