const mysql = require('mysql');
const inquirer = require('inquirer');
let id;

// make a variable that has the database connection info
const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

// FUNCTIONS ====================================================================

function start() {
    // display products and ask for input
    let query = "SELECT * FROM products";
    connection.query(query, (err, res) => {
        // catch the error or show the data
        (err) ? console.log(err): console.table(res)
        connection.end();
        let limit = res.length;

        // ask the user for a choice
        inquirer
            .prompt([
                // ask for the product the user wants to buy
                {
                    name: "itemID",
                    type: "input",
                    message: "Enter the number (item_id) of product you want to buy.",
                    validate: (value) => {
                        // if the value is a number, it passes the test
                        var pass = value.match(/\d/);
                        if (pass) {
                            return true;
                        }
                        return 'Please enter a valid number';
                    }
                }
            ])
            .then(answers => {
                // verify the answer is valid, else restart
                if (answers.itemID > 0 && answers.itemID <= limit) {
                    id = answers.itemID;
                    console.log(`Your choice: ${id}`);
                    
                    // ask how many units the user wants to buy
                    howMany();
                } else {
                    console.log(`The number isn't within range. Try starting over...`);
                }
            });
    });
}

// function that asks how many units the user wants
function howMany() {
    inquirer
        .prompt({
            name: "numUnits",
            type: "input",
            message: "How many units do you want to buy?",
            validate: (value) => {
                // if the value is a number, it passes the test
                var pass = value.match(/\d/);
                if (pass) {
                    return true;
                }
                return 'Please enter a valid number';
            }
        })
        .then(answers => {
            console.log(`You want to buy: ${answers.numUnits} units`);
            // attempt to fulfill the order
            fulfillOrder(answers.numUnits);
        });
}

function fulfillOrder(units) {

}

// MAIN CODE =====================================================================

// connect to the DB
connection.connect((err) => {
    // display the error message or start the app
    (err) ? console.log(err): start()
});