const http = require('http')
    // decoder = require('./m3u8decoder')
const baseurl = 'http://alcdn.hls.xiaoka.tv/2017915/956/645/J3JZnK6izYwJlpqi'
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
            console.log(rawData)
        } catch (e) {
            errHandler(e)
        }
    });
})

function errHandler(error) {
    console.error(error.message);
}