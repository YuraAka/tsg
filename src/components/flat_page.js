import React from 'react'
import ApiClient from '../service/api_client'
import { browserHistory } from 'react-router'

export default class FlatPage extends React.Component {
  _logout() {
    ApiClient.logout()
    browserHistory.push('/')
  }

  render() {
    return (
      <div>
        <div>myflat</div>
        <button onClick={this._logout.bind(this)}>Logout</button>
      </div>
    )
  }
}
