import React, { useContext, useEffect, useState }               from 'react';
import { Modifier, EditorState, convertFromRaw, convertToRaw }  from 'draft-js';
import Editor from "@draft-js-plugins/editor";

const NewArticle = () => {
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    const keyDown = (e) => {
        
        if(e.key === 'Tab'){
            
            // Preventing default behavior to keep cursor in the editor
            e.preventDefault();
            
            // Defining number of spaces to apply after tab press
            let tabIndent = '    ';
            
            // Getting current state
            let currentState = editorState;
            
            // Getting variables to know text selection 
            let selectionState      = editorState.getSelection();
            let anchorKey           = selectionState.getAnchorKey();
            let currentContent      = editorState.getCurrentContent();
            let currentContentBlock = currentContent.getBlockForKey(anchorKey);
            let start               = selectionState.getStartOffset();
            let end                 = selectionState.getEndOffset();
            let selectedText        = currentContentBlock.getText().slice(start, end);
            
            // Defining next state
            let nextState = Modifier.replaceText(currentContent, selectionState, tabIndent + selectedText);
            
            // Setting next state
            setEditorState(EditorState.push(currentState, nextState, 'indent'));
            
        }
        
    }
    
    return (
        <div className = 'NewArticle'>
            <div className = 'Write'>
                <Editor
                    editorState  = {editorState}
                    onChange     = {setEditorState}
                    keyBindingFn = {keyDown}
                    placeholder  = {'Write here'}
                />
            </div>
        </div>
    );
}

export default NewArticle;