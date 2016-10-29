var fs = require('fs');
var _ = require('underscore');
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

var hobbies = JSON.parse(fs.readFileSync('./hobbies.json'), 'utf8');

hobbies = _.map(hobbies.query.pages['31257416'].links, function (el) {
  return el.title;
});

console.log(hobbies);