#!/usr/local/bin/node
const fs = require('fs');
const http = require('http');
const path = require('path');
const yargs = require('yargs');
const inquirer = require('inquirer');

const getPath = (path) => {
    let newPath = path;
    while (newPath.indexOf("../") > 0){
        const parsePath = newPath.split("\\");
        if(parsePath.indexOf("../") != 1)
            parsePath.splice(parsePath.indexOf("../")-1, 2);
        else
            parsePath.splice(parsePath.indexOf("../"), 1);
        newPath = parsePath.join("\\")
    }
    return newPath;
}

http.createServer((req, res)=>{
    const isFile = fileName => fs.lstatSync(fileName).isFile();
    let currentDir = path.join(process.cwd(), req.url)
        .replace(/__back/g, "../")
        .replace(/%20/g, " ");
    console.log(currentDir);
    if(!fs.existsSync(currentDir))
       return res.end('File or directory not found');
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
        .replace('##path', getPath(currentDir))
        .replace('##links', linksList);

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    res.end(HTML);

}).listen(3000);