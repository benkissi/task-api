// const mongodb = require('mongodb')

// const MongoClient = mongodb.MongoClient
// const objectID = mongodb.objectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to database')
    }

    const db = client.db(databaseName)

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5dc97c6377e90719207253df')
    // }, {
    //     $set: {
    //         name: 'Ben Kissi - Success King'
    //     }
    // })

    // updatePromise.then((res) => {
    //     console.log(res)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('task').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((res) => {
    //     console.log(res.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').findOne({ _id: new ObjectID('5dc97c6377e90719207253df') }, (error, doc) => {
    //     if (error) {
    //         return console.log('Could not find user')
    //     }

    //     console.log(doc)

    // })

    // db.collection('users').find({ age: 29 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').insertOne({
    //     name: 'ben',
    //     age: 29
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert doc')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([{ name: 'Maggi', age: 28 },
    // { name: 'Jason', age: 2 }], { ordered: true },
    //     (error, result) => {
    //         if (error) {
    //             return console.log('Could not insert documents')
    //         }

    //         console.log(result.ops)
    //     })

    // db.collection('task').insertMany([
    //     {
    //         description: 'Make a million',
    //         completed: true
    //     },
    //     {
    //         description: 'Get high income job',
    //         completed: true
    //     },
    //     {
    //         description: 'Take a trip to Fiji',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Could not insert')
    //     }

    //     console.log('Inserted', result.ops)
    // })

    db.collection('task').deleteMany({ completed: true }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})