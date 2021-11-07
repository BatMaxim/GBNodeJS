#!/usr/local/bin/node
const fs = require('fs');
const http = require('http');
const path = require('path');
const yargs = require('yargs');
const inquirer = require('inquirer');

http.createServer((req, res)=>{
    const isFile = fileName => fs.lstatSync(fileName).isFile();
    let currentDir = path.join(process.cwd(), req.url).replace(/__back/g, "../");
    console.log(currentDir);
    if(!fs.existsSync(currentDir))
       return res.end('File or directory nt found');
    if(isFile(currentDir))
        return fs.createReadStream(currentDir).pipe(res);

    let linksList = "";
    linksList+= `<li><a href="${path.join(req.url, "__back")}">../</a></li>`
    fs.readdirSync(currentDir).forEach(el =>{
        const filePath = path.join(req.url, el);
        linksList+= `<li><a href="${filePath}">${el}</a></li>`
    });


    const HTML = fs
        .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
        .replace('##path', currentDir)
        .replace('##links', linksList);

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    res.end(HTML);

}).listen(3000);