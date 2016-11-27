// This example uses JavaScript language features present in Node.js 6+
// b2nnQY6wtk9jAQhDjSGZ2fcaexb1kqKLlOpnuT
'use strict';

const express = require('express');
const twilio = require('twilio');
const accountSid = 'AC404c82882a45b7b15080a3c41a5cfcc0';
const authToken = "d38ad6a5c4f21033850d259a1260c366";
// PAULS DETAILS
// const accountSid = 'AC97b833d1085adbedffd2b335af8b1213';
// const authToken = "44e649ac936530c0b70bbc30e6054b2c";
const client = require('twilio')(accountSid, authToken);
const _ = require('underscore');
const AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

let app = express();

const alchemy_language = new AlchemyLanguageV1({
  api_key: 'ffc7860cebb73c30f19b6d37bbffd94ff9ebfd8f'
});

const myCall = {};

let getPhoneNum = function (err, data) {
  console.log('getPhoneNum');
  const recording = data.recordings[0];
  console.log('recording', recording);
  const recordingSid = recording.sid;
  const callSid = recording.callSid;
  //const myCall = {callSid, recordingSid};
  myCall.callSid = callSid;
  myCall.recordingSid = recordingSid;
  getCallData({sid: myCall.callSid}, function (err, data) {
    const call = data.calls[0];
    myCall.phoneNumber = call.fromFormatted;
    getCallTranscription({recordingSid: myCall.recordingSid}, function (err, data) {
      let trans = data.transcriptions[0].transcriptionText;
      console.log(trans);
      isTranscriptionComplete(trans, 0, function (text) {
        getTranscriptionKeywords(text, logKeywords);
      });
    });
  });

  function getCallData(options, cb) {
    console.log('getCallData');
    client.calls.list(options, cb);
  }

  function getCallTranscription(options, cb) {
    console.log('getCallTranscritptions');
    client.transcriptions.list(options, cb)
  }

  function isTranscriptionComplete(text, numCalls, callback) {
    console.log('isTranscriptionComplete');
    console.log(numCalls);
    if (text !== null || numCalls > 23) { // 2minutes
      const res = text === null ? 'Still not finished!' : text;
      myCall.transcription = res;
      callback(res);
    } else {
      delayFiveSeconds(function () {
        // why aren't we passing in options
        getCallTranscription(null, function (err, data) {
          let newTrans = data.transcriptions[0].transcriptionText;
          isTranscriptionComplete(newTrans, numCalls + 1, callback)
        });
      });
    }
  }

  function getTranscriptionKeywords(text, cb) {
    console.log('getTranscriptionKeywords');
    alchemy_language.keywords({text}, cb);
  }

  function logKeywords(err, response) {
    console.log('logKeywords');
    if (err) {
      return console.log('Sorry Watson didn\'t find a keyword');
    }
    console.log(response.keywords);
    let userKeyword = response.keywords[0].text.toLowerCase();
    myCall.userKeyword = userKeyword;
    console.log('***************');
    let group = matchingGroup(userKeyword);
    myCall.group = group;
    console.log('matching group is.....');
    console.log(group);
    console.log('********************');
    console.log('final call object');
    console.log(myCall);
    makeOutgoingCall();
    console.log('makeOutGoingCall');
  }

  function matchingGroup(userKeyword) {
    console.log('matchingGroup');
    console.log('keyword: ', userKeyword);
    let answer = groups.filter(function (group) {
      // console.log(group);
      return group.activity === userKeyword;
    });
    return answer;
  }

  function makeOutgoingCall() {
    console.log('makeOutGoingCall');
    const groupName = myCall.group[0].name.split(' ').join('%20');
    const twimlUrl = 'https://handler.twilio.com/twiml/EHdb58182deea04e1da9edf2e74627e7f1?Activity=' + myCall.userKeyword + '&Group=' + groupName;
    console.log(twimlUrl);
    client.calls.create({
      url: twimlUrl,
      to: myCall.phoneNumber,
      from: "+441158245129"
    }, function (err, call) {
      process.stdout.write(call.sid);
      sendSMS();
      console.log('sendSMS');
    });
  }

  function sendSMS() {
    client.messages.create({
      to: "+447706212658",
      from: "++44 115 824 5129",
      body: "Hi, this is James. I have a potential new member for your organisation, you can contact them on " + myCall.phoneNumber,
    }, function (err, message) {
      console.log(message.sid);
    });
  }

  /*const matchingGroupFun = matchingGroup();
   console.log('*************');
   console.log('matching group fun: ', matchingGroupFun);
   console.log('*************');*/


  function delayFiveSeconds(func) {
    setTimeout(func, 5000);
  }
  // function delaySMS(func) {
  //   setTimeout(func, 20000);
  // }

};



