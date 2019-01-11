/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const cardRequest = require('./modules/cardRequest');

const ReadTarotIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest' 
    || handlerInput.requestEnvelope.request.intent.name === 'AnotherReadIntent';
  },
  async handle(handlerInput) {
    let speechText = 'I don\'t know!';
    await cardRequest.get().then(
      (value) => {
        let cards = JSON.parse(value);
        speechText = `Im gonna draw three cards for you, they will represent your past, your present, and your future respectively.
                      Your first card is the ${cards[0].name}, it symbolizes your past, and it means that ${cards[0].meaning}.
                      Your second card is the ${cards[1].name}, it symbolizes your present, and it means that ${cards[1].meaning}.
                      Your third card is the ${cards[2].name}, it symbolizes your future, and it means that ${cards[2].meaning}.
                      if you want a new tarot read you can ask me "tell tarot drawer to give me another read".`
      }, 
      (error) => {
        speechText = "there was an error.";
      }
    );
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Your Read:', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = `Hello, in this skill i\'m gonna draw some cards to tell you about yourself. Pretty cool huh?. 
                        You can ask me to initialize saying: Alexa open tarot drawer or Alexa ask tarot drawer to read my fortune`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    ReadTarotIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
