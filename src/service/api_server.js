import secret from './secret'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'

export default class ApiServer {
  constructor(app, db) {
    this.app = app
    this.db = db

    this.app.post('/auth', this.authUser.bind(this))
    this.app.use('/api', expressJwt({ secret: secret }))
    this.app.get('/api/fetch_news', this.loadNews.bind(this))
    this.app.get('/api/load_water', this.loadWater.bind(this))
    this.app.post('/api/send_water', this.sendWater.bind(this))
    this.app.post('/api/save_article', this.saveArticle.bind(this))
    this.app.get('/api/load_article', this.loadArticle.bind(this))
  }

  authUser(req, res) {
    const user = this.db.loadUser(req.body.flat, req.body.password)
    if (!user) {
      res.status(401).send('Wrong flat or password')
    } else {
      res.json({
        token: jwt.sign(user, secret, { expiresIn: "10h" }),
        user: user
      })
    }
  }

  loadNews(req, res) {
    res.json(this.db.readNews())
  }

  loadWater(req, res) {
    res.json(this.db.readWater())
  }

  sendWater(req, res) {
    res.json(this.db.writeWater(req.body))
  }

  loadArticle(req, res) {
    res.json(this.db.readArticle(req.query.id))
  }

  saveArticle(req, res) {
    res.json(this.db.writeArticle(req.body))
  }
}
