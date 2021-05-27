const axios = require('axios');
exports.handler = async (event) => {

    let newEscalate = event.priority;
    switch(newEscalate){
        case "":
        case null:
        newEscalate = 'normal';
        break;
        case "normal":
        newEscalate = 'high';
        break;
        case "high":
        newEscalate = 'urgent';
        break;
        default:
        newEscalate = 'normal';
    }

    try {
        const res = await axios({
            method:"put",
            url:`https://${process.env.ZendeskSubdomain}.zendesk.com/api/v2/tickets/${event.id}.json`,
            auth:{
                username: `${process.env.ZendeskEmail}/token`,
                password: process.env.ZendeskAPIToken
            },
            data: { "ticket":{"priority":newEscalate,"type":"problem"}}
        });

        event.priority = res.data.ticket.priority;
        return event;
    } catch (err) {
        console.log(err);
        return {
            statusCode: 400,
            body:'There was an error'
        }
    }
}
