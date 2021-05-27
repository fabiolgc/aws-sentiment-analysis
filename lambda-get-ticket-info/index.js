const axios = require('axios')
exports.handler = async (event) => {
            try {
                const res = await axios({
                    method:"get",
                    url:`https://${process.env.ZendeskSubdomain}.zendesk.com/api/v2/tickets/${event.id}.json`,
                    auth:{
                        username: `${process.env.ZendeskEmail}/token`,
                        password: process.env.ZendeskAPIToken
                    }
                });

                let ticketInfo = {
                    'subject': res.data.ticket.raw_subject,
                    'description': res.data.ticket.description,
                    'status': res.data.ticket.status,
                    'priority': res.data.ticket.priority,
                    'id': res.data.ticket.id,
                    'ZendeskSLA': {
                        'NormalWait': parseInt(process.env.ZendeskSLANormalWait),
                        'HighWait': parseInt(process.env.ZendeskSLAHighWait),
                        'UrgentWait': parseInt(process.env.ZendeskSLAUrgentWait)
                    }
                }

                return ticketInfo;
            } catch (err) {
                console.log(err);
                return {
                    statusCode: 400,
                    body: JSON.stringify(err)
                }
            }
    }
