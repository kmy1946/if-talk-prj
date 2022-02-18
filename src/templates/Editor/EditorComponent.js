import React from "react";
import { EditorState, RichUtils, AtomicBlockUtilsconvertFromRaw, ContentState, convertToRaw, convertFromRaw, AtomicBlockUtils } from "draft-js";
import Editor from '@draft-js-plugins/editor';
import { mediaBlockRenderer } from "./entities/mediaBlockRenderer";
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const plugins = [linkifyPlugin, hashtagPlugin];

class EditorComponent extends React.Component {
	constructor(props) {
		super(props);
    console.log('props',props)
		this.state = {
			editorState: EditorState.createEmpty()
		};
	}

	onChange = editorState => {
		this.setState({
			editorState
		});
	};

	handleKeyCommand = command => {
		const newState = RichUtils.handleKeyCommand(
			this.state.editorState,
			command
		);
		if (newState) {
			this.onChange(newState);
			return "handled";
		}
		return "not-handled";
	};

	onURLChange = e => this.setState({ urlValue: e.target.value });

	focus = () => this.refs.editor.focus();

	onAddImage = e => {
		e.preventDefault();
		const editorState = this.state.editorState;
		const urlValue = window.prompt("Paste Image Link");
		
		const contentState = editorState.getCurrentContent();
		const contentStateWithEntity = contentState.createEntity(
			"image",
			"IMMUTABLE",
			{ src: urlValue }
		);
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
		const newEditorState = EditorState.set(
			editorState,
			{ currentContent: contentStateWithEntity },
			"create-entity"
		);
		const newEditorStateWithBlock = AtomicBlockUtils.insertAtomicBlock(
			newEditorState,
			entityKey,
			" "
		)

		this.setState( { editorState: newEditorStateWithBlock },
			() => { setTimeout(() => this.focus(), 0); }
		);
	};

	onUnderlineClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
		);
	};

	onBoldClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
	};

	onItalicClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
		);
	};

	onSave(e) {
		e.preventDefault();
		const { editorState } = this.state;
		const contentState = editorState.getCurrentContent();
		
		let rawContent = convertToRaw(contentState);
		
		for(let i = 0; i < rawContent.blocks.length; i++) {
		let b = rawContent.blocks[i];
		if(b["type"] !== "unstyled" && b.entityRanges.length === 1) {
		const entityKey = b["entityRanges"][0]["key"];
		const entityMap = rawContent["entityMap"][entityKey];
		if(entityMap["type"] === "image") {
		rawContent["entityMap"][entityKey]["data"]["src"] = "/uploads-from-my-server/test.png";
			}
			}
		}
		
		const newContentState = convertFromRaw(rawContent);
		const newEditorState = EditorState.push(this.state.editorState, newContentState, "update-contentState");
		this.setState({editorState: newEditorState});
		}

	render() {
		return (
			<div className="editorContainer">
				<button onClick={this.onUnderlineClick}>U</button>
				<button onClick={this.onBoldClick}>
					<b>B</b>
				</button>
				<button onClick={this.onItalicClick}>
					<em>I</em>
				</button>
				<button className="inline styleButton" onClick={this.onAddImage}>
					<i className="material-icons">Image</i>
				</button>
				<div className="editors">
					<Editor
            //wrapperClassName="wrapper-class" editorClassName="editor-class" toolbarClassName="toolbar-class"
            plugins={plugins}
            //localization={{ locale: 'ja', }}
						blockRendererFn={mediaBlockRenderer}
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
						plugins={this.plugins}
						ref="editor"
            value={this.props.description}
            editorState={this.props.editorState} onChange={this.props.handleEditorChange}//onEditorStateChange={this.props.handleEditorChange} 
            
					/>
				</div>
			</div>
		);
	}
}

export default EditorComponent;