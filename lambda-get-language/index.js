var AWS = require('aws-sdk');
var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});

exports.handler = async(event, context) => {

    let params = {
        Text: event.subject
    }

    try {
        var data = await comprehend.detectDominantLanguage(params).promise();
        data.escalate=0;
    }
    catch (err) {
        console.log(err);
        return err;
    }

    event.language = data.Languages[0];
    return event;
};
