import React from 'react'
import Menu from './menu'
import auth from '../auth'

export default class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn : auth.isLoggedIn()
    }
  }

  componentDidMount() {
    this.unsubscribe = auth.subscribe((loggedIn) => {
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
