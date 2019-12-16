const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.use((error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = app
