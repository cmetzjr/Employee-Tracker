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
                newEmpPrompt();
                break;

            case "Exit":
                exit();
        };
    });
}





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
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, answer.newDept, function (err, res) {
            if (err) throw err;
        });
        console.log(`${answer.newDept} added - what would you like to do next?`)
        showPrompts();

    })
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
function newRolePrompt() {
    var deptQuery = 'SELECT * FROM employees.department';
    connection.query(deptQuery, function (err, res) {
        var deptChoices = res.map(dep => {
            return {
                name: dep.name,
                value: dep.id
            }
        })
        inquirer.prompt([{
            name: "newTitle",
            type: "input",
            message: "New Role name:"
        }, {
            name: "newSalary",
            type: "input",
            message: "Salary:"
        }, {
            name: "newId",
            type: "list",
            message: "Department ID:",
            choices: deptChoices
        }]).then(function (answer) {
            var query = "INSERT INTO role SET ?";
            connection.query(
                query, {
                    "title": answer.newTitle,
                    "salary": answer.newSalary,
                    // "department_id": answer.newID
                    "department_id": 1
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(`New role of ${answer.newTitle} added - what would you like to do next?`)
                    showPrompts();
                });
        })
    })
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
// function newEmpPrompt() {
//     var roleQuery = 'SELECT * FROM employees.role';
//     connection.query(roleQuery, function (err, res) {
//         var roleChoices = res.map(role => {
//             return {
//                 name: role.title,
//                 value: role.id
//             }
//         })
//         var mgrQuery = 'SELECT first_name, last_name, id FROM employees.employee WHERE role_id=1 OR role_id = 2 OR role_id = 3';
//         connection.query(mgrQuery, function (err, res) {
//             var mgrChoices = res.map(mgr => {
//                 return {
//                     first_name: mgr.first_name,
//                     last_name: mgr.last_name,
//                     value: mgr.id
//                 }
//             })

//             inquirer.prompt({
//                 name: "newEmpFirst",
//                 type: "input",
//                 message: "Employee's first name:"
//             }, {
//                 name: "newEmpLast",
//                 type: "input",
//                 message: "Employee's last name:"
//             }, {
//                 name: "newEmpRole",
//                 type: "list",
//                 message: "Employee's role:",
//                 choices: roleChoices
//             }, {
//                 name: "newEmpManager",
//                 type: "list",
//                 message: "Employee's manager (if avail):",
//                 choices: mgrChoices
//             }).then(function (answer) {
//                 var query = "INSERT INTO employee (name) VALUES (?)";
//                 connection.query(query, answer.newDept, function (err, res) {
//                     if (err) throw err;
//                 });
//                 console.log(`${answer.newDept} added - what would you like to do next?`)
//                 showPrompts();

//             })
//         })
//     });


// }