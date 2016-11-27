
const accountSID = 'AC404c82882a45b7b15080a3c41a5cfcc0';
const authToken ='d38ad6a5c4f21033850d259a1260c366';
const client = require('twilio')(accountSID, authToken);


client.calls.create({
    url: "https://handler.twilio.com/twiml/EHdb58182deea04e1da9edf2e74627e7f1",
    to: "+447706212658",
    from: "+44 115 824 4806" //outgoing number
}, function(err, call) {
    process.stdout.write(call.sid);
});
