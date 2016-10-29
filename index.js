const express = require('express');
const twilio = require('twilio');

let app = express();

// Returns TwiML which prompts the caller to record a message
app.post('/record', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  let twiml = new twilio.TwimlResponse();
  twiml.say('Hello, thanks for calling James. What are you interested in today?');


  // Use <Record> to record the caller's message
  twiml.record({transcribe: true, maxLength: 60});

  // End the call with <Hangup>
  twiml.hangup();

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(3000)
  console.log('App is listening on 3000');
