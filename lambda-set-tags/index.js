const axios = require('axios')
exports.handler = async (event) => {

    try {
        var score = 0;
        var customerScore = 0;
        var sentiment = event.sentiment;
        var docTopic = event.documentTopic.Name;
        var docTopic = docTopic.toLowerCase()
        var priority = event.priority;


        if (sentiment == 'NEGATIVE') {
            sentiment = 'NEGATIVO';
            score = event.sentimentScore.Negative * 100;
        } else if (sentiment == 'POSITIVE') {
            sentiment = 'POSITIVO';
            score = event.sentimentScore.Positive * 100;
        } else if (sentiment == 'NEUTRAL') {
            sentiment = 'NEUTRO';
            score = event.sentimentScore.Neutral * 100;
        } else if (sentiment == 'MIXED') {
            sentiment = 'EQUILIBRADO';
            score = event.sentimentScore.Mixed * 100;
        }

        score = score.toFixed(2);


        switch(priority){
            case "":
            case null:
                customerScore = 1.2;
                break;
            case "normal":
                customerScore = 1.7;
                break;
            case "urgent":
                customerScore = 2;
                break;
            case "high":
                customerScore = 2.5;
                break;
            default:
                customerScore = 1;
        }

        customerScore = (customerScore * score) * Math.random();
        customerScore = customerScore.toFixed(2);

        const res = await axios({
            method:"put",
            url:`https://${process.env.ZendeskSubdomain}.zendesk.com/api/v2/tickets/${event.id}.json`,
            auth:{
                username: `${process.env.ZendeskEmail}/token`,
                password: process.env.ZendeskAPIToken
            },
            data: {
                "ticket": {
                    "ticket_form_id" : 360001703732,
                    "custom_fields": [
                      {
                        "id": "360043642452",
                        "value": `${docTopic}-ec`
                      },
                      {
                        "id": "360043642472",
                        "value": `${sentiment}`
                      },
                      {
                        "id": "360043644031",
                        "value": `${score}`
                      },
                      {
                        "id": "360043644091",
                        "value": `${customerScore}`
                      }
                    ],
                    "tags": [`sentimento-${sentiment}` ]
                }
            }
        })

        //"group_id": 98738,

        event.tags = res.data.tags;
        event.customerScore = customerScore;


        return event;
        /*
        const res = await axios({
            method:"post",
            url:`https://${process.env.ZendeskSubdomain}.zendesk.com/api/v2/tickets/${event.id}/tags.json`,
            auth:{
                username: `${process.env.ZendeskEmail}/token`,
                password: process.env.ZendeskAPIToken
            },
            data: {
                "tags": ["sentimento-negativo", `score-negativo-${score}` ]
            }
        })

        event.tags = res.data.tags;
        return event;
        */

    } catch (err) {
        console.error(err);
    }
}
