// Convert audio to WAV

module.exports = {
    converter: function (){
    
    const ffmpeg = require('fluent-ffmpeg');
    const track = './audio/user-audio.webm'
    var status = false;
    const speechToText = require('../azure/speech-to-text');

    ffmpeg(track)
    // .audioCodec('pcm_s16le')
    .audioBitrate(128)
    .audioChannels(0)
    .audioFrequency(8000)
    .on('error', (err) => {
        console.log('An error occurred: ' + err.message);
    })
    .on('progress', (progress) => {
        console.log('Processing: ' + progress.targetSize + ' KB converted');
    })
    .on('end', () => {
        console.log('Processing finished !');
        speechToText.score()
        
    })
    .save('./audio/user-audio.wav');//path where you want to save your file
    
    }
}