var AWS = require('aws-sdk');
var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});

exports.handler = async(event, context) => {


    var languageCode = 'pt';
    if (event.language) {
        languageCode = event.language.LanguageCode;
    }
    console.log(languageCode);

    var params = {
        Text: event.description, /* required */
        EndpointArn: `${process.env.ClassifierEndpoint}` /* required */
    }


    try {
        var data = await comprehend.classifyDocument(params).promise();
        data.escalate=0;
        //console.log(data.Classes[0]);
        event.documentTopic = data.Classes[0];

    }
    catch (err) {
        console.log(err);
        return err;
    }

    return event;
};
