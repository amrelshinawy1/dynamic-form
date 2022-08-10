import { AWSError } from 'aws-sdk';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';
import { docClient } from './dynamo';
import { IUser } from './users.interfaces';

export const createUser = async (data: IUser) => {
  await new Promise((resolve, reject) => {
    docClient.put(
      {
        TableName: 'users',
        Item: data
      },
      (err: AWSError) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(null);
        }
      });
  });

};

export const getAllUsers = async () => {
  const queryResult: ScanOutput = await new Promise((resolve, reject) => {
    docClient.scan(
      { TableName: 'users', Limit: 100 },
      (err: AWSError, data: ScanOutput) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
  return queryResult.Items;
};
