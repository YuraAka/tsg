import React from 'react'
import {EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'
import ApiClient from '../service/api_client'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      readonly: this.props.params.id !== 'new'
    }

    this.onChange = this._onChange.bind(this)
    this.onSave = this._onSave.bind(this)
    this.onEdit = this._onEdit.bind(this)

    // ... handle new on save => invent id
  }

  _onChange(editorState) {
    this.setState({editorState: editorState})
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
        <div onClick={this.focus}>
          <Editor
            toolbarHidden={this.state.readonly}
            readOnly={this.state.readonly}
            editorState={this.state.editorState}
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
            onEditorStateChange={this.onChange}
            ref='editor'
          />
        </div>
        {!this.state.readonly && <button onClick={this.onSave}>Сохранить</button>}
        {this.state.readonly && <button onClick={this.onEdit}>Изменить</button>}
      </div>
    )

    // uploadCallback={uploadImageCallBack}
  }
}