const fs = require('fs')
module.exports = function cleanCache(filelist) {
    fs.unlink('filelist.txt')
    return filelist.map(list => fs.unlink(list))
}