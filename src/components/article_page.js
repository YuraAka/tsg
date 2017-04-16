import React from 'react'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'
import ApiClient from '../service/api_client'

class StyleButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}>{this.props.name}</button>
    )
  }
}

class StylePanel extends React.Component {
  _onClick(action, inline) {
    return function() {
      this.props.onClick(action, inline)
    }
  }

  render() {
    return (
      <div>
        <StyleButton onClick={this._onClick('BOLD', true).bind(this)} name={<b>B</b>}/>
        <StyleButton onClick={this._onClick('ITALIC', true).bind(this)} name={<i>I</i>}/>
        <StyleButton onClick={this._onClick('UNDERLINE', true).bind(this)} name={<u>U</u>}/>
        <StyleButton onClick={this._onClick('unordered-list-item', false).bind(this)} name='UL'/>
        <StyleButton onClick={this._onClick('ordered-list-item', false).bind(this)} name='OL'/>
      </div>
    )
  }
}

class EditableArticle extends React.Component {
  constructor() {
    super()
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = editorState => this.setState({editorState: editorState})
    this.onClick = this._onClick.bind(this)
    this.onShortcut = this._onShortCut.bind(this)
    this.onSave = this._onSave.bind(this)
  }

  _onClick(action, inline) {
    if (inline) {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, action))
    } else {
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, action))
    }
  }

  _onShortCut(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onSave() {
    const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    ApiClient.saveArticle(
      {
        onSuccess: (ans) => {
          this.setState({
            saved: true
          })
        },
        onFail: () => {
          this.setState({
            error: true
          })
        }
      },
      {
        id: this.props.id,
        data: content
      }
    )
  }

  componentDidMount() {
    ApiClient.loadArticle(
      {
        onSuccess: (article) => {
          if (article && article.data) {
            const contentState = convertFromRaw(JSON.parse(article.data))
            this.setState({
              editorState: EditorState.createWithContent(contentState)
            })
          }
        }
      },
      this.props.id
    )
  }

  render() {
    return (
      <div style={{marginBottom: 10}}> 
        <StylePanel onClick={this.onClick}/>
        <Editor 
          editorState={this.state.editorState} 
          onChange={this.onChange}
          handleKeyCommand={this.onShortcut}
        />
        <button onClick={this.onSave}>Сохранить</button>
      </div>
    )
  }
}

export default class Article extends React.Component {
  render() {
    return (
      <div>
        <div>Article id: {this.props.params.id}</div>
        <EditableArticle id={this.props.params.id}/>
      </div>
    )
  }
}