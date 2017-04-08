import 'isomorphic-fetch'
import Promise from 'es6-promise'

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

  cb.doFail(data)
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

  fetch(req, fields).then((res) => {
    if (res.status >= 200 && res.status <= 300) {
      return res.json()
    }

    if (res.status == 401) {
      browserHistory.push('/login')
      auth.logout()
    }

    doFail(cb)
    return res.json().then(Promise.reject.bind(Promise))
    
  }).then((json) => {
    doSuccess(cb, json)
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

  static loadNews(cb) {
    invokeApi('/api/fetch_news', 'GET', cb)
  }
}