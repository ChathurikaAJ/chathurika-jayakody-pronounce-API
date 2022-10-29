module.exports = {
    link: (function(){
        var http = require('http'),
        ms = require('mediaserver');

        http.createServer(function (req, res) {
        ms.pipe(req, res, "./audio/text-to-speech.wav");
        }).listen(1337, '127.0.0.1');
    })
}