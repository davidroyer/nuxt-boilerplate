// import './extract'
require('./utils/extract')
require('./core/routes-generator')

let readdirp = require('readdirp');
const path = require('path')

let settings = {
    root: path.join('./src/pages'),
    entryType: 'all'
};

// In this example, this variable will store all the paths of the files and directories inside the providen path
let allFilePaths = [];

// Iterate recursively through a folder
readdirp(settings)
    .on('data', function (entry) {
        const {
            name,
            path
        } = entry
        // execute everytime a file is found in the providen directory
        if (entry.name.startsWith('_')) {
            let param = name.extract('_', '.vue')
            allFilePaths.push(
                // entry
                {
                    name,
                    path,
                    param,
                    info: entry.stat
                }
            );
        }
        // Store the fullPath of the file/directory in our custom array 

    })
    .on('warn', function (warn) {
        console.log("Warn: ", warn);
    })
    .on('error', function (err) {
        console.log("Error: ", err);
    })
    .on('end', function () {

        console.log(allFilePaths);
        // ["c:/file.txt","c:/other-file.txt" ...]
    });