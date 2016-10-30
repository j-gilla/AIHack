const accountSID = 'AC404c82882a45b7b15080a3c41a5cfcc0';
const authToken ='d38ad6a5c4f21033850d259a1260c366';
const client = require('twilio')(accountSID, authToken);
var fs = require('fs');
var _ = require('underscore');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

var alchemy_language = new AlchemyLanguageV1({
 api_key: 'ffc7860cebb73c30f19b6d37bbffd94ff9ebfd8f'
});

//
// client.transcriptions.list(function(err, data) {
//     data.transcriptions.forEach(function(transcription) {
//         //console.log(transcription.TranscriptionText);
//         console.log(data.);
//         //console.log(data.transcriptionText);
//     });
// });
//
// client.recordings.list({ dateCreated: "2016-10-30" }, function(err, data) {
//     data.recordings.forEach(function(recording) {
//         console.log(data);
//     });
// });

client.transcriptions("TRb2d7339d66e57918aa04c1f6959cde63").get(function(err, transcription) {
    console.log(transcription.transcriptionText);

    var params = {
        text: transcription.transcriptionText
    }
    // now we need to put the text in the watson-developer-cloud

    alchemy_language.keywords(params, function (err, response) {
        if (err) console.log('error:', err);
        else {
            var stringy = response;
            console.log(stringy.keywords.map(function (el) {
                return el.text;
                }));
            }
        });


});

//Get all working
//from this extract the latest, first one in the object
//extract the latest time sigx
//replace transcriptions arg
//with data from json
