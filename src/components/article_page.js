import React from 'react'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
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

export default class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      readonly: true
    }

    /// todo apply good formatting from file:///Users/Yura/dev/react/draft-js/examples/draft-0-10-0/rich/rich.html
    this.onChange = this._onChange.bind(this)
    this.onClick = this._onClick.bind(this)
    this.onShortcut = this._onShortCut.bind(this)
    this.onSave = this._onSave.bind(this)
    this.onEdit = this._onEdit.bind(this)
    this.onTab = this._onTab.bind(this) // todo not working
    this.focus = () => this.refs.editor.focus()
  }

  _onChange(editorState) {
    this.setState({editorState: editorState})
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
      this.onChange(newState)
      return true
    }
    return false
  }

  _onTab(e) {
    this.onChange(RichUtils.onTab(e, this.state.editorState, 2))
  }

  _onSave() {
    const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    ApiClient.saveArticle(
      {
        onSuccess: (ans) => {
          this.setState({
            readonly: true
          })
        },
        onFail: () => {
          this.setState({
            error: true
          })
        }
      },
      {
        id: this.props.params.id,
        data: content
      }
    )
  }

  _onEdit() {
    this.setState({
      readonly: false
    })
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
      this.props.params.id
    )
  }

  render() {
    return (
      <div>
        {!this.state.readonly && <StylePanel onClick={this.onClick}/>}
        <div onClick={this.focus}>
          <Editor 
            editorState={this.state.editorState} 
            onChange={this.onChange}
            handleKeyCommand={this.onShortcut}
            readOnly={this.state.readonly}
            spellCheck={true}
            onTab={this.onTab}
            ref='editor'
          />
        </div>
        {!this.state.readonly && <button onClick={this.onSave}>Сохранить</button>}
        {this.state.readonly && <button onClick={this.onEdit}>Изменить</button>}
      </div>
    )
  }
}