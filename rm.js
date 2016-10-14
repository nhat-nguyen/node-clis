#!/usr/bin/env babel-node

require('./helper');
let fs = require('fs').promise;
let path = require('path');
let ls = require('./ls_impl.js');
let deletePath = process.argv[2];

async function rm(deletePath) {
    let stat = await fs.stat(deletePath);
    if (stat.isDirectory()) {
        await rmFiles(deletePath);
        rmFoldersRecursively(deletePath);
    } else {
        fs.unlink(deletePath);
    }
}

async function rmFiles(deletePath) {
    let filePaths = await ls(deletePath, true);
    for (let path of filePaths) {
        fs.unlink(path);
    }
}

async function rmFoldersRecursively(deletePath) {
    let pathList = await fs.readdir(deletePath);

    if (pathList.length > 0) {
        for (let folder of pathList) {
            await rmFoldersRecursively(path.join(deletePath, folder));
        }
    }

    fs.rmdir(deletePath);
}

rm(deletePath);
