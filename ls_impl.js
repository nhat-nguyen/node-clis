let fs = require('fs').promise;
let path = require('path');

async function lsMain(rootPath, isRecursive) {
    let fileNames = await fs.readdir(rootPath);
    let promises = [];

    for (let name of fileNames) {
        let currentPath = path.join(rootPath, name),
            stat = await fs.stat(currentPath);

        if (stat.isFile()) {
            promises.push(currentPath);
        } else if (isRecursive) {
            promises.push(lsMain(currentPath, isRecursive));
        }
    }

    return Promise.all(promises);
}

async function ls(rootPath, isRecursive) {
    let files = await lsMain(rootPath, isRecursive);
    return flatten(files);
}

function flatten(arr) {
    let res = [];
    for (let item of arr) {
        if (Object.prototype.toString.call(item) === '[object Array]') {
            res.push.apply(res, flatten(item));
        } else {
            res.push(item);
        }
    }

    return res;
}

module.exports = ls;
