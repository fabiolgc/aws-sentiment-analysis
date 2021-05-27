const axios = require('axios')
exports.handler = async (event) => {

    try {
        const res = await axios({
            method:"post",
            url:`https://${process.env.ZendeskSubdomain}.zendesk.com/api/v2/tickets/${event.id}/tags.json`,
            auth:{
                username: `${process.env.ZendeskEmail}/token`,
                password: process.env.ZendeskAPIToken
            },
            data: {
                "tags": ["negative"]
            }
        })

        event.tags = res.data.tags;
        return event;
    } catch (err) {
        console.error(err);
    }
}
