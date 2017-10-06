const http = require('http')
const baseurl = 'http://alcdn.hls.xiaoka.tv/2017104/d94/2ad/zq8ejheiXT84oMGe'
const url =baseurl+'/index.m3u8'
http.get(url  , (res) => {
    console.log(url)
    const {
        statusCode
    } = res
    const contentType = res.headers['content-type']
    let error
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
    }
    console.log(res)
    if (error) {
        console.error(error.message);
        // 释放内存
        res.resume()
        return
    }
})