const router = require('express').Router();
const fs = require('fs');
const textToSpeech = require('../azure/text-to-speech');
const multer = require('multer');
const audioToWav = require('../utils/audio-converter-wav')
const speechToText = require('../azure/speech-to-text');


// POST Text sent from User
router.post('/text',(req,res) => {
    console.log(req.body)
    
    // Save to JSON
    fs.writeFile('./data/user-text.json',JSON.stringify(req.body),

    
    (error) => {
        if(!error){
            console.log('+++User text saved+++');
    
            // Send to SDK
            // textToSpeech.speech()
        }
    
    })
    // Send status
    res.status(200).send('User text has been successfully received')


    // fs.readFile("./public/audio/text-to-speech.wav", function(err, result) {
    //     res.send(result.toString("base64"));
    //   });
})



// Audio storage setup
const storage = multer.diskStorage({
    destination(_req,_file,cb){
        cb(null,'./audio/');
    },
    filename(_req,file,cb){
        const fileNameArray = file.originalname.split('.');
        cb(null,`${'user-audio'}.${fileNameArray[fileNameArray.length -1]}`);
    }
})

const upload = multer({storage});



// POST Audio from User
router.post('/audio',upload.single('user-audio'), (req,res) => {
    
    //Convert audio to wav & Send audio file to Azure
    audioToWav.converter()
    
    res.status(200).send('User audio has been successfully received')
})



//GET results
router.get('/result',(_req,res) => {
    const assessmentData = JSON.parse(fs.readFileSync('./data/assessment.json'))
    res.json(assessmentData)

})

// GET text to speech
router.get('/text-to-speech',(req,res)=>{
    var options = {
        root: './audio',
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }

    res.sendFile("text-to-speech.wav",options,function(err){
        if(err){
            console.log(err);
        } else {
            console.log('sent file');
        }
    })

})
    




module.exports = router;