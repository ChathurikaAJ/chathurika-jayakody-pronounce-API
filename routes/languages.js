const router = require('express').Router();
const fs = require('fs');
const textToSpeech = require('../azure/text-to-speech');
const createAudioLink = require('../utils/audio-link')
const multer = require('multer');

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

    
  
    
    

module.exports = router;