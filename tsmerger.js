const fs = require('fs')
cleanCache = require('./cleanCache'),
path=require('path')
 const{spawn} = require('child_process')
module.exports = function merger(list) {
    return new Promise(async(resolve, reject) => {
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
        bat.on('exit', async (code) => {
            console.log(`子进程退出码：${code}`)
            await cleanCache(list)
            resolve()
        })
    })
}
