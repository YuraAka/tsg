import React, { PropTypes } from 'react'
import { Router, browserHistory } from 'react-router'
import routes from '../routes'

export default class Routing extends React.Component {
  render() {
    return (
      <Router
        history={browserHistory}
        routes={routes}
        onUpdate={() => window.scrollTo(0, 0)}
      />
    )
  }
}
