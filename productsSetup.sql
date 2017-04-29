create database Bamazon;

use Bamazon;

create table products (
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
KEY VALUE (item_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Swagtron T6 Off-Road Hoverboard (Desert Camouflage)', 'Electronics', 500.00, 25);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ('Jumbo Rice Krispy Treat', 'Food and Drink', 5.00, 2000);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ('Crocs', 'Apparel', 14.99, 10000);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ('Whoopi Cushion', 'Toys and Games', 2.00, 100);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ('Ciroc Vodka', 'Food and Drink', 41.00, 200);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ('Juicero', 'Appliances', 399.99, 40);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ('Gioberti Boys Satin Formal Cummerbund Set', 'Apparel', 9.00, 550);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ('Star Legacy 18 Gauge Steel White Embrace Casket', 'Furniture', 1362.50, 1);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ('Nostalgia HDT600RetroRed Pup-Up Hot Dog Toaster', 'Appliances', 19.50, 30);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ('Jackalope Wall Mount (Rabbit With Antlers)', 'Sports', 120.00, 40);