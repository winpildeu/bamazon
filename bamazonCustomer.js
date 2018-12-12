const mysql = require('mysql');
const inquirer = require('inquirer');

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
        (err) ? console.log(err): console.table(res)

        // ask the user for a choice
        inquirer
            .prompt([
                // ask for the product the user wants to buy
                {
                    name: "wantBuy",
                    type: "input",
                    message: "Enter the number (item_id) of  product you want to buy."
                    
                }
            ])
            .then(answers => {
                // save the answer for semantics
                let itemID = answers.wantBuy;

                // verify there's an answer
                console.log(`Your choice: ${itemID}`);
            });

        // end the connection to the DB
        connection.end();
    });
}

// function that display all of the data in the table
function displayTable() {}

// MAIN CODE =====================================================================

// connect to the DB
connection.connect((err) => {
    // display the error message or start the app
    (err) ? console.log(err): start()
});