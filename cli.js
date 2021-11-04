#!/usr/local/bin/node
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const inquirer = require('inquirer');

const options = yargs
    .positional('p',{
            describe: "Pattern",
            default: ""
        }
    ).argv;

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
                if(!options.p) console.log(data);
                else {
                    const reg = RegExp(options.p, 'igm');
                    console.log(data.match(reg));
                }
            } else
            {
               currentDir = fullPath;
               explorer();
            }
        });
}

explorer();