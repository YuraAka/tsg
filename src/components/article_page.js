import React from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js'

class EditableArticle extends React.Component {
  constructor() {
    super()
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = editorState => this.setState({editorState: editorState})
  }

  onShortCut(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <Editor 
        editorState={this.state.editorState} 
        onChange={this.onChange}
        handleKeyCommand={this.onShortCut.bind(this)}
      />
    )
  }
}

export default class Article extends React.Component {
  render() {
    return (
      <div>
        <div>Article id: {this.props.params.id}</div>
        <EditableArticle/>
      </div>
    )
  }
}