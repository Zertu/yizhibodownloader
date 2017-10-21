const http = require('http')
    decoder = require('./m3u8decoder'),
    fs = require('fs'),
    downloader= require('./tsdownloader'),
    merger=require('./tsmerger'),
    readline = require('readline')
    
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  rl.question('请输入视频的地址:', (answer) => {
    answer=answer.split('/')
    answer.pop()
    const baseurl = answer.join('/')
    const url = baseurl + '/index.m3u8'
    http.get(url, (res) => {
        const {statusCode} = res
        const contentType = res.headers['content-type']
        let error
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
        } 
        if (error) {
            errHandler(error)
            // 释放内存
            res.resume()
            return
        }
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', (chunk) => {
            rawData += chunk;
        })
        res.on('end', () => {        
            try {
                fs.writeFile('r.m3u8',rawData,async err=>{
                    try{
                        const list =await decoder()
                        console.log('下载中')
                        await downloader(baseurl,list)
                        console.log('合并中')
                        await merger(list)
                    }
                    catch (e){
                        errHandler(e)
                    }
                })
            } catch (e) {
                errHandler(e)
            }
        });
    })

    rl.close()
  })


function errHandler(error) {
    console.error(error.message);
}