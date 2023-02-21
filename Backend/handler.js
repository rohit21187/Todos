'use strict';
const create = require('./create.js')

module.exports.create = async (event,context, callback) => {
  create(event,(error,result)=>{
    const response={
      statusCode: 200,
      body: JSON.stringify(result),
    }
    context.succeeded(response)
  })
};
