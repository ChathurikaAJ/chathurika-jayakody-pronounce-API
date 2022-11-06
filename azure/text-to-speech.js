// USED SAMPLE CODE PROVIDED BY AZURE

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

module.exports = {
    speech:(function() {
    
    "use strict";

    //--------MY EDITS-START--------//
    const fs = require("fs");
    require('dotenv').config({
      path:'./process.env'
    });

    const key = process.env.SPEECH_KEY;
    const region = process.env.SPEECH_REGION;


    const userTextData = JSON.parse(fs.readFileSync('./data/user-text.json'))
    const userText = userTextData.text;
    const language = userTextData.language;
    
    const localeIds = [
        {language: 'english', locale:'en-US', speaker:"en-US-AriaNeural"},
        {language: 'french', locale:'fr-FR', speaker:"fr-FR-DeniseNeural"},
        {language: 'spanish', locale:'es-ES', speaker:"es-ES-AbrilNeural"},
        {language: 'chinese', locale:'zh-CN', speaker:"zh-CN-XiaohanNeural"}
    ]

    const filteredLocale= localeIds.find(id => id.language === language).locale
    const speaker= localeIds.find(id => id.language === language).speaker

    //--------MY EDITS-END--------//

    "use strict";

    var sdk = require("microsoft-cognitiveservices-speech-sdk");
    var readline = require("readline");

    var audioFile = "./audio/text-to-speech.wav";
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);


    // The language of the voice that speaks.
    speechConfig.speechSynthesisVoiceName = speaker; 

    // Create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // rl.question("Enter some text that you want to speak >\n> ", function (userText) {
    //   rl.close();
      // Start the synthesizer and wait for a result.
      synthesizer.speakTextAsync(userText,
          function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.");


        } else {
          console.error("Speech synthesis canceled, " + result.errorDetails +
              "\nDid you set the speech resource key and region values?");
        }
        synthesizer.close();
        synthesizer = null;
      },
          function (err) {
        console.trace("err - " + err);
        synthesizer.close();
        synthesizer = null;
      });
    //   console.log("Now synthesizing to: " + audioFile);
    // });
    
  }())
}