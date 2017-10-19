const fs = require('fs'),
    download = require('download')
    ,ProgressBar = require('progress')
module.exports = function downloader(baseUrl, tags) {
    let lists = []
    tags.map(list => lists.push(new Promise(async(resolve, reject) => {
        try{
            console.info('开始下载'+list)
            const data = await download(baseUrl +'/'+ list)
            console.info(list+'下载完毕')
            resolve(fs.writeFileSync(list,data))
        }
        catch (e){
            reject(e)
        }
    })))
    return Promise.all(lists)
}