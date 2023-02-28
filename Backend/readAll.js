'use strict'

import { ScanCommand } from "@aws-sdk/client-dynamodb"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
// Set the AWS Region.
const REGION = "ap-east-1"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ region: REGION });
const aws= require("aws-sdk")

module.exports = async(event,callback)=> {
    const params= {
        TableName: 'todos'
    }
    return await ddbClient.send(new ScanCommand(params))

}