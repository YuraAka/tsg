module.exports = {
  login(flat, pass, result) {
    //result = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (result) result(true)
      this.onChange(true)
      return
    }

    pretendRequest(flat, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (result) result(true)
        this.onChange(true)
      } else {
        if (result) result(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(result) {
    delete localStorage.token
    if (result) result()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}

function pretendRequest(flat, pass, result) {
  setTimeout(() => {
    fetch('/auth_z', {
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
