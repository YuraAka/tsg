import React from 'react'

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      error: false,
      flat: null,
      password: null,
      authed: false
    };
  }

  onSubmit(event) {
    event.preventDefault()
    console.info('hello')
    //auth.login(this.state.flat, this.state.password, this.onLoginCheck.bind(this))
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'flat': this.state.flat,
        'password': this.state.password, // todo use hash
      })
    }).then(res => {
      return res.json()
    }).then(json => {
      console.info('receive', json)
      this.setState({authed: true});
    }).catch(err => {
      console.error('not a json' + err)
    })
  }

  onLoginCheck(loggedIn) {
    if (!loggedIn) {
      return this.setState({ error: true })
    }

    const { location } = this.props

    // anti-react pattern, but I don't know how to make better (thru callback)
    if (location.state && location.state.nextPathname !== '/logout') {
      this.props.router.replace(location.state.nextPathname)
    } else {
      this.props.router.replace('/')
    }
  }

  onFlatChange(event) {
    this.setState({flat: event.target.value})
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <div>
        <p>Login</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label><input placeholder='flat' onChange={this.onFlatChange.bind(this)}/></label>
          <label><input placeholder='password' onChange={this.onPasswordChange.bind(this)}/></label> (hint: 123)<br />
          <button type='submit'>login</button>
          {this.state.error && (<p>Access denied</p>)}
        </form>
      </div>
    )
  }
}
