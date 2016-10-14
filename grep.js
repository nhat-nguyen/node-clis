#!/usr/bin/env babel-node

require('./helper');
let fs = require('fs'),
    pattern = process.argv[2],
    file = process.argv[3];

function grep(pattern, file) {
    let lineReader = require('readline').createInterface({
      input: fs.createReadStream(file)
    });

    lineReader.on('line', function (line) {
        if (line.includes(pattern)) {
            console.log(line);
        }
    });
}

grep(pattern, file);
