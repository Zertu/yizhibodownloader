module.exports = function cleanCache(filelist) {
    return filelist.map(list => fs.unlink(list))
}