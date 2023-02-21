'use strict'
const aws= require("aws-sdk")
const dynamodb= new aws.DynamoDB.DocumentClient()

module.exports = async(event,callback)=> {
    const params= {
        TableName: 'todos'
    }
    return dynamodb.scan(params, (error, data) => {
        if (error) {
            callback(error);
        }
        callback(error, data.Items);
    })

}