import path from 'path'
import { Server } from 'http'
import Express from 'express'
import Stormpath from 'express-stormpath'
import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './routes'
import NotFoundPage from './components/not_found_page'
import bodyParser from 'body-parser'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'

// todo hide it out to config
const secret = 'rMWWrh2DtdWftD6JJTWG3nQjyEEstxJuUg2WqSbGHJyZcekxK7QC5gxtLMvQUPUrWMcbfYvN'
'zDrnvmw5jbhdhrhE3Cky4RNQuCCksHKBcLPhWacRW6V5m4kdggBaXZBg'

// initialize the server and configure support for ejs templates
const app = new Express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')))

// todo use cookies for token transport
// We are going to protect /api routes with JWT
app.use('/api', expressJwt({ secret: secret }));

app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.post('/auth', (req, res) => {
  /// todo go to database
  console.info(req.body)
  if (!(req.body.flat === '17' && req.body.password === '123')) {
    res.status(401).send('Wrong user or password')
    return;
  }

  // build a token, then pass this token to each api call
  var profile = {
    first_name: 'yura',
    last_name: 'akatov',
    email: 'yuraaka@somemail.com',
    id: 123
  };

  var answer = {
    token: jwt.sign(profile, secret, { expiresIn: "5m" })
  }

  res.json(answer)
})

app.get('/api/auth_info', (req, res) => {
  res.json({ logged: true })
})

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message)
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      }

      let env = {
        name: 'server',
        verify(token, cb) {
          jwt.verify(token, secret, null, (error, decoded) => {
            cb(error === null)
          })
        }
      }

      // generate the React markup for the current route
      let markup

      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(
          <RouterContext
            {...renderProps}
            createElement={(Component, props) => { return <Component env={env} {...props} /> }}
          />
        )
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage />)
        res.status(404)
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup })
    }
  )
})

// start the server
const port = process.env.PORT || 2406
const env = process.env.NODE_ENV || 'production'
app.listen(port, err => {
  if (err) {
    return console.error(err)
  }
  console.info(`Server running on http://localhost:${port} [${env}]`)
})