const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

const teamMembers = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all teamMembers desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different userQuestions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
function userQuestions() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "What is your role?",
          choices: ["Manager", "Intern", "Engineer"],
        },
        {
          type: "input",
          name: "name",
          message: "What is your name?",
        },
        {
          type: "input",
          name: "email",
          message: "What is your email?",
        },
        {
          type: "input",
          name: "id",
          message: "What is your employee I.D.?",
        },
        // depending on which role was selected additional userQuestions are asked
        {
          type: "input",
          name: "officeNumber",
          message: "What is your office number?",
          when: (answers) => answers.role === "Manager",
        },
        {
          type: "input",
          name: "github",
          message: "What is your GitHub username?",
          when: (answers) => answers.role === "Engineer",
        },
        {
          type: "input",
          name: "school",
          message: "What school do you attend?",
          when: (answers) => answers.role === "Intern",
        },
        // the user is asked if they would like to add another employee
        {
          type: "list",
          name: "addorstop",
          message: "Who you like to add an employee?",
          choices: ["Yes", "No I am finished"],
        },
      ])
      // depending on the selected roled is given to the corresponding class
      .then(function (answers) {
        if (answers.role === "Manager") {
          const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
          );
  
          teamMembers.push(manager);
        }
        if (answers.role === "Intern") {
          const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
          );
  
          teamMembers.push(intern);
        }
        if (answers.role === "Engineer") {
          const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
          );
  
          teamMembers.push(engineer);
        }
        // the userQuestions() function is called again if more teamMembers need to be added
        if (answers.addorstop === "Yes") {
          userQuestions();
        } else {
          // if all the teamMembers are entered the team.html is created
          fs.writeFile(outputPath, render(teamMembers), (err) => {
            if (err) {
              return console.log(err);
            }
            console.log("It worked!");
          });
        }
      });
  }
  
  userQuestions();