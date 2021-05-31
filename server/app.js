const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')

dotenv.config()

connectDB()

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(4001, () => {
  console.log('listening for request on port 4000')
})
