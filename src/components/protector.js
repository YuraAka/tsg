import React from 'react'
import auth from '../auth'
import LoginPage from './login_page'

export default (Protectee) => {
  class Protector extends React.Component {
    constructor(props, context) {
      super(props, context)
      this.state = {
        loggedIn: auth.isLoggedIn()
      }
    }

    _tryRedirect() {
      if (!this.state.loggedIn) {
        this.context.router.transitionTo('/login')
      }
    }

    componentDidMount() {
      this.unsubscribe = auth.subscribe((loggedIn) => {
        this.setState({ loggedIn: loggedIn })
        this._tryRedirect()
      })

      this._tryRedirect()
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    render() {
      return <Protectee {...this.props} />
    }
  }

  return Protector
}