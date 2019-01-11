const rp = require('request-promise');

const cardRequest = {};

cardRequest.get = function(){
    return rp("https://alexa-skill-tarot.herokuapp.com/");
}

module.exports = cardRequest;