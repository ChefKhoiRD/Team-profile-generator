// link to page creation
const Template = require('./src/Template');

// team profiles
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

// node modules 
const fs = require('fs'); 
const inquirer = require('inquirer');

// team array
const teamArray = []; 

// new manager
const newManager = () => {
    return inquirer.prompt ([
        // manager questions
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager of this team?'
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the manager's ID."
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the manager's email."
        },
        {
            type: 'input',
            name: 'officeNum',
            message: "Please enter the manager's office number"
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNum } = managerInput; 
        const manager = new Manager (name, id, email, officeNum);

        teamArray.push(manager); 
        console.log(manager); 
    })
};

//employee parent class of engineer and intern
const newEmployee = () => {
    return inquirer.prompt ([
      // Employee questions  
        {
            type: 'list',
            name: 'role',
            message: "Please choose your employee's role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "What's the name of the employee?"
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID."
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email."
        },
        // when engineer option is selected, ask engineer specific questions
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employee's github username.",
            when: (input) => input.role === "Engineer"
        },
        // when intern is selected, ask intern specific questions
        {
            type: 'input',
            name: 'school',
            message: "Please enter the employee's school",
            when: (input) => input.role === "Intern"
        },
        // ask if user wants to add more employees
        {
            type: 'confirm',
            name: 'confirmNewEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        // data for employee types 

        let { name, id, email, role, github, school, confirmNewEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        teamArray.push(employee); 

        if (confirmNewEmployee) {
            return newEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })

};


// function to generate HTML page file using file system 
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        // if there is an error 
        if (err) {
            console.log(err);
            return;
        // when the profile has been created 
        } else {
            console.log("Team profile has been created, view in index.html within dist folder")
        }
    })
}; 

newManager()
  .then(newEmployee)
  .then(teamArray => {
    return Template(teamArray);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });