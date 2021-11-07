#!/usr/local/bin/node
const fs = require('fs');
const http = require('http');
const path = require('path');
const yargs = require('yargs');
const inquirer = require('inquirer');
//
// const options = yargs
//     .positional('p',{
//             describe: "Pattern",
//             default: ""
//         }
//     ).argv;
//
// const isFile = fileName => fs.lstatSync(fileName).isFile();
// let currentDir = process.cwd();
//
// const explorer = () => {
//     const filesList = ["../", ...fs.readdirSync(currentDir)];
//     inquirer.prompt([
//         {
//             name: 'fileName',
//             type: 'list', // input, number, confirm, list, checkbox, password
//             message: 'Choose the file to read',
//             choices: filesList,
//         }
//     ])
//         .then(answer => answer.fileName)
//         .then(fileName => {
//             const fullPath = path.resolve(currentDir, fileName);
//             if(isFile(fullPath)) {
//                 const data = fs.readFileSync(fullPath, 'utf-8');
//                 if(!options.p) console.log(data);
//                 else {
//                     const reg = RegExp(options.p, 'igm');
//                     console.log(data.match(reg));
//                 }
//             } else
//             {
//                currentDir = fullPath;
//                explorer();
//             }
//         });
// }

// explorer();

http.createServer((req, res)=>{
    const isFile = fileName => fs.lstatSync(fileName).isFile();
    let currentDir = path.join(process.cwd(), req.url);
    if(!fs.existsSync(currentDir))
       return res.end('File or directory nt found');

    if(isFile(currentDir))
        return fs.createReadStream(currentDir).pipe(res);

    let linksList = "";

    fs.readdirSync(currentDir).forEach(el =>{
        const filePath = path.join(req.url, el);
        linksList+= `<li><a href="${filePath}">${el}</a></li>`
    });


    let curPath = "1";
    const HTML = fs
        .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
        .replace('##path', currentDir)
        .replace('##links', linksList);

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    res.end(HTML);

}).listen(3000);