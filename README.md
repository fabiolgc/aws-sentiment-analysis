# zendesk-classifier

This is a project to classify customer requests based on the requisition text. For that I use AWS Comprehend, AWS Step Functions and Lambda Functions. In addition to these components, Zendesk supports connecting natively to the AWS Event Bridge, this means that all ticket events in Zendesk are sent to AWS to process and update the ticket.
