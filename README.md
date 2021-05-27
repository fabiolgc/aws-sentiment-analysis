# Zendesk AI Ticket Classifier

This is a project to classify customer requests based on the requisition text. For that I use AWS Comprehend, AWS Step Functions and Lambda Functions. In addition to these components, Zendesk supports connecting natively to the AWS Event Bridge, this means that all ticket events in Zendesk are sent to AWS to process and update the ticket.

## Lambda Config

Each project lambda folder should be a different lambda function on your AWS project config. You will need to add the following environment variables for each lambda function as described bellow:

### zd-sentiment-analysys-set-priority
> ZendeskAPIToken: You will need to create a Zendesk API Token and add here
> ZendeskEmail: Zendesk username used to create the API Token
> ZendeskSubdomain: without .zendesk.com

### zd-sentiment-analysys-set-tags
> ZendeskAPIToken: You will need to create a Zendesk API Token and add here
> ZendeskEmail: Zendesk username used to create the API Token
> ZendeskSubdomain: without .zendesk.com

### zd-sentiment-analysys-set-tags
> ZendeskAPIToken: You will need to create a Zendesk API Token and add here
> ZendeskEmail: Zendesk username used to create the API Token
> ZendeskSubdomain: without .zendesk.com
> ZendeskSLAHighWait: time in seconds to scalate the ticket
> ZendeskSLANormalWait: time in seconds to scalate the ticket
> ZendeskSLAUrgentWait: time in seconds to scalate the ticket

### zd-sentiment-analysis-get-topic
> ClassifierEndpoint: Endpoint from the Comprehend custom classifier

## Step Functions
Create an step function - state machine - by importing the JSON file `aws-sentiment-analysis/step-function/ZendeskSentimentAnalysis.asl.json`

## AWS Comprehend - Custom Endpoint
In order to create your custom endpoint you will need to extract your ticket data, previously classified for your agents, in order to train the model to learn your categories in relation to the text from the ticket. You can use just the Subject and Description from your ticket or all the conversation.
