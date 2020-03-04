import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'
import path from 'path'
import resolvers from './resolvers'
import typeDefs from './types'

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

mongoose.connection.once('open', () => {
  console.log('Connected to database: %s', process.env.MONGODB_URI)
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

server.applyMiddleware({ app, path: '/graphql' })

export default app