var inquirer = require("inquirer");
require("console.table");
require("connection.js");

// // function which prompts the user for what action they should take
// function start() {
//   inquirer
//     .prompt({
//       name: "postOrBid",
//       type: "list",
//       message: "Would you like to [POST] an auction or [BID] on an auction?",
//       choices: ["POST", "BID", "EXIT"]
//     })
//     .then(function(answer) {
//       // based on their answer, either call the bid or the post functions
//       if (answer.postOrBid === "POST") {
//         postAuction();
//       }
//       else if(answer.postOrBid === "BID") {
//         bidAuction();
//       } else{
//         connection.end();
//       }
//     });
// }