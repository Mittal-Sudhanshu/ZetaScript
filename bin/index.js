#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require("process");
const inquirer=require("inquirer");
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);
console.log('')
fs.mkdirSync(projectPath);

const packageJson = {
  name: projectName,
  version: '1.0.0',
  scripts: {
    start: 'nodemon index.js',
  },
  dependencies: {
    bcryptjs:'^2.4.3',
    dotenv:' ^16.0.3',
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
fs.cp(path.join(__dirname, 'controllers'),path.join(projectPath, 'controllers') , { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});
fs.cp(path.join(__dirname, 'models'),path.join(projectPath, 'models') , { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});
fs.cp(path.join(__dirname, 'routes'),path.join(projectPath, 'routes') , { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});
fs.cp(path.join(__dirname, 'utils'),path.join(projectPath, 'utils') , { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});
fs.cp(path.join(__dirname, 'middlewares'),path.join(projectPath, 'middlewares') , { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});
console.log('Installing dependencies...');
exec(`cd ${projectPath} && npm install`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log('Dependencies installed successfully!');
  console.log(`Your Node server with Express, Nodemon, and JsonWebToken is ready in ${projectPath}`);
});

