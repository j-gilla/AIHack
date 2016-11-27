// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
var accountSid = 'AC97b833d1085adbedffd2b335af8b1213';
var authToken = "44e649ac936530c0b70bbc30e6054b2c";
var client = require('twilio')(accountSid, authToken);

client.transcriptions.list(function (err, data) {
  /*data.transcriptions.forEach(function(trans) {
    console.log(trans.transcriptionText)
  })*/
  //console.log(data.transcriptions[0].transcriptionText)
  console.log(data.transcriptions[0])
  let trans = data.transcriptions[0].transcriptionText;
  

  transCheck = function (text, numCalls) {
    if (text !== null || numCalls > 23) {
      const res = text === null ? 'Still not finished!' : text;
      console.log(res);
      return(res);
    } else {
      setTimeout(function () {
        client.transcriptions.list(function (err, data) {
          console.log(data.transcriptions[0])
          let newTrans = data.transcriptions[0].transcriptionText;
          console.log(numCalls)
          console.log(newTrans)
          transCheck(newTrans, numCalls + 1)
        })
      }, 5000)
    }
  }

 transCheck(trans, 0)

})


/*client.calls.list(function(err, data) {
    data.calls.forEach(function(call) {
        console.log(call);
    });
});*/