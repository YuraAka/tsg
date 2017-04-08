import path from 'path'
import { Server } from 'http'
import Express from 'express'
import bodyParser from 'body-parser'
import Database from './service/db'
import ApiServer from './service/api_server'

const app = new Express()
app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

const db = new Database()
const api = new ApiServer(app, db)

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')))
app.use("*", Express.static(__dirname + '/static'));

// start the server
const port = process.env.PORT || 2406
const env = process.env.NODE_ENV || 'production'
app.listen(port, err => {
  if (err) {
    return console.error(err)
  }

  console.info(`Server running on http://localhost:${port} [${env}]`)
})