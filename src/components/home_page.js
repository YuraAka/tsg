import React from 'react'
import {Link, browserHistory} from 'react-router'
import auth from '../auth'

class ArticlePreview extends React.Component {
  render() {
    return (
      <div>
        <Link to={'/news/' + this.props.id}>{this.props.title}</Link>
        <div>{this.props.preview}</div>
      </div>
    )
  }
}

export default class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {articles : []}
  }

  componentDidMount() {
    console.log(localStorage.token)
    fetch('/api/fetch_news', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    }).then((res) => {
      if (res.status === 401) {
        // todo create DatabaseClient, encapsulating api requests and login redirects, token update
        auth.logout()
        browserHistory.push('/')
        throw 'donotknow'
      }

      return res.json()
    }).then((json) => {
      this.setState({articles: json})
    }).catch((err) => {
      console.info(err)
    })
  }

  render() {
    return (
      <div>
        <span>news</span>
        {
          this.state.articles.map((article) => {
            return <ArticlePreview 
              title={article.title} 
              preview={article.preview} 
              key={article.id}
              id={article.id}
            />
          })
        }
      </div>
    )
  }
}
