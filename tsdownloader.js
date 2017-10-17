const fs = require('fs'),
    download = require('download')
module.exports = function downloader(baseUrl, tags) {
    let lists = []
    tags.map(list => lists.push(new Promise(async(resolve, reject) => {
        try{
            const data = await download(baseUrl +'/'+ list)
            resolve(fs.writeFileSync(list,data))
        }
        catch (e){
            reject(e)
        }
    })))
    return Promise.all(lists)
}