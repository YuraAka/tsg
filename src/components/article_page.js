import React from 'react'

export default class Article extends React.Component {
  render() {
    return (
      <div>Article id: {this.props.params.id}</div>
    )
  }
}