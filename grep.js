#!/usr/bin/env babel-node

require('./helper');
let fs = require('fs'),
    path = require('path'),
    EventEmitter = require('events'),
    inFilePattern = process.argv[2],
    filePathPattern = process.argv[3];

// ls version using EventEmitter instead of Promises :)
class Ls extends EventEmitter {
    async list(rootPath) {
        let files = await fs.promise.readdir(rootPath);
        for (let file of files) {
            let filePath = path.join(rootPath, file);
            let stat = await fs.promise.stat(filePath);
            if (stat.isFile()) {
                this.emit('filePath', filePath);
            } else {
                this.list(filePath);
            }
        }
    }
}

// Naive implementation of grep :D
function grep(pattern, file) {
    let lineReader = require('readline').createInterface({
        input: fs.createReadStream(file)
    });

    lineReader.on('line', function (line) {
        if (line.includes(pattern)) {
            console.log(file + ':');
            console.log('  ' + line);
        }
    });
}


let filePathRegEx = new RegExp('^' + __dirname + '/' + filePathPattern + '$', 'i');
let ls = new Ls();

ls.list(__dirname);
ls.on('filePath', (filePath) => {
    if (filePath.match(filePathRegEx)) {
        grep(inFilePattern, filePath);
    }
});
