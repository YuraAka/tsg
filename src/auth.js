let clients = []

module.exports = {
  login(flat, pass, result) {
    result = arguments[arguments.length - 1]
    if (localStorage.token) {
      result(true)
      this.onChange(true)
      return
    }

    sendAuth(flat, pass, (res) => {
      if (res.authenticated) {
        setCookie('authToken', res.token)
        //localStorage.token = res.token
      }

      result(res.authenticated)
      this.onChange(res.authenticated)
    })
  },
  
  logout(result) {
    delete localStorage.token
    if (result) result()
    this.onChange(false)
  },

  loggedIn() {
    /*result = fetch('/is_auth', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'token': localStorage ? localStorage.token : null
      })
    }).then(res => { // todo better error handling
      return res.json()
    }).then(json => {
      return json.auth === 'ok'
    }).catch(err => {
      return false
    })
 
    console.info('result: ', result)*/
    return !!localStorage.token
  },

  subscribe(client) {
    console.info('SUBSCRIBE')
    clients.push(client)
    return () => {
      console.info('UNSUBSCRIBE')
      const idx = clients.indexOf(client)
      clients.splice(idx, 1)
    }
  },

  onChange(result) {
    console.info('ONCHANGE')
    clients.map((client) => {
      client(result)
    })
  }
}

function sendAuth(flat, pass, result) {
  setTimeout(() => {
    fetch('/auth', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'flat': flat,
        'password': pass, // todo use hash
      })
    }).then(res => { // todo better error handling
      return res.json()
    }).then(json => {
      result({
        authenticated: true,
        token: json.token
      })
    }).catch(err => {
      result({ authenticated: false })
    })
  }, 0)
}
