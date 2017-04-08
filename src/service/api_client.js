import 'isomorphic-fetch'
import Promise from 'es6-promise'
import { browserHistory } from 'react-router'

let subscribers = []

Promise.polyfill()

function doSuccess(cb, data) {
  if (!cb.onSuccess) {
    return
  }

  cb.onSuccess(data)
}

function doFail(cb, data) {
  if (!cb.onFail) {
    return
  }

  cb.onFail(data)
}

function invokeApi(req, method, cb, data=null) {
  let fields = {
    credentials: 'same-origin',
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }

  if (data) {
    fields.body = JSON.stringify(data)
  }

  console.info(fields)
  /*fetch('http://httpbin.org/headers', fields).then(res => {
    return res.json()
  }).then(json => {
    console.info(json)
  })*/

  fetch(req, fields).then((res) => {
    if (res.status >= 200 && res.status <= 300) {
      return res.json()
      .then((json) => {
        doSuccess(cb, json)
      })
      .catch((err) => {
        console.error(err)
      })
    }

    doFail(cb, res)
  })
}

function notify(data) {
  subscribers.map((subscriber) => {
    subscriber(data)
  })
}

export default class ApiClient {

  static subscribe(subscriber) {
    subscribers.push(subscriber)
    return () => {
      const idx = subscribers.indexOf(subscriber)
      subscribers.splice(idx, 1)
    }
  }

  static login(credentials, cb) {
    if (localStorage.token) {
      doSuccess(cb)
      notify(true)
      return
    }

    invokeApi(
      '/auth', 
      'POST', 
      {
        onSuccess: (result) => {
          localStorage.token = result.token
          doSuccess(cb)
          notify(true)
        },
        onFail: () => {
          doFail(cb)
          notify(false)
        }
      }, 
      credentials
    )
  }

  static logout() {
    delete localStorage.token
    notify(false)
  }

  static isLoggedIn() {
    return !!localStorage.token
  }

  static _invoke(req, method, cb, data) {
    let wrappedCb = {
      onSuccess: (res) => {
        doSuccess(cb, res)
      },
      onFail: res => {
        if (res.status == 401) {
          this.logout()
          browserHistory.push('/login')
        }
        
        doFail(cb, res)
      }
    }

    invokeApi(req, method, wrappedCb, data)
  }

  static loadNews(cb) {
    this._invoke('/api/fetch_news', 'GET', cb)
  }

  static loadWater(cb) {
    this._invoke('/api/load_water', 'GET', cb)
  }

  static sendWater(cb, data) {
    console.info(data)
    this._invoke('/api/send_water', 'POST', cb, data)
  }
}