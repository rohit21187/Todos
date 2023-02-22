'use strict';
const { DynamoDB } = require("aws-sdk")
const db = new DynamoDB.DocumentClient()
// const create_todos = require('./create.js')
const readAll_todos = require('./readAll.js')

module.exports.create = async (event) => {
  const data = {
        id :event.body
  }
  await db
      .put({
        TableName: 'todos',
        Item: data,
      })
      .promise()

  return { statusCode: 200, body: JSON.stringify(data) }
}
// module.exports.create = async (event,context, callback) => {
//   await create_todos(event, (error, result) => {
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify(result),
//     }
//     context.succeeded(response)
//   })
// }
module.exports.readAll = async (event, context, callback) => {
  const res= await readAll_todos(event,callback)
  return { statusCode: 200, body: JSON.stringify(res) }
}
module.exports.delete = async (event) => {
    const taskToBeRemovedName = event.body
    await db
        .delete({
            TableName:'todos',
            Key: {
                id: taskToBeRemovedName,
            },
        })
        .promise()

    return { statusCode: 200 }
}
