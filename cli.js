#!/usr/local/bin/node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const isFile = fileName => fs.lstatSync(fileName).isFile();
let currentDir = process.cwd();

const explorer = () => {
    const filesList = ["../", ...fs.readdirSync(currentDir)];
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
            const fullPath = path.resolve(currentDir, fileName);
            if(isFile(fullPath)) {
                const data = fs.readFileSync(fullPath, 'utf-8');
                console.log(data);
            } else
            {
               currentDir = fullPath;
               explorer();
            }
        });
}

explorer();