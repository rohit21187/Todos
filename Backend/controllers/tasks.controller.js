'use strict'
const { ScanCommand , PutItemCommand, DeleteItemCommand} = require("@aws-sdk/client-dynamodb")
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb")
const REGION = "ap-east-1"
const ddbClient = new DynamoDBClient({ region: REGION })
const DynamoDB = require("aws-sdk")

module.exports.create = async (req) => {
    const obj= JSON.parse(req.body)
    const data = {
        id :obj.task
    }
    console.log("in create")
    let db=new DynamoDBClient({region:REGION});
    await db.send(new PutItemCommand({
            TableName: 'todos',
            Item: data,
        }))
        .promises()
    //const rep =await ddbClient.send(new PutItemCommand(data)))

    return { statusCode: 200, body: JSON.stringify(data) }
}

module.exports.readAll = async (req,res) => {
    const params= {
        TableName: 'todos'
    }
    console.log(req+"\n"+"in readable")
    let read= new Promise(function (resolve){
        resolve(ddbClient.send(new ScanCommand(params)))
    })

    const data= await read
    // data.Items.forEach(function (element) {
    //     console.log(element.id);
    // })
    return { statusCode: 200, body: JSON.stringify(data) }
    // console.log(data)
    // const res1={tasks:data.Items}
    // // return { statusCode: 200, body: JSON.stringify(res1) }
    // res.status(200).stringify(res1)
}


module.exports.delete = async (req,res) => {
    console.log(req)
    console.log(req.query.id)
    const wait= ddbClient.send(new DeleteItemCommand({
        TableName:'todos',
        Key: {
            id: JSON.stringify(req.query.id)
        }
    }))
    await Promise.all()
    const msg= {
        info:"deleted"
    }
    res.status(200).stringify(msg)
}