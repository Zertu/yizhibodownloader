const m3u8 = require('m3u8'),
    fs = require('fs')

module.exports = function decoder() {
    return new Promise((resolve, reject) => {
        const parser = m3u8.createStream()
        const file = fs.createReadStream('r.m3u8')
        let playlist=[]
        file.pipe(parser)
        parser.on('item', function (item) {
            playlist.push(item.get('uri'))
        })
        parser.on('end',e=>{
            resolve(playlist)
        })
        
    })
}
