#!/usr/bin/env babel-node

require('./helper');
let ls = require('./ls_impl.js');
let rootPath = process.argv[2] || __dirname;
let isRecursive = process.argv.includes('-R');

async function main() {
    let files = await ls(rootPath, isRecursive);
    files.forEach((file) => {
        console.log(file);
    });
}

main();
