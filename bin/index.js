#! /usr/bin/env node

const fs = require("fs");
const process = require("process");
const { exec } = require('node:child_process')

// const createDirect

fs.mkdirSync('./server', { recursive: true }, (err) => {
    if (err) throw err;
});

process.chdir("./server");
exec('npm init', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error}`);
        return;
    }

    // Process the command output
    console.log(`Command output: ${stdout}`);

    // Handle any errors from the command
    if (stderr) {
        console.error(`Command error: ${stderr}`);
    }

    // Command execution completed
    console.log('Package.json created.');
});

exec('npm install express mongoose bcryptjs jsonwebtoken dotenv nodemon', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error}`);
        return;
    }

    // Process the command output
    console.log(`Command output: ${stdout}`);

    // Handle any errors from the command
    if (stderr) {
        console.error(`Command error: ${stderr}`);
    }

    // Command execution completed
    console.log('Packages installed.');
});


fs.writeFile('index.js', 'console.log(hello)', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

fs.mkdirSync('./controllers', { recursive: true }, (err) => {
    if (err) throw err;
});
fs.mkdirSync('./models', { recursive: true }, (err) => {
    if (err) throw err;
});
fs.mkdirSync('./routes', { recursive: true }, (err) => {
    if (err) throw err;
});
fs.mkdirSync('./middlewares', { recursive: true }, (err) => {
    if (err) throw err;
});
fs.mkdirSync('./utils', { recursive: true }, (err) => {
    if (err) throw err;
});
