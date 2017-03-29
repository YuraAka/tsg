import React, { PropTypes } from 'react'
import { Router, browserHistory } from 'react-router'
import routes from '../routes'
import auth from '../auth'

export default class Routing extends React.Component {
  /*constructor(props, context) {
      super(props, context)

      this.state = {
          loggedIn : auth.loggedIn()
      }
  }

  componentDidMount() {
      auth.onChange = (loggedIn) => this.setState({loggedIn})
  }

  getChildContext() {
      return {loggedIn : this.state.loggedIn};
  }*/

  render() {
    let env = {
      name: 'client',
    }

    return (
      <Router
        history={browserHistory}
        routes={routes}
        onUpdate={() => window.scrollTo(0, 0)}
        createElement={(Component, props) => { return <Component env={env} {...props} /> }}
      />
    )
  }
}

/*
Routing.childContextTypes = {
    loggedIn: React.PropTypes.bool
}*/
