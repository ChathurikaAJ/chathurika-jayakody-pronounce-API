const router = require('express').Router();
const fs = require('fs');
const textToSpeech = require('../azure/text-to-speech');
const multer = require('multer');
const audioToWav = require('../utils/audio-converter-wav')
const speechToText = require('../azure/speech-to-text');


// POST Text sent from User
router.post('/text',(req,res) => {
    // Save to JSON
    fs.writeFile('./data/user-text.json',JSON.stringify(req.body),
    (error) => {
        console.log(error);
        if(!error){
            console.log('+++User text saved+++');

            // Send to SDK
            textToSpeech.speech()
        }
    })
    // Send status
    res.status(200).send('User text has been successfully received')
})



// Audio storage setup
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'./audio/');
    },
    filename(req,file,cb){
        const fileNameArray = file.originalname.split('.');
        cb(null,`${'user-audio'}.${fileNameArray[fileNameArray.length -1]}`);
    }
})

const upload = multer({storage});



// POST Audio from User
router.post('/audio',upload.single('user-audio'),(req,res) => {
    //Convert audio to wav
    audioToWav.converter()

    //Send audio file to Azure
    speechToText.score()

    
    res.status(200).send('User audio has been successfully received')
    
})
  
    

//GET results
router.get('/result',(req,res) => {
    const assessmentData = JSON.parse(fs.readFileSync('./data/assessment.json'))
    res.json(assessmentData)

})





module.exports = router;