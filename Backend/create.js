'use strict'
const aws= require('aws-sdk')
const uuid = require('uuid')
const dynamoDb = new aws.DynamoDB.DocumentClient()

module.exports = async (event,callback)=> {
    //const info = JSON.parse(event.body)
    const info=JSON.parse("My first task")
    info.id = uuid.v5()
    info.updatedAt = new Date().getTime()
    console.log(info)
    const params = {
        TableName: 'todos',
        Item: info
    }
    return dynamoDb.put(params, (error) => {
        if (error) {
            callback(error);
        }
        callback(error, params.Item);
    })
}
