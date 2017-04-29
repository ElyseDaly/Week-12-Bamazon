var mysql = require("mysql");
var inquirer = require("inquirer");

var config = require('./config.js');
var connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) throw err;
    listManagerOptions();
});

var listManagerOptions = function() {
	inquirer.prompt({
        name: "action",
        type: "list",
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
