// USED SAMPLE CODE PROVIDED BY AZURE

module.exports = {
    score: function(){

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

    const locale= localeIds.find(id => id.language === language).locale
    

    //--------MY EDITS-END--------//

    const sdk = require("microsoft-cognitiveservices-speech-sdk");

    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    
    speechConfig.speechRecognitionLanguage = locale;

    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("./audio/user-audio.wav"));

    var pronunciationAssessmentConfig = sdk.PronunciationAssessmentConfig.fromJSON(
        "{\"referenceText\":\""+userText+"\",\"gradingSystem\":\"HundredMark\",\"granularity\":\"Phoneme\"}"
        );

    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    
    pronunciationAssessmentConfig.applyTo(speechRecognizer);


    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                // console.log(`RECOGNIZED: Text=${result.text}`);
                
                var pronunciationAssessmentResultJson = result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult);
                fs.writeFileSync('./data/assessment.json',pronunciationAssessmentResultJson)
                break;
            case sdk.ResultReason.NoMatch:
                fs.writeFileSync('./data/assessment.json',JSON.stringify("Speech could not be recognized"))
                console.log("NOMATCH: Speech could not be recognized.");
                
                break;
            case sdk.ResultReason.Canceled:
                const cancellation = sdk.CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
        speechRecognizer.close();
    });
  
    }
    
}
