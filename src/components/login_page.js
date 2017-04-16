import React from 'react'
import ApiClient from '../service/api_client'

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
    ApiClient.login(
      {
        flat: this.state.flat,
        password: this.state.password
      },
      {
        onSuccess: () => {
          const { location } = this.props
          this.setState({ error: false })
          
          if (location.state && location.state.nextPathname !== '/logout') {
            this.props.router.replace(location.state.nextPathname)
          } else {
            this.props.router.replace('/')
          }
        },
        onFail: () => {
          this.setState({ error: true })
        }
      }
    )
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
