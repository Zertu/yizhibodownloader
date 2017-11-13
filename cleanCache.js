const fs = require('fs')
module.exports = function cleanCache(filelist) {
    fs.unlink('filelist.txt')
    fs.unlink('r.m3u8')
    return filelist.map(list => fs.unlink(list))
}