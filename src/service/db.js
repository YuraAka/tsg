function getMonthName(date) {
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]

  return months[date.getMonth()]
}

function generateWaterKey(date) {
  if (!date) {
    date = new Date()
  }

  return {
    id: date.getFullYear() * 10000 + date.getMonth(),
    title: getMonthName(date) + ' ' + date.getFullYear()
  }
}

export default class Database {
  constructor() {
    this.waterIdx = {}
    this.water = []
    this._prepareWater(10, 11, new Date(2017, 0))
    this._prepareWater(12, 13, new Date(2017, 1))
    this._prepareWater(14, 15, new Date(2017, 2))

    this.articles = {}
    this.nextArticleId = 0
    //this._fillArticles()
  }

  _fillArticles() {
    this.addArticle({
      title: 'Mr. Brown birthday',
      preview: 'mr brown is celebrating birthday today',
      text: 'mr brown is celebrating birthday today, mr brown is celebrating birthday today, mr brown is celebrating birthday today'
    })

    this.addArticle({
      title: 'First metting of new TSG members',
      preview: '<i>TSG</i> government met after elections',
      text: 'TSG <b>government</b> met after elections, TSG government met after elections'
    })
  }

  _prepareWater(hot, cold, date) {
    let wk = generateWaterKey(date)
    if (wk.id in this.waterIdx) {
      return wk
    }

    let now = generateWaterKey()
    this.water.push({
      date: wk,
      cold: cold,
      hot: hot,
      current: wk.id == now.id
    })

    this.waterIdx[wk.id] = this.water.length - 1
    return wk
  }

  loadUser(flat, password) {
      if (flat === '17' || password === '123') {
        return {
          first_name: 'yura',
          last_name: 'akatov',
          email: 'yuraaka@somemail.com',
          admin: true,
          id: 1
        }
      }

      if (flat === 18 || password === '321') {
        return {
          first_name: 'vasya',
          last_name: 'pupkin',
          email: 'pupking@somemail.com',
          admin: false,
          id: 2
        }
      }

      return null
  }

  readNews() {
    let result = []
    Object.keys(this.articles).forEach(key => {
      let value = this.articles[key]
      result.push({
        title: value.title,
        preview: value.preview,
        date: value.date,
        id: key
      })
    })

    return result
  }

  readWater() {
    this._prepareWater('', '', new Date())

    // todo need refresh, but if we have a db, it is not needed
    return this.water
  }

  writeWater(data) {
    let wk = generateWaterKey()
    // todo: check for expiration
    const pos = this.waterIdx[wk.id]
    let cur = this.water[pos]
    cur.hot = data.hot
    cur.cold = data.cold

    return wk
  }

  writeArticle(article) {
    this.articles[article.id] = article.data
    return {id: article.id}
  }

  readArticle(id) {
    if (id in this.articles) {
      return {
        data: this.articles[id]
      }
    }
  
    return {
      error: 'not found'
    }
  }

  addArticle(data) {
    let article = data
    article.date = 1234566

    let id = this.nextArticleId++
    this.articles[id] = article
    return id
  }
}