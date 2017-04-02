import React from 'react'
import Promise from 'es6-promise'
import 'isomorphic-fetch'
import auth from '../auth'

Promise.polyfill()

export default class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      error: false,
      flat: null,
      password: null
    };
  }

  onSubmit(event) {
    event.preventDefault()
    auth.login(this.state.flat, this.state.password, this.onLoginCheck.bind(this))
  }

  onLoginCheck(loggedIn) {
    if (!loggedIn) {
      this.setState({ error: true })
      return
    }

    console.log('perform transition')
      
    const { location } = this.props
    this.setState({ error: false })
    // anti-react pattern, but I don't know how to make better (thru callback)
    if (location.state && location.state.nextPathname !== '/logout') {
      this.props.router.replace(location.state.nextPathname)
    } else {
      this.props.router.replace('/')
    }
  }

  onFlatChange(event) {
    this.setState({ flat: event.target.value })
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <div>
        <p>Login</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label><input placeholder='flat' onChange={this.onFlatChange.bind(this)} /></label>
          <label><input placeholder='password' onChange={this.onPasswordChange.bind(this)} /></label> (hint: 123)<br />
          <button type='submit'>login</button>
          {this.state.error && (<p>Access denied</p>)}
        </form>
      </div>
    )
  }
}
