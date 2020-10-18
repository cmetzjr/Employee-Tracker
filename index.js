var inquirer = require("inquirer");
require("console.table");
var connection = require("./connection");


//start prompts
startPrompts()

// /ask the user what they want to do
function startPrompts() {
    inquirer
        .prompt({
            name: "main",
            type: "list",
            message: "What do you want to do?",
            choices: [
                "View Departments",
                "Add a Department",
                "Exit"
            ]
        }).then(function (answer) {
            // cases with appropriate function for each answer
            switch (answer.main) {
                case "View Departments":
                    viewDepts();
                    exit();
                    break;

                case "Add a Department":
                    newDeptPrompt();

                    function newDeptPrompt() {
                        inquirer
                            .prompt({
                                name: "newDept",
                                type: "input",
                                message: "New department name:"
                            }).then(function (answer) {
                                var depName = answer.newDept;
                                addDept(depName);
                                exit();
                            })
                    };
                    break;
                    
                case "Exit":
                    exit();
            };
        });





    // ===================================================
    //exit app
    function exit() {
        connection.end();
    }

    //view departments
    function viewDepts() {
        connection.query("SELECT name FROM employees.department", function (err, res) {
            if (err) throw err;
            console.table(res);
        })
    };

    //add department
    function addDept(depName) {
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, depName, function (err, res) {
            if (err) throw err;
        });
    }
}