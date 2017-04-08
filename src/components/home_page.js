import React from 'react'
import {Link, browserHistory} from 'react-router'
import ApiClient from '../service/api_client'

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
    ApiClient.loadNews({
      onSuccess: articles => {
        this.setState({articles: articles})
      }
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
