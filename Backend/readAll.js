'use strict'
const aws= require("aws-sdk")
const dynamodb= new aws.DynamoDB.DocumentClient()

module.exports = async(event,callback)=> {
    const params= {
        TableName: 'todos'
    }
    return await dynamodb.scan(params, (error, data) => {
        if (error) {
            console.log(error)
            callback(error);
        }
        else{
            console.log(data.Items)
            callback(error, data.Items);
        }
    }).promise()

}