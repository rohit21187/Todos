'use strict';
const { DynamoDB } = require("aws-sdk")
const db = new DynamoDB.DocumentClient()
const url = require('url');
// const create_todos = require('./create.js')
const readAll_todos = require('./readAll.js')

module.exports.create = async (event) => {
    const obj= JSON.parse(event.body)
  const data = {
        id :obj.task
  }
  await db
      .put({
        TableName: 'todos',
        Item: data,
      })
      .promise()

  return { statusCode: 200, body: JSON.stringify(data) }
}

module.exports.readAll = async (event, context, callback) => {
  const res= await readAll_todos(event,callback)
  return { statusCode: 200, body: JSON.stringify(res) }
}


module.exports.delete = async (event) => {
    //const taskToBeRemovedName = event.body
    //return { statusCode: 200, body:JSON.stringify(event.pathParameters.id) }
    //const q = url.parse(event.url, true);
    // const task =event.id
    console.log(event.queryStringParameters.id)
    await db
        .delete({
            TableName:'todos',
            Key: {
                id: event.queryStringParameters.id
            }
        })
        .promise()

    return { statusCode: 200 }
}
