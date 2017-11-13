const fs = require('fs')
cleanCache = require('./cleanCache'),
path=require('path')
 const{spawn} = require('child_process')
module.exports = function merger(list) {
    return new Promise(async(resolve, reject) => {
        let filelist = []
        list.map(l => {
            filelist.push('file ' + l)
        })
        fs.writeFileSync('filelist.txt', filelist.join('\n'))
        fs.writeFileSync('my.bat', 'ffmpeg -f concat -i filelist.txt -c copy output.mp4 -y')
        const bat = spawn('my.bat')

        bat
            .stdout
            .on('data', (data) => {
                console.log(data.toString());
            })

        bat
            .stderr
            .on('data', (data) => {
                console.log(data.toString());
            })
        bat.on('exit', (code) => {
            console.log(`子进程退出码：${code}`)

            resolve(cleanCache(list))
        })
    })
}
