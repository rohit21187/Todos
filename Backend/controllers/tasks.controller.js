'use strict'
const { ScanCommand ,GetCommand, PutCommand, DeleteCommand,DynamoDBDocumentClient} = require("@aws-sdk/lib-dynamodb")
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb")
const REGION = "ap-east-1"
const client = new DynamoDBClient({region:'ap-east-1'});
const dynamoDbClient = DynamoDBDocumentClient.from(client);
const ddbClient = new DynamoDBClient({ region: REGION })

module.exports.create = async (req,res) => {
    console.log(req.body.task)
    const data = {
        id :JSON.stringify(req.body.task)
    }
    console.log("in create")
    try {
        await dynamoDbClient.send(new PutCommand(data));
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not create task" });
    }
}

module.exports.readAll = async (req,res) => {
    const params= {
        TableName: 'todos'
    }
    console.log(req+"\n"+"in readable")
    try {
        const { Item } = await dynamoDbClient.send(new ScanCommand(params));
        if (Item) {
            res.json({Item});
        } else {
            res
                .status(404)
                .json({ error: 'Could not find user with provided "userId"' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not retreive tasks" });
    }
}


module.exports.delete = async (req,res) => {
    console.log(req)
    console.log(req.query.id)
    try {
        const { Item } = await dynamoDbClient.send(new DeleteCommand({
            TableName:'todos',
            Key: {
                id: JSON.stringify(req.query.id)
            }
        }));
        if (Item) {
            res.json({Item});
        } else {
            res.status(404).json({ error: 'Could not find task with provided'+req.query.id });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Could not retreive tasks"});
    }
}