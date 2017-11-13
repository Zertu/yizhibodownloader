const fs = require('fs'),
    download = require('download'),
    ProgressBar = require('progress'),
    path = require('path'),
    config = require('./config')
module.exports = async function downloader(baseUrl, tags,callback) {
    const limit = config.limit,
        group = tags.length / limit,
        tasks = []
    for (let i = 1; i < group; i++) {
        tasks.push(tags.splice(0, limit))
    }
    tasks.push(tags)
    
    series(tasks,baseUrl,callback)
}

function series(item,baseUrl,cb) {
    let temp =item.splice(0,1)
    if(item) {
        task(temp[0],baseUrl, function(result) {
        return series(item,baseUrl),cb;
      });
    } else {
      return cb()
    }
  }

 async function task(item,baseUrl, callback) {    
    await downloader(baseUrl,item)
   callback(2)
  }


async function downloader(baseUrl,file) {
    let tasks=[]
    for(let i =0;i<file.length;i++){
        tasks.push(new Promise(async(resolve, reject) => {
            let temp = await fileExists(file[i])
            if (temp) {
                resolve(console.info(file[i] + '已存在'))
            } else {
                try {
                    const data = await download(baseUrl + '/' + file[i], {timeout: 60000})
                    console.info(file[i] + '下载完毕')
                    resolve(fs.writeFileSync(file[i], data))
                } catch (e) {
                    reject(e)
                }
            }
        }))
    }
    await Promise.all(tasks)
    return 
}

function fileExists(filename) {
    return new Promise((resolve, reject) => {
        fs.exists(__dirname + '/' + filename, (exists) => {
            resolve(exists)
        })
    })
}
