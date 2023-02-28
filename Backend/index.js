const log = require('lambda-log')
const express= require('express')
const bodyParser = require('body-parser')
const tasks_route=  require('./routes/task.route')

const app= express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    log.info('request', { req })
    next()
});
app.use('/todos', tasks_route)

app.use((req, res, next) => {
    log.info('response', { res })
    next()
})
module.exports = app