var fs = require('fs');
var _ = require('underscore');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

var alchemy_language = new AlchemyLanguageV1({
  api_key: 'ffc7860cebb73c30f19b6d37bbffd94ff9ebfd8f'
});

console.log(alchemy_language);

 var params = {
  text: ''
 };

alchemy_language.keywords(params, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});


