var mysql = require("mysql");
var inquirer = require("inquirer");

var config = require('./config.js');
var connection = mysql.createConnection(config);

//connect to mysql
connection.connect(function(err) {
    if (err) throw err;

    console.log("Connected as ID: " + connection.threadId);

    //starts the app. calls the function that displays all products
    var start = function() {
        connection.query("SELECT * FROM products", function(err, result) {
            if (err) throw err;
            return (printBamazonItems(result));
        });
    }

    //display all products available, then calls function that prompts user to select a product
    var printBamazonItems = function(products) {
        console.log("Welcome! Below are all our products.");
        for (var i = 0; i < products.length; i++) {
            var productsList =
                products[i].item_id + " - " + products[i].product_name + "\r\n" +
                "       Department: " + products[i].department_name +
                "   Price: $" + products[i].price +
                "   Available Stock: " + products[i].stock_quantity;
            console.log(productsList);
        }
        userSelectProduct();
    }


    var userSelectProduct = function() {
    	connection.query("SELECT * FROM products", function(err, results) {
    		if (err) throw err;
    		//prompt user for id of item they want to buy, and how many of that item
	        inquirer.prompt([
	        	{
	                name: "item_selection",
	                type: "input",
	                message: "What is the ID of the item you would you like to buy?"
	            }, {
	                name: "units",
	                type: "input",
	                message: "Enter how many units of this product you would like to buy"
	            }
	        ]).then(function(answer) {
	        	//get the info about what item the user picked
	        	var chosenItem;
      			for (var i = 0; i < results.length; i++) {
        			if (results[i].item_id == answer.item_selection) {
          				chosenItem = results[i];
        			}
        			//console.trace(chosenItem);
      			} // end for loop
      			if (chosenItem.stock_quantity < parseInt(answer.units) || chosenItem.stock_quantity == 0) {
      				console.log("Insufficient quantity! There's only " + chosenItem.stock_quantity + " " + chosenItem.product_name + " available. Please try again.");
                    userSelectProduct();
      			}
      			else {
      				//update stock amount
      				var newStockAmount = chosenItem.stock_quantity - answer.units;
      				connection.query("UPDATE products SET ? WHERE ?", [{
          				stock_quantity: newStockAmount
        				}, {
          				item_id: chosenItem.item_id
        			}], function(error) {
          				if (error) throw err;
          				console.log("Stock Updated. There are now " + chosenItem.stock_quantity + " " + chosenItem.product_name + "'s available");
        			});
      				//calculate and tell user their total cost
      				var totalCost = (answer.units*chosenItem.price);
      				console.log("The total cost of your order is: $" + totalCost + "   Thanks for your order!");
      				userSelectProduct();
      			}
	        }) // end .then function
	    }) // end connection.query
    } // end userSelectProduct function

    start();
    
});// end of connection.connect
