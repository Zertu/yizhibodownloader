const fs = require('fs'),
    cleanCache = require('./cleanCache')
module.exports = function merger(filelist) {
    return new Promise(async(resolve, reject) => {
        fs.writeFileSync('new.ts', '')
        readFile(filelist, 0)
    })
}

function readFile(filelist, count) {
    fs.readFile(filelist[count], function (err, data) {
        if (err) {
            errorhandler(err)
        } else {
            appendFile(data)
            count++
            if (count >= filelist.length) {
                return cleanCache(filelist)
            }
            readFile(filelist, count)
        }
    });
}

function appendFile(context) {
    fs.appendFile('new.ts', context, function (err) {
        if (err) {
            errorhandler(err)
        }
    })
}

function errorhandler(err) {
    console.error('合成文件失败:' + err)
}