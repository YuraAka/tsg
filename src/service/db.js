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
      if (flat !== '17' || password !== '123') {
        return null
      }

      return {
        first_name: 'yura',
        last_name: 'akatov',
        email: 'yuraaka@somemail.com',
        id: 123
      }
  }

  readNews() {
    return [
      {
        title: 'Mr. Brown birthday',
        preview: 'mr brown is celebrating birthday today',
        date: 1234566,
        id: 1
      },
      {
        title: 'First metting of new TSG members',
        preview: 'TSG government met after elections',
        date: 1234566,
        id: 2
      }
    ]
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
}