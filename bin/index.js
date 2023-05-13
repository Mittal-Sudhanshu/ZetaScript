#!/usr/bin/env node

const fs = require("fs");
const process = require("process");
const { spawn } = require('node:child_process')

const createDirectory = (loc) => {
    fs.mkdirSync(loc, { recursive: true }, (err) => {
        if (err) throw err;
    });
}

createDirectory("./server");
process.chdir("./server");
const npmInitProcess = spawn('npm', ['init', '-y'], {
    stdio: 'inherit',
    shell: true,
});

npmInitProcess.on('close', (code) => {
    if (code === 0) {
        console.log('NPM package initialized successfully.');
    } else {
        console.error('NPM package initialization failed with exit code:', code);
    }
});
const packagesToInstall = ['express', 'mongoose', 'bcrypt', 'jsonwebtoken', 'dotenv', 'nodemon']
const npmPackageInstall = spawn('npm', ['install', ...packagesToInstall], {
    stdio: 'inherit',
    shell: true,
});

npmPackageInstall.on('close', (code) => {
    if (code === 0) {
        console.log('Package installation successfully.');
    } else {
        console.error('npm install failed with exit code:', code);
    }
});
const npmGitInit = spawn('git', ['init'], {
    stdio: 'inherit',
    shell: true,
})
npmGitInit.on('close', (code) => {
    if (code === 0) {
        console.log('git repository initialized successfully.');
    } else {
        console.error('npm install failed with exit code:', code);
    }
});

fs.writeFileSync('.gitignore', '/node_modules\n.env', function (err) {
    if (err) throw err;
    console.log('Saved!');
})

const value = 'const express=require("express");\nconst app=express();\nconst port =5000||process.env.PORT;\napp.get("/",(req,res)=>{res.status("Server is live and running")});\napp.listen(port,()=>{console.log(`Server is running on port ${port}`);});'
fs.writeFileSync('index.js', value, function (err) {
    if (err) throw err;
    console.log('Saved!');
});
createDirectory('./contollers')
createDirectory('./models')
createDirectory('./routes')
createDirectory('./middlewares')
createDirectory('./utils')