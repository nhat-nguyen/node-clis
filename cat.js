#!/usr/bin/env babel-node

require('./helper');
let fs = require('fs').promise;

async function cat() {
    try {
        let file = await fs.readFile(process.argv[2], 'utf8');
        process.stdout.write(file);
    } catch (e) {
        process.stdout.write('File does not exist\n');
    }
}

cat();
