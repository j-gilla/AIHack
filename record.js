const accountSID = 'AC404c82882a45b7b15080a3c41a5cfcc0';
const authToken ='d38ad6a5c4f21033850d259a1260c366';
const client = require('twilio')(accountSID, authToken);


client.transcriptions("TRf0b44b864028a975554008b09cc9a13f").get(function(err, transcription) {
    console.log(transcription.transcriptionText);
});

//Get all working
//from this extract the latest, first one in the object
//extract the latest time sig
//replace transcriptions arg
//with data from json 