let toggledFunc = function () {
  let runFunction = false;
  return function (err, data) {
    console.log('trying function now!!!!')
    if (!runFunction) {
      console.log('function did NOT run')
      runFunction = true;
    } else {
      console.log('function is running YAAAAAAY!')
      runFunction = false;
      getPhoneNum(err, data);

    }
  }
};

let getOnePhoneNum = toggledFunc();

// Returns TwiML which prompts the caller to record a message
app.post('/record', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  let twiml = new twilio.TwimlResponse();
  //console.log(twiml);
  twiml.say('Hello, you\'re speaking with James. Tell me one of your interests and I will see if there is a group out there for you');
  // Use <Record> to record and transcribe the caller's message
  twiml.record({transcribe: true, maxLength: 30});

  // at the end of the call, James confirms with the user that he will call them back regarding the groups they have expressed an interest in.
  twiml.say('Thanks for calling James, we will ring you back shortly with some suggestions of groups or activities you could join');
  // End the call with <Hangup>
  //console.log(twiml.hangup.toString());
  twiml.hangup();

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());


  client.recordings.list(getOnePhoneNum);
});

// Create an HTTP server and listen for requests on port 3000
app.listen(3000);


const groups = [
  { name: 'Jogging Club', location: 'Manchester', organiserName: 'Matthew Broderick', organiserPhone: 447706212658, activity:'jogging'},
  { name: 'Reading Lovers Club', location: 'Sheffield', organiserName: 'Andrew Stevenson', organiserPhone: 447706212658,activity:'reading' },
  { name: 'Yoga Club', location: 'Nottingham', organiserName: 'Lucy Townsend', organiserPhone: 447706212658,activity:'yoga' },
  { name: 'Football Club', location: 'Northampton', organiserName: 'Andrew Stubbs', organiserPhone: 447706212658,activity:'football' },
  { name: 'Knitting Club', location: 'Newcastle', organiserName: 'Ali Khan', organiserPhone: 447706212658,activity:'knitting' },
  { name: 'Badminton Club', location: 'Leeds', organiserName: 'Hannah Montrose', organiserPhone: 447706212658,activity:'badminton' },
  { name: 'Pottery Club', location: 'Glasgow', organiserName: 'Mario Gibson', organiserPhone: 447706212658,activity:'pottery' },
  { name: 'Painting Club', location: 'Leicester', organiserName: 'Katie Ashford', organiserPhone: 447706212658,activity:'painting' },
  { name: 'Drawing Group', location: 'Fulham', organiserName: 'Anita Kaur', organiserPhone: 447706212658,activity:'drawing' },
  { name: 'Chess Club', location: 'Middlesborough', organiserName: 'Katie Ashford', organiserPhone: 447706212658,activity:'chess' },
  { name: 'Gardening Association', location: 'Edinburgh', organiserName: 'Jack Cooper', organiserPhone: 447706212658,activity:'gardening' },
  { name: 'Sewing Lovers', location: 'Manchester', organiserName: 'Lisa North', organiserPhone: 447706212658, activity: 'sewing' },
  { name: 'Photography Association', location: 'Bradford', organiserName: 'Melissa Rasheed', organiserPhone: 447706212658,activity:'photography' },
  { name: 'Walking', location: 'Wycombe', organiserName: 'Paula Kinross', organiserPhone: 447706212658,activity:'walking' },
  { name: 'Golf Club', location: 'Chelsea', organiserName: 'Mary McDougall', organiserPhone: 447706212658,activity:'golf' },
  { name: 'Archery Club', location: 'Blackpool', organiserName: 'Alisha Forrester', organiserPhone: 447706212658,activity:'archery' },
  { name: 'Bowling Club', location: 'Liverpool', organiserName: 'Yasmin Mohammed', organiserPhone: 447706212658,activity:'bowling' },
  { name: 'Hiking Crew', location: 'Bolton', organiserName: 'Taylor Sutherland', organiserPhone: 447706212658,activity:'hiking' },
  { name: 'Quilting Club', location: 'Rhyll', organiserName: 'Anthony Olaf', organiserPhone: 447706212658,activity:'quilting' },
  { name: 'Bird-watching Group', location: 'Hull', organiserName: 'Holly Ford', organiserPhone: 447706212658,activity:'birdwatching' },
  { name: 'Fishing Club', location: 'Inverness', organiserName: 'Francesca Lourde', organiserPhone: 447706212658 ,activity:'fishing'},
  { name: 'Sailing Association', location: 'Cardiff', organiserName: 'Olly Chapman', organiserPhone: 447706212658,activity:'sailing' },
  { name: 'Rugby Club', location: 'Perth', organiserName: 'Sadiq Patel', organiserPhone: 447706212658,activity:'rugby' },
  { name: 'Cricket Association', location: 'Bristol', organiserName: 'Mike Bradbury', organiserPhone: 447706212658,activity:'cricket' },
  { name: 'Bridge Association', location: 'Camden', organiserName: 'Laurel Astbury', organiserPhone: 447706212658,activity:'bridge' },
  { name: 'Pool Club', location: 'Hartlepool', organiserName: 'Joanna Cuthbert', organiserPhone: 447706212658,activity:'pool' },
  { name: 'Salsa Group', location: 'Swinton', organiserName: 'Natasha Halliwell', organiserPhone: 447706212658,activity:'salsa' },
  { name: 'Gongbath Club', location: 'Manchester', organiserName: 'Francesca Simpson', organiserPhone: 447706212658,activity:'gongbath' },
  { name: 'Karate CLub', location: 'Bolton', organiserName: 'Anna Hendrix', organiserPhone: 447706212658,activity:'karate' },
  { name: 'Crossword Association', location: 'Liverpool', organiserName: 'Hannah Smith', organiserPhone: 447706212658,activity:'crossword' },
  { name: 'Drama Group', location: 'Glasgow', organiserName: 'Miriam Campbell', organiserPhone: 447706212658,activity:'drama' },
  { name: 'Volleyball Group', location: 'Cambridge', organiserName: 'Kate Handsworth', organiserPhone: 447706212658,activity:'volleyball' },
  { name: 'Swimming Club', location: 'Kinross', organiserName: 'Hilary Potter', organiserPhone: 447706212658,activity:'swimming' },
  { name: 'Basketball Club', location: 'Hamilton', organiserName: 'Jermaine Roberts', organiserPhone: 447706212658,activity:'basketball' },
  { name: 'Foozball Lovers Club', location: 'Leicester', organiserName: 'Margaret Clarence', organiserPhone: 447706212658,activity:'foozball' },
  { name: 'Jiujitsu Association', location: 'Kingsbury', organiserName: 'Anthony Wallace', organiserPhone: 447706212658,activity:'jiujitsu' },
  { name: 'Crocheting', location: 'Islington', organiserName: 'Kenneth Williams', organiserPhone: 447706212658,activity:'crocheting' },
  { name: 'Embroidery Club', location: 'Swansea', organiserName: 'Peter Jackson', organiserPhone: 447706212658,activity:'embroidery' },
  { name: 'Puzzle Club', location: 'Perth', organiserName: 'Matthew Iniesta', organiserPhone: 447706212658,activity:'puzzle' },
  { name: 'Running Group', location: 'Birmingham', organiserName: 'Michael Holmes', organiserPhone: 447706212658,activity:'running' }
];



/*client.recordings.list(function(err, data) {
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
 });*/

/*alchemy_language.keywords(params, function (err, response) {
 if (err) console.log('error:', err);
 else {

 const keywords = response.keywords.map(function (wordObject) {
 return wordObject.text;
 });
 // sconsole.log(keywords);
 const toUserCall  = 'Would you like the organiser of ' + matchWord(keywords[0]) + ' to contact you?'
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
 });*/
