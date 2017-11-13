let http = require('http')

    const readline = require('readline'),
        rl = readline.createInterface({input: process.stdin, output: process.stdout}),
        decoder = require('./m3u8decoder'),
        fs = require('fs'),
        downloader = require('./tsdownloader'),
        merger = require('./tsmerger')

    rl.question('请输入视频的地址:', (answer) => {
        if (answer.indexOf('https') == 0) {
            http = require('https')
        }
        answer = answer.split('/')
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
                    fs.writeFile('r.m3u8', rawData, async err => {
                        try {
                            const list = await decoder()
                            console.log('下载中')
                            downloader(baseurl, list, async function () {
                                await merger(list)
                                console.log('合并中')
                            })
                        } catch (e) {
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