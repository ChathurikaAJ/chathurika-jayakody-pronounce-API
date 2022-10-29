const router = require('express').Router();
const fs = require('fs');

// POST Text sent from User
router.post('/text',(req,res) => {
    fs.writeFile('./data/assessment.json',JSON.stringify(req.body),
    (error) => {
        if(!error){
            console.log('User text saved');
        }
    })
})
    // Save in JSON
    // Send to SDK
    // Get Audio
    // Create audio link
    // Send status

    module.exports = router;