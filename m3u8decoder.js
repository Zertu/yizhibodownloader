var m3u8 = require('m3u8');
var fs   = require('fs');

var parser = m3u8.createStream();
var file   = fs.createReadStream('/path/to/file.m3u8');
file.pipe(parser);

parser.on('item', function(item) {
  // emits PlaylistItem, MediaItem, StreamItem, and IframeStreamItem
});
parser.on('m3u', function(m3u) {
    var duration = item.get('bandwidth');
    item.set('uri', 'http://example.com/' + item.get('uri'));
});
module.export=function (m3u8) {
    
}