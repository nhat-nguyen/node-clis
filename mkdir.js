#!/usr/bin/env babel-node

require('./helper');
let fs = require('fs').promise;
let path = require('path');
let directoryPath = process.argv[2];

async function mkdir(directoryPath) {
    let dirs = directoryPath.split('/');
    var currentDir = __dirname;

    try {
        for (let dir of dirs) {
            currentDir = path.join(currentDir, dir);
            await fs.mkdir(currentDir);
        }
    } catch (e) {
        console.log('Folder already exists');
    }
}

mkdir(directoryPath);
