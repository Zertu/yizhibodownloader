const fs = require('fs'),
    download = require('download'),
    ProgressBar = require('progress'),
    path=require('path')
module.exports = function downloader(baseUrl, tags) {
    let lists = []
    bar = new ProgressBar(':bar', {total: tags.length})
    tags.map(list => lists.push(new Promise(async(resolve, reject) => {
        let temp =await fileExists(list)
        if (!temp) {
            resolve(console.info(list + '已存在'))
        } else {
            try {
                const data = await download(baseUrl + '/' + list,{
                    timeout:60000
                })
                bar.tick()
                console.info(list + '下载完毕')
                resolve(fs.writeFileSync(list, data))
            } catch (e) {
                reject(e)
            }
        }
    })))
    return Promise.all(lists)
}

function fileExists(filename) {
    return new Promise((resolve, reject) => {
        fs.exists(__dirname+filename, (exists) => {
            resolve(exists)
        })
    })
}