// Convert audio to WAV

module.exports = {
    converter: function(){
    
    const ffmpeg = require('fluent-ffmpeg');
    const track = './audio/user-audio.webm'

    ffmpeg(track)
    .toFormat('wav')
    .on('error', (err) => {
        console.log('An error occurred: ' + err.message);
    })
    .on('progress', (progress) => {
        console.log('Processing: ' + progress.targetSize + ' KB converted');
    })
    .on('end', () => {
        console.log('Processing finished !');
    })
    .save('./audio/user-audio.wav');//path where you want to save your file
    }
}