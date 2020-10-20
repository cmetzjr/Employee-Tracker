var inquirer = require("inquirer");
require("console.table");
var connection = require("./connection");


//start prompts
showPrompts()

// /ask the user what they want to do
function showPrompts() {
    inquirer.prompt({
        name: "main",
        type: "list",
        message: "What do you want to do?",
        choices: [
            "View Departments",
            "Add a Department",
            "View Roles",
            "Add Role",
            "View Employees",
            "Add Employee",
            "Exit"
        ]
    }).then(function (answer) {
        // cases with appropriate function for each answer
        switch (answer.main) {
            case "View Departments":
                //print departments to the screen and show prompts
                viewDepts();
                break;

            case "Add a Department":
                //input new department and show prompts    
                newDeptPrompt();
                break;

            case "View Roles":
                //print roles to the screen and show prompts
                viewRoles();
                break;

            case "Add Role":
                newRolePrompt();
                break;

            case "View Employees":
                //print employees to the screen and show prompts
                viewEmployees();
                break;

            case "Add Employee":
                //input new role and show prompts    
                newEmployeePrompt();

                function newEmployeePrompt() {
                    inquirer.prompt({
                        name: "newEmployee",
                        type: "input",
                        message: "New employee's name:"
                    }).then(function (answer) {
                        var employeeName = answer.newEmployee;
                        addEmployee(employeeName);
                        console.log(`\n ${employeeName} added - what would you like to do next? \n`)
                        showPrompts();
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

    //===========================================
    //view departments
    function viewDepts() {
        connection.query("SELECT name FROM employees.department", function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            showPrompts();
        })
    };

    //===========================================
    //add department
    function newDeptPrompt() {
                    inquirer.prompt({
                        name: "newDept",
                        type: "input",
                        message: "New department name:"
                    }).then(function (answer) {
                        var depName = answer.newDept;
                        addDept(depName);
                        console.log(`${depName} added - what would you like to do next?`)
                        showPrompts();
                    })
                };
    
    function addDept(depName) {
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, depName, function (err, res) {
            if (err) throw err;
        });
    };

    //===========================================
    //view roles
    function viewRoles() {
        connection.query("SELECT title FROM employees.role", function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            showPrompts();
        })
    };

    //===========================================
    //add role
    function newRolePrompt(roleName) {
        var query = "INSERT INTO role (title, salary, department_id) VALUES (?)";
        connection.query(query, roleName, function (err, res) {
            if (err) throw err;
        });
    };

    //===========================================
    //view employees
    function viewEmployees() {
        connection.query("SELECT id, first_name, last_name FROM employees.employee;", function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            showPrompts();
        })
    };

    //===========================================
    //add employee
    

}