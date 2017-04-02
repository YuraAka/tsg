let clients = []

module.exports = {
  login(flat, pass, callback) {
    if (this.isLoggedIn()) {
      callback(true)
      this.onChange(true)
      return
    }

    sendAuth(flat, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
      }

      callback(res.authenticated)
      this.onChange(res.authenticated)
    })
  },
  
  logout() {
    delete localStorage.token
    this.onChange(false)
  },

  isLoggedIn() {
    return !!localStorage.token
  },

  subscribe(client) {
    clients.push(client)
    return () => {
      const idx = clients.indexOf(client)
      clients.splice(idx, 1)
    }
  },

  onChange(result) {
    clients.map((client) => {
      client(result)
    })
  }
}

function sendAuth(flat, pass, callback) {
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
    console.log(json)
    callback({
      authenticated: true,
      token: json.token
    })
  }).catch(err => {
    callback({ authenticated: false })
  })
}
