import React, { Component, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import './editor.css'

const TextEdition =() => {
  const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),//htmlToEState(html)//
      );
  const onEditorStateChange = (e,editorState) => {
    setEditorState(editorState)
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }
    return (
      <div className="texteditor_group">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(e) => onEditorStateChange(e)}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
}
export default TextEdition;