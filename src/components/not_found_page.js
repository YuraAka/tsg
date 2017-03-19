import React from 'react'
import {Link} from 'react-router'

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <div>Not found, hey</div>
        <p>
          <Link to="/">Go back to the main page</Link>
        </p>
      </div>
    )
  }
}
