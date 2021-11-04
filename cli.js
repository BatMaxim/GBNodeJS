#!/usr/local/bin/node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const isFile = fileName => fs.lstatSync(fileName).isFile();

const currentDir = process.cwd();

const filesList = fs.readdirSync(currentDir);
inquirer.prompt([
    {
        name: 'fileName',
        type: 'list', // input, number, confirm, list, checkbox, password
        message: 'Choose the file to read',
        choices: filesList,
    }
])
    .then(answer => answer.fileName)
    .then(fileName => {
        console.log(fileName);
        // const fullPath = path.resolve(executionDir, fileName);
        // if(isFile(fullPath)) {
        //     const data = fs.readFileSync(fullPath, 'utf-8');
        //     console.log(data);
        // } else
        // {
        //     console.log("is not a file");
        // }
    });
