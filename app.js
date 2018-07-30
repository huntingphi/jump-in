#!/usr/bin/env node
const yaml = require('js-yaml');
const fs = require('fs');
var shell = require('shelljs');
var rl = require('readline-sync');
const path = require("path");
//Grab provided args
const[,, ...args] = process.argv;
// var rl = readline.createInterface(process.stdin, process.stdout);

var projectName = rl.question("What is the name of the project you\'re jumping into? ");
var projectLanguage = rl.question('What language will you be using? ');
var remoteRepo;
var remoteBranch = "master";
var usesGit = false;
const config = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname ,'./config.yml'), 'utf8'));


var askGit = () => {
    let ans = rl.question('Will you be using git for source control? ');
    if (ans === "y" || ans === "yes") {
        usesGit = true;
        remoteRepo = rl.question('Enter the remote repo url (if any): ');
        if (remoteRepo !== "") {
            remoteBranch = rl.question('Enter the remote branch to track (default is master): ');

        }
};
};
askGit();

const createDirs = ()=>{
    switch(projectLanguage){
        case "C++": 
            try {
                for (const file of config.CPP_DIRS) {
                    shell.mkdir(file);
                }
            } catch (e) {
                console.log(e);
            }
    }
}

const initGit = ()=>{
    if(usesGit){
        shell.exec("git init");
        if (remoteRepo != ""){
            shell.exec("git remote add origin " + remoteRepo +" && git branch --set-upstream-to origin/"+remoteBranch);
        }
    }
}

const create = () => {
    shell.echo("Creating your project...");
    shell.mkdir(projectName);
    // shell.exec("cp config.yml "+projectName);
    shell.cd(projectName);
    createDirs();
    initGit();
    shell.cd("..");
    
};
create();




