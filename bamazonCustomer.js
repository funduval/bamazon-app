const inquirer = require('inquirer');
const mysql = require('mysql');
const Table = require('tty-table');
const chalk = require('chalk');

//make all the variables global to use in any function

let data;
let item;
let productName;
let quantity;
let department;
let newQuant;

//creating connection to Jaws MariaDB

var connection = mysql.createConnection({
    host: "olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "otctzaj5ktg8bdja",
    password: "om6qg4tak4uuuel7",
    database: "r8hnulrvy9z046ju"
});

//call the new order function. I should make a new instance constructor for each order

newOrder();

function newOrder() {

    inquirer.prompt({
            name: "id",
            type: "input",
            message: "What item number would you like to search for?"
        })
        .then(function(answer) {

            //parses answer to just grab the value of id
            for (key in answer) {

                item = answer[key]

            }

            console.log(item)

            searchItem(item);

        });
}

function searchItem(item) {

    var query = "SELECT id, product_name, price, department_name, stock_quantity FROM products WHERE ?";

    connection.query(query, { id: item }, function(err, res) {

        for (key in res) {

            data = res[key]

        }

        console.log("\nYou searched for: " + data.product_name + "\nPrice: " + data.price);

        //parse all the values to store in global variables
        item = data.id
        productName = data.product_name
        price = data.price
        department = data.department_name
        quantity = data.stock_quantity
        nextQuestion(item, productName, price, department, quantity)

    });
}

function nextQuestion(item, productName, price, department, quantity) {

    inquirer.prompt({
            name: "amount",
            type: "input",
            message: "how many of " + productName + " would you like to order?"
        })
        .then(function(answer) {

            for (key in answer) {

                amount = answer[key]

            }

            console.log(amount);
            checkQuantity(item, productName, price, department, quantity, amount);

        });
}

function checkQuantity(item, productName, price, department, quantity, amount) {

    var query = "SELECT stock_quantity, product_name FROM products WHERE ?";

    console.log("I checked, we have " + quantity + " left of " + productName);

    ifOrder(item, productName, price, department, quantity, amount);
}

function ifOrder(item, productName, price, department, quantity, amount) {

    inquirer.prompt({
            name: "order confirmation",
            type: "confirm",
            message: "Would you like to order the " + productName + "?"
        })
        .then(function(answer) {

            console.log(answer);
            takeOrder(item, productName, price, department, quantity, amount);
        });
}

function takeOrder(item, productName, price, department, quantity, amount) {

    inquirer.prompt({
            name: "qty",
            type: "input",
            message: "How much or how many would you like to order?"
        })
        .then(function(answer) {
            for (key in answer) {

                amount = answer[key]

            }
            console.log("You have ordered " + amount + " items");
            checkInventory(item, productName, price, department, quantity, amount)

        });
}

    function checkInventory(item, productName, price, department, quantity, amount) {

        console.log("Checking inventory.");

        newQuant = quantity - amount

        if (newQuant < 5) {

            console.log("Good timing! There are only 5 orders left.")
            upDate(item, productName, price, department, quantity, newQuant, amount);
            calculateCost(item, productName, price, department, quantity, amount);


        } else if (newQuant === 0) {

            console.log("Oh no! We seem to be out of that inventory. Try again in a week or two. You will now be taken to a new order page.")

            newOrder();

        } else {

            upDate(item, productName, price, department, quantity, newQuant, amount);
            calculateCost(item, productName, price, department, quantity, amount);
        }
      }

    function calculateCost(item, productName, price, department, quantity, amount) {

        console.log("Your order comes to $" + price * amount);

        upDate(item, productName, price, department, quantity, amount);

    }

    function upDate(item, productName, price, department, quantity, newQuant, amount) {

      connection.connect(function(err) {

            newQuant = newQuant
            item = item

            var sql = "UPDATE products SET stock_quantity =" + newQuant.toString() + " WHERE ?";

            connection.query(sql, { id: item }, function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            });   
    });
                  newOrder();
  }
