var AWS = require('aws-sdk');
var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});

exports.handler = async(event, context) => {

    var languageCode = 'pt';
    if (event.language) {
        languageCode = event.language.LanguageCode;
    }

    var params = {
        LanguageCode: languageCode, /* required */
        Text: event.description /* required */
    }
    try {
        var data = await comprehend.detectSentiment(params).promise();
        data.escalate=0;
        console.log(data);
    }
    catch (err) {
        console.log(err);
        return err;
    }

    event.sentiment = data.Sentiment;
    event.sentimentScore = data.SentimentScore;
    return event;
};
