import AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-1' });
export const docClient = new AWS.DynamoDB.DocumentClient();

