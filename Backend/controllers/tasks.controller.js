'use strict'
const {DynamoDB}  = require("aws-sdk")
const db = new DynamoDB.DocumentClient()
module.exports.create = async (req,res) => {
    const obj= JSON.parse(req.body)
    const data = {
        id :obj.task
    }
    await db
        .put({
            TableName: 'todos',
            Item: data,
        })
        .promise()
    res.status(200).JSON(data)
}

module.exports.readAll = async (req,res) => {
    const params= {
        TableName: 'todos'
    }
    const data= await db.scan(params).promise()
    const res1={tasks:data.Items}
    // return { statusCode: 200, body: JSON.stringify(res1) }
    res.status(200).JSON(res1)
}


module.exports.delete = async (req,res) => {
    console.log(req)
    await db
        .delete({
            TableName:'todos',
            Key: {
                id: req.queryStringParameters.id
            }
        })
        .promise()
    const msg= {
        info:"deleted"
    }
    res.status(200).JSON(msg)
}