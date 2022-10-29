// USED SAMPLE CODE PROVIDED BY AZURE

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

module.exports = {
    speech:(function() {
    // <code>
    "use strict";

    //--------MY EDITS-START--------//
    const fs = require("fs");
    require('dotenv').config();

    // const key = process.env.AzureKey;
    // const region = process.env.AzureRegion;

    const userTextData = JSON.parse(fs.readFileSync('./data/user-text.json'))
    const userText = userTextData.text;
    const language = userTextData.language;
    
    const localeIds = [
        {language: 'english', locale:'en-US'},
        {language: 'french', locale:'fr-FR'},
        {language: 'spanish', locale:'es-ES'},
        {language: 'chinese', locale:'zh-CN'}
    ]

    const filteredLocale= localeIds.find(id => id.language === language).locale

    //--------MY EDITS-END--------//

    // pull in the required packages.
    var sdk = require("microsoft-cognitiveservices-speech-sdk");
    var readline = require("readline");
    
    // replace with your own subscription key,
    // service region (e.g., "westus"), and
    // the name of the file you save the synthesized audio.
    var subscriptionKey = "701f60c8de24410b955e3f98bc6c78d7";
    var serviceRegion = "eastus"; // e.g., "westus"
    var filename = "./audio/text-to-speech.wav"; //<-----location to save file
  
    // we are done with the setup
  
    // now create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    
    // create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // var text = 'Is this working?'
  
    // rl.question("Type some text that you want to speak...\n> ", function (text) {
    //   rl.close();
      // start the synthesizer and wait for a result.
      synthesizer.speakTextAsync(userText,
          function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.");
        } else {
          console.error("Speech synthesis canceled, " + result.errorDetails +
              "\nDid you update the subscription info?");
        }
        synthesizer.close();
        synthesizer = undefined;
      },
          function (err) {
        console.trace("err - " + err);
        synthesizer.close();
        synthesizer = undefined;
      });
      console.log("Now synthesizing to: " + filename);
    // });
    // </code>
    
  }())
}