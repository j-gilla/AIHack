
const accountSID = 'AC404c82882a45b7b15080a3c41a5cfcc0';
const authToken ='d38ad6a5c4f21033850d259a1260c366';
const client = require('twilio')(accountSID, authToken);


client.calls.create({
    url: callText.xml
    to: "+447706212658",
    from: "+44 115 824 4806"
}, function(err, call) {
    process.stdout.write(call.sid);
});
