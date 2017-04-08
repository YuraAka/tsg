import React from 'react'
import Menu from './menu'
import ApiClient from '../service/api_client'

export default class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn : ApiClient.isLoggedIn()
    }
  }

  componentDidMount() {
    this.unsubscribe = ApiClient.subscribe((loggedIn) => {
      this.setState({ loggedIn: loggedIn })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  getChildContext() {
    return {loggedIn : this.state.loggedIn}
  }

  render() {
    return (
        <div>
            <header>
                <p>Header123</p>
            </header>
            <Menu/>
            {this.props.children}
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    )
  }
}

Layout.childContextTypes = {
  loggedIn: React.PropTypes.bool
}
