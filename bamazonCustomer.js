const inquirer = require('inquirer');
const mysql = require('mysql');
const Table = require('tty-table');
const chalk = require('chalk');

//make all the variables global to use in any function
let data = [];
let item = 0;
let productName = "";
let price = 0;
let quantity = 0;
let department = "";
let newQuant = 0;
var smallArray = [];
var smallDataArray = [];
var rows = [];

//creating connection to Jaws MariaDB
var connection = mysql.createConnection({
    host: "olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "otctzaj5ktg8bdja",
    password: "om6qg4tak4uuuel7",
    database: "r8hnulrvy9z046ju"
});

// //call the new order function. Needs a new instance constructor for each new order.

start();

function start(){

connection.connect(function(err) {

    if (err) throw err;
  console.log("Connected!")

});  
} 

setTimeout(makeTable, 2000, rows)

setTimeout(newOrder, 3000);

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

 console.log(price)
    connection.query(query, { id: item }, function(err, res) {

        for (key in res) {

            data = res[key];
            smallArray.push(data);
            smallDataArray.push(data);
       

        }

        console.log("\nYou searched for: " + data.product_name + "\nPrice: " + data.price);

        //parse all the values to store in global variables
        item = data.id;
        productName = data.product_name;
        price = data.price;
        department = data.department_name;
        quantity = data.stock_quantity;
        rows = smallArray;
        smallTable(rows);
        nextQuestion(item, productName, price, department, quantity);

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

    console.log("We have " + quantity + " left of " + productName);

    ifOrder(item, productName, price, department, quantity, amount);
}

function ifOrder(item, productName, price, department, quantity, amount) {

    inquirer.prompt({
            name: "order_confirmation",
            type: "confirm",
            message: "Would you like to order the " + productName + "?"
        })
        .then(function(answer) {

            if (answer.order_confirmation === false) {

                console.log("No? Perhaps you'd like to order something else.")

                setTimeout(reset, 2000);
              

            }
            if (answer.order_confirmation === true) {

                takeOrder(item, productName, price, department, quantity, amount);

            }
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

            console.log("You have ordered " + amount + " " + productName + " Checking to see if we have that many in stock");
            setTimeout(checkInventory, 2000, item, productName, price, department, quantity, amount)

        });
}

function checkInventory(item, productName, price, department, quantity, amount) {

    newQuant = quantity - amount

    if (newQuant < 5) {
        rows = smallDataArray;
        console.log("Good timing! There are fewer than 5 orders left.")
        setTimeout(smallDataTable, 1500, rows)
        setTimeout(calculateCost, 2800, item, productName, price, department, quantity, amount);

    } else if (newQuant === 0) {
        rows = smallDataArray;
        console.log("Oh no! We seem to be out of that inventory. Try again in a week or two. You will now be taken to a new order page.")
        setTimeout(smallDataTable, 1500,rows)
                setTimeout(reset, 2000);
                

    } else {
        rows = smallDataArray;
        console.log("Alrighty, we've plenty of those!")
        setTimeout(smallDataTable, 1500, rows)
        setTimeout(calculateCost, 2800, item, productName, price, department, quantity, amount);

    }
}

function calculateCost(item, productName, price, department, quantity, amount) {

    console.log("Your order comes to $" + price * amount);

    upDate(item, productName, price, department, quantity, newQuant, amount);
                setTimeout(reset, 2000);
              
}

function upDate(item, productName, price, department, quantity, newQuant, amount) {
    console.log("updating databases")
    connection.connect(function(err) {

        var lessQuant = quantity - amount
        var id = item

        var sql = "UPDATE products SET stock_quantity =" + lessQuant.toString() + " WHERE ?";

        connection.query(sql, { id: id }, function(err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    });
}

function reset() {

    let data = [];
    let item = 0;
    let productName = "";
    let quantity = 0;
    let department = "";
    let newQuant = 0;
    var smallArray = [];
    var rows = [];
    setTimeout(makeTable,2000, rows);
    setTimeout(newOrder, 3000);

}

// // from tty-table documentation:
function makeTable(rows) {

    var query = "SELECT id, product_name, price, department_name FROM products";

    connection.query(query, function(err, res) {

            console.log("Query is made: ")       
            for (var i = 0; i < res.length; i++) {
                rows.push(res[i])
            }
          

        var header = [{
            value: "id",
            headerColor: "cyan",
            color: "grey",
            align: "left",
            paddingLeft: 5,
            width: 8
        }, {
            value: "product_name",
            headerColor: "yellow",
            color: "grey",
            align: "left",
            paddingLeft: 5,
            width: 40
        }, {
            value: "price",
            headerColor: "magenta",
            color: "grey",
            align: "left",
            paddingLeft: 5,
            width: 28
        }, {
            value: "department_name",
            headerColor: "green",
            color: "grey",
            align: "left",
            paddingLeft: 5,
            width: 40
        }]

        var footer = [
            "TOTAL",
            (function() {
                return rows.reduce(function(prev, curr) {
                    return prev + curr[1]
                }, 0)
            }()),
            (function() {
                var total = rows.reduce(function(prev, curr) {
                    return prev + ((curr[2] === 'yes') ? 1 : 0);
                }, 0);
                return (total / rows.length * 100).toFixed(2) + "%";
            }())
        ];

        var t2 = Table(header, rows, {
            borderStyle: 1,
            paddingBottom: 0,
            headerAlign: "center",
            align: "center",
            color: "white"
        });

        var str2 = t2.render(header, rows);
        console.log(str2);
});
    console.log("Attention shoppers! Select from these items by item id:");
};

function smallTable(rows) {

    var header = [{
        value: "id",
        headerColor: "cyan",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 8
    }, {
        value: "product_name",
        headerColor: "yellow",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 40
    }, {
        value: "price",
        headerColor: "magenta",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 28
    }, {
        value: "department_name",
        headerColor: "green",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 40
    }]

    var footer = [
        "TOTAL",
        (function() {
            return rows.reduce(function(prev, curr) {
                return prev + curr[1]
            }, 0)
        }()),
        (function() {
            var total = rows.reduce(function(prev, curr) {
                return prev + ((curr[2] === 'yes') ? 1 : 0);
            }, 0);
            return (total / rows.length * 100).toFixed(2) + "%";
        }())
    ];

    var t2 = Table(header, rows, {
        borderStyle: 1,
        paddingBottom: 0,
        headerAlign: "center",
        align: "center",
        color: "white"
    });

    var str2 = t2.render(header, rows);
    console.log(str2);

};

function smallDataTable(rows) {

    var header = [{
        value: "id",
        headerColor: "cyan",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 8
    }, {
        value: "product_name",
        headerColor: "yellow",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 40
    }, {
        value: "price",
        headerColor: "magenta",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 28
    }, {
        value: "department_name",
        headerColor: "green",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 40
    }, {
        value: "stock_quantity",
        headerColor: "cyan",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 40
    }]

    var footer = [
        "TOTAL",
        (function() {
            return rows.reduce(function(prev, curr) {
                return prev + curr[1]
            }, 0)
        }()),
        (function() {
            var total = rows.reduce(function(prev, curr) {
                return prev + ((curr[2] === 'yes') ? 1 : 0);
            }, 0);
            return (total / rows.length * 100).toFixed(2) + "%";
        }())
    ];

    var t2 = Table(header, rows, {
        borderStyle: 1,
        paddingBottom: 0,
        headerAlign: "center",
        align: "center",
        color: "white"
    });

    var str2 = t2.render(header, rows);
    console.log(str2);

};

function fullDataTable(rows) {

    var header = [{
        value: "id",
        headerColor: "cyan",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 8
    }, {
        value: "product_name",
        headerColor: "yellow",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 40
    }, {
        value: "price",
        headerColor: "magenta",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 28
    }, {
        value: "department_name",
        headerColor: "green",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 40
    }, {
        value: "stock_quantity",
        headerColor: "cyan",
        color: "grey",
        align: "left",
        paddingLeft: 5,
        width: 40
    }]

    var footer = [
        "TOTAL",
        (function() {
            return rows.reduce(function(prev, curr) {
                return prev + curr[1]
            }, 0)
        }()),
        (function() {
            var total = rows.reduce(function(prev, curr) {
                return prev + ((curr[2] === 'yes') ? 1 : 0);
            }, 0);
            return (total / rows.length * 100).toFixed(2) + "%";
        }())
    ];

    var t2 = Table(header, rows, {
        borderStyle: 1,
        paddingBottom: 0,
        headerAlign: "center",
        align: "center",
        color: "white"
    });

    var str2 = t2.render(header,rows);
    console.log(str2);

};
