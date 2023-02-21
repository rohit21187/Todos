'use strict';
const create = require('./create.js')
const readAll= require('./readAll.js')

module.exports.create = async (event,context, callback) => {
  await create(event, (error, result) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    }
    context.succeeded(response)
  })
}
module.exports.readAll = async (event, context, callback) => {
  await readAll(event, (error, result) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    }
    context.succeeded(response);
  })
}
