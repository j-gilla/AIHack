const accountSID = 'AC404c82882a45b7b15080a3c41a5cfcc0';
const authToken ='d38ad6a5c4f21033850d259a1260c366';
const client = require('twilio')(accountSID, authToken);
var fs = require('fs');
var _ = require('underscore');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
var twilio = require('twilio');
var resp = new twilio.TwimlResponse();

var acts = [
{name: 'Holly Mitchell', activity: 'Rambling Club', contactNumber:'01156 778 9890'},
{name: 'Steve Smith', activity: 'Manchester Bridge Society', contactNumber:'01143 998 1145'},
{name: 'Robert Slydell', activity: 'Greater Manchester Dog Walkers', contactNumber:'01143 6657 9980'},
{name: 'Harriet Ryder', activity: 'Greater Manchester Knitters', contactNumber:'01143 7781 5543'},
{name: 'Richard Armitage', activity: 'Lancashire Snooker Society', contactNumber:'01132 8890 0001'},
{name: 'Yasmin Stephens', activity: 'Manchester Chess Club', contactNumber:'1159 7813 8891'},
{name: 'Lynda Arteh', activity: 'Stretford Bowles Club', contactNumber:'13516 8878 9909'},
{name: 'Mauro Gesotos', activity: 'Prestwich Book Club', contactNumber:'01143 6897 6542'},
{name: 'Paul Richards', activity: 'Altricham Hiking Group', contactNumber:'13516 8878 9909'},
]

const matchWord = function(keyword){
  var output = acts.reduce(function(prev, next) {
    //console.log(value.activity);
    return prev + next.activity.includes(keyword) ? next.activity : ''
  }, '');
return output;
  };

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
    // console.log(transcription.transcriptionText);

    var params = {
        text: transcription.transcriptionText
    }
    // now we need to put the text in the watson-developer-cloud
    alchemy_language.keywords(params, function (err, response) {
        if (err) console.log('error:', err);
        else {

            var keywords = response.keywords.map(function (wordObject) {
                return wordObject.text;
            });
            // sconsole.log(keywords);
            var toUserCall  = 'Would you like the organiser of ' + matchWord(keywords[0]) + ' to contact you?'
            // console.log(toUserCall);
            //resp.say('Welcome to Twilio!');
            client.calls.create({
                url: "https://handler.twilio.com/twiml/EHdb58182deea04e1da9edf2e74627e7f1",
                to: "+447706212658",
                from: "+44 115 824 4806" //outgoing number
            }, function(err, call) {
                process.stdout.write(call.sid);
            });

            resp.say(`${toUserCall}`, {
              voice: 'alice',
              language: 'en-gb'
            })
            console.log(resp.toString());
            }

        });
});




//Get all working
//from this extract the latest, first one in the object
//extract the latest time sigx
//replace transcriptions arg
//with data from json
