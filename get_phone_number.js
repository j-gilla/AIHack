var accountSid = 'AC97b833d1085adbedffd2b335af8b1213';
var authToken = "44e649ac936530c0b70bbc30e6054b2c";
var client = require('twilio')(accountSid, authToken);
client.recordings.list(function(err, data) {
  const recording = data.recordings[0];
  const recordingSid = recording.sid;
  const callSid = recording.callSid;
  const myCall = {callSid, recordingSid};
  client.calls.list({sid: myCall.callSid}, function (err, data) {
    const call = data.calls[0];
    myCall.phoneNumber = call.fromFormatted;
    client.transcriptions.list({recordingSid: myCall.recordingSid}, function(err, data) {
      const transcription = data.transcriptions[0];
      myCall.text = transcription.transcriptionText;
      console.log(myCall);
    });
  });
});




