#!/usr/bin/env babel-node

require('./helper');
let fs = require('fs').promise;

async function touch() {
    let fileName = process.argv[2];
    try {
        let stat = await fs.stat(fileName);
        await fs.utimes(fileName, stat.atime, Date.now() / 1000);
    } catch (e) {
        await fs.writeFile(fileName); // file doesn't exist, create it
    }
}

touch();
