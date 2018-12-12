DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT(10)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Water bottle", "Kitchen accessories", 1.50, 45), 
("Computer mouse", "Electronics", 30.00, 34),
("Tupperware", "Kitchen accessories", 5, 8),
("Mousepad", "Electronics", 10, 77),
("Chair", "Home furniture", 20, 51),
("Table", "Home furniture", 55, 3),
("Laptop", "Electronics", 1000, 9),
("Backpack", "Accessories", 25, 34),
("Coffee", "Food and drink", 2.69, 23),
("Notepad", "Stationaries", 3.5, 72);
