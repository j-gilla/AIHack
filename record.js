const accountSID = 'AC404c82882a45b7b15080a3c41a5cfcc0';
const authToken ='d38ad6a5c4f21033850d259a1260c366';
const client = require('twilio')(accountSID, authToken);

//
// client.transcriptions.list(function(err, data) {
//     data.transcriptions.forEach(function(transcription) {
//         //console.log(transcription.TranscriptionText);
//         console.log(data.);
//         //console.log(data.transcriptionText);
//     });
// });

client.recordings.list({ dateCreated: "2016-10-30" }, function(err, data) {
    data.recordings.forEach(function(recording) {
        console.log(data);
    });
});

//Get all working
//from this extract the latest, first one in the object
//extract the latest time sig
//replace transcriptions arg
//with data from json
