'use strict'
const aws= require("aws-sdk")
const dynamodb= new aws.DynamoDB.DocumentClient()

module.exports = async(event,callback)=> {
    const params= {
        TableName: 'todos'
    }
    return await dynamodb.scan(params).promise()

}