import secret from './secret'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'

export default class ApiServer {
  constructor(app, db) {
    this.app = app
    this.db = db

    this.app.use('/api', expressJwt({ secret: secret }))
    this.app.get('/api/fetch_news', this.loadNews.bind(this))
    this.app.post('/auth', this.authUser.bind(this))
  }

  loadNews(req, res) {
    res.json(this.db.loadNews())
  }

  authUser(req, res) {
    const user = this.db.loadUser(req.body.flat, req.body.password)
    if (!user) {
      console.info('BAD USER')
      return
    }

    var answer = {
      token: jwt.sign(user, secret, { expiresIn: "10h" })
    }

    res.json(answer)
  }
}
