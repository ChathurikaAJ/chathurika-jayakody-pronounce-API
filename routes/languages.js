const router = require('express').Router();
const fs = require('fs');
const textToSpeech = require('../azure/text-to-speech');

// POST Text sent from User
router.post('/text',(req,res) => {
    // Save to JSON
    fs.writeFile('./data/user-text.json',JSON.stringify(req.body),
    (error) => {
        console.log(error);
        if(!error){
            console.log('+++User text saved+++');

            // Send to SDK
            // textToSpeech.speech()

        }
    })
    // Send status
    res.status(200).send('User text has been successfully received')
})
    
    
    // Get Audio
    // Create audio link
    

    module.exports = router;