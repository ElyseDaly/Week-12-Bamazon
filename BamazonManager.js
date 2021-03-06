var mysql = require("mysql");
var inquirer = require("inquirer");

var config = require('./config.js');
var connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) throw err;




    var listManagerOptions = function() {
        inquirer.prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }).then(function(answer) {

            switch (answer.action) {
                case "View Products for Sale":
                    viewAllProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
            }
        });
    };

    var viewAllProducts = function() {
        connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                var productsList =
                    results[i].item_id + " - " + results[i].product_name + " | " +
                    "Department: " + results[i].department_name + " | " +
                    "Price: $" + results[i].price + " | " +
                    "Available Stock: " + results[i].stock_quantity;
                console.log(productsList);
            }
            listManagerOptions();
        })
    }

    var viewLowInventory = function() {
        connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                if (results[i].stock_quantity < 5) {
                    var productsList =
                        results[i].item_id + " - " + results[i].product_name + " | " +
                        "Department: " + results[i].department_name + " | " +
                        "Price: $" + results[i].price + " | " +
                        "Available Stock: " + results[i].stock_quantity;
                    console.log(productsList);
                }
            }
            listManagerOptions();
        })
    }

    var addInventory = function() {
            connection.query("SELECT * FROM products", function(err, results) {
                    if (err) throw err;
                    //prompt user for id of item they want to buy, and how many of that item
                    inquirer.prompt([{
                            name: "item_selection",
                            type: "input",
                            message: "What is the ID of the item you would you like to restock?"
                        }, {
                            name: "units",
                            type: "input",
                            message: "Enter how many units of this product you would like to restock"
                        }]).then(function(answer) {
                            //get the info about what item the user picked
                            var chosenItem;
                            for (var i = 0; i < results.length; i++) {
                                if (results[i].item_id == answer.item_selection) {
                                    chosenItem = results[i];
                                }
                                //console.trace(chosenItem);
                            } // end for loop

                            //update stock amount
                            var newStockAmount = chosenItem.stock_quantity + parseInt(answer.units);
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newStockAmount
                            }, {
                                item_id: chosenItem.item_id
                            }], function(error) {
                                if (error) throw err;
                                console.log("Stock Updated");
                                listManagerOptions();
                            });
                        }) // end .then function
                }) // end connection.query
        } // end userSelectProduct function

    var addProduct = function() {
        inquirer.prompt([{
            name: "product_name",
            type: "input",
            message: "What is the name of the product you would like to add?"
        }, {
            name: "department_name",
            type: "input",
            message: "What department would you like to place your product in?"
        }, {
            name: "price",
            type: "input",
            message: "What would you like the price to be?",
        }, {
            name: "stock_quantity",
            type: "input",
            message: "How much of the item would you like to add?"
        }]).then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query("INSERT INTO products SET ?", {
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
                stock_quantity: answer.stock_quantity
            }, function(err) {
                if (err) throw err;
                console.log("Your item was created successfully!");
                // re-prompt the user for if they want to bid or post
                listManagerOptions();
            });
        });
    };



    listManagerOptions();
}); // end of connection.connect
