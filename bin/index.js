#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require("process");
const inquirer = require("inquirer");
const chalk = require('chalk');

const cli_execute = (projectName, version, description, author, license) => {

  if (projectName == '') {
    projectName = 'server';
  }
  const projectPath = path.join(process.cwd(), projectName);
  console.log('')
  fs.mkdirSync(projectPath);
  const packageJson = {
    name: projectName,
    version: version,
    description: description,
    main: "index.js",
    scripts: {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node index.js"
    },
    keywords: [],
    author: author,
    license: license,
    dependencies: {
      bcryptjs: '^2.4.3',
      dotenv: ' ^16.0.3',
      express: '^4.18.2',
      jsonwebtoken: '^9.0.0',
      mongoose: '^7.1.1',
      nodemon: '^2.0.22'
    },
  };

  fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
  fs.copyFileSync(path.join(__dirname, 'server.js'), path.join(projectPath, 'index.js'));
  fs.copyFileSync(path.join(__dirname, '.gitignore'), path.join(projectPath, '.gitignore'));
  fs.copyFileSync(path.join(__dirname, '.env.example'), path.join(projectPath, '.env'));
  fs.cp(path.join(__dirname, 'controllers'), path.join(projectPath, 'controllers'), { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.cp(path.join(__dirname, 'models'), path.join(projectPath, 'models'), { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.cp(path.join(__dirname, 'routes'), path.join(projectPath, 'routes'), { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.cp(path.join(__dirname, 'utils'), path.join(projectPath, 'utils'), { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.cp(path.join(__dirname, 'middlewares'), path.join(projectPath, 'middlewares'), { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });

  exec(`cd ${projectPath} && git init`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log('Git repository initialized  successfully!');


  })

  exec(`cd ${projectPath} && npm install`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log('Installing dependencies...');
    console.log('Dependencies installed successfully!');
    console.log(`Node template initiallized in  ${projectPath}`);

    const env = chalk.hex('#ffff00')("\n\nSet up the env file with your credentials");

    console.log(env);
    console.log(`\nUSE COMMANDS`);
    console.log(chalk.hex("#0000ff")`\ncd ${projectName}`)
    console.log(chalk.hex("#0000ff")`nodemon index.js`)

    console.log(`\nto run your server`)
  })

}

const prompt = inquirer.createPromptModule();
var projectName = '';
var version = '1.0.0';
var description = '';
var gitRepo = '';
var author = '';
var license = '';
prompt([
  {
    type: "input",
    name: 'projectName',
    message: 'Enter the project name',
  },
  {
    type: "input",
    name: 'version',
    message: 'Enter the project version',
  },
  {
    type: "input",
    name: 'description',
    message: 'Enter the project description',
  },
  {
    type: "input",
    name: 'gitRepo',
    message: 'Enter the git repositiory',
  },
  {
    type: "input",
    name: 'author',
    message: 'Enter the auther name',
  },
  {
    type: "input",
    name: 'license',
    message: 'Enter the project license',
  }
]).then((answers) => {
  projectName = answers.projectName;
  description = answers.description;
  gitRepo = answers.gitRepo;
  author = answers.author;
  license = answers.license;
  cli_execute(projectName, version, description, author, license);
})