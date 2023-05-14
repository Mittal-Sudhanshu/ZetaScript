#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require("process");

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);

fs.mkdirSync(projectPath);

const packageJson = {
  name: projectName,
  version: '1.0.0',
  scripts: {
    start: 'nodemon server.js',
  },
  dependencies: {
    express: '^4.17.1',
    nodemon: '^2.0.7',
    jsonwebtoken: '^8.5.1',
  },
};

fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
fs.copyFileSync(path.join(__dirname, 'server.js'), path.join(projectPath, 'server.js'));
fs.copyFileSync(path.join(__dirname, '.gitignore'), path.join(projectPath, '.gitignore'));
fs.cp(path.join(__dirname, 'controllers'),path.join(projectPath, 'controllers') , { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});
fs.cp(path.join(__dirname, 'db'),path.join(projectPath, 'db') , { recursive: true }, (err) => {
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

