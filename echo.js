#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise

function echo() {
    process.stdout.write(process.argv[2]);
}

echo();
