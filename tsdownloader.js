const fs = require('fs'),
    download = require('download')
    ,ProgressBar = require('progress')
module.exports = function downloader(baseUrl, tags) {
    let lists = []    
    bar = new ProgressBar(':bar', { total: tags.length })
    tags.map(list => lists.push(new Promise(async(resolve, reject) => {
        try{
            const data = await download(baseUrl +'/'+ list)
            bar.tick()
            console.info(list+'下载完毕')
            resolve(fs.writeFileSync(list,data))
        }
        catch (e){
            reject(e)
        }
    })))
    return Promise.all(lists)
}