import React, { Children, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageArea from "../components/Products/ImageArea";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { db } from "../Firebase";
import { saveProduct } from "../reducks/products/operation";
import './productedit.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, DefaultDraftBlockRenderMap,
          ContentState, convertToRaw, convertFromRaw,
          Modifier, SelectionState,
} from 'draft-js';
import createImagePlugin from "@draft-js-plugins/image";
import createPrismPlugin from 'draft-js-prism-plugin';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css'
import DOMPurify from 'dompurify';
import Immutable from 'immutable';
import draftToHtml from "draftjs-to-html";
import { hideLoadingAction,  } from "../reducks/loading/actions";
import { CodeBlock } from ".";
import PrismDecorator from "./Editor/PrismDecorator";
import NewLineDecorator from "./Editor/PrismDecorator";
import MultiDecorator from "./Editor/MultiDecorator";

const CodeBlockOriginal = (contentBlock, props) => {
  return (
    <pre>
      <code>
        <p>
          {props.contentText}
        </p>
      </code>
    </pre>
  )
}

function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType()
  const contentText = contentBlock.getText();
  if (type === 'code') {
    console.log(type)
    return {
      component: CodeBlock,
      editable: true,
      props:{
        contentText:contentText
      }
    }
  }
}

const blockRenderMap = Immutable.Map({//デフォルトのBlockRenderMapにタグに対応するMapオブジェクト
  'section': {
    element: 'section',
  },
  'unstyled': {
    element: 'span',
    aliasedElements: ['div'],
  },
  //'code': {element: 'code',}
  'code-block': {//
    element: 'code',
    aliasedElements: ['pre'],
    //nestingEnabled: false
  },
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const ProdctEditRich = () => {
  const dispatch = useDispatch()
  const styleMap = {//customstulemap
    'STRIKETHROUGH': {
      textDecoration: 'line-through',
    },
    'BOLD': {
      fontWeight: 'bold',
    },
    //'CODE': {backgroundColor: '#grey',}
  };

  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'custom') {      
      return {
        //component: Code_Component,
        editable: false,
        props: {
          foo: 'bar',
        },
      }
    }
  }
  let _contentState = ContentState.createFromText('Sample Content');
  const raw = convertToRaw(_contentState)
  //const [contentState, setContentState] = useState(raw)

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),//htmlToEState(html)//

    //() => EditorState.createWithContent( convertFromRaw(data),
      //new MultiDecorator([ new PrismDecorator({ defaultSyntax: 'javascript' }),
      //  new NewLineDecorator() ]))
    );
  const  [description, setDescription] = useState();
  const handleEditorChange = (state, e) => {
    setEditorState(state);
    convertContentToHTML();
  }
  //console.log(editorState)
  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))//convertToHTML(editorState.getCurrentContent());
    setDescription(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  let id = window.location.pathname.split('/product/edit')[1];
  if (id === undefined) {//新規作成時UncaughtError回避
    id = ""
  }
  if (id !== "") {
      id = id.split('/')[1]
      //console.log(id)
  }

  const [images, setImages] = useState([]),
        [name, setName] = useState(""),
        [category, setCategory] = useState(""),
        [categories, setCategories] = useState([]),
        [clients, setClients] = useState("");
  const username = localStorage.getItem('if-username')

  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName])
  //const inputDescription = useCallback((event) => {
    //setDescription(event.target.value)
  //}, [setDescription])

  useEffect(() => {
    if (id !== "") {//編集ページではない時
      db.collection('products').doc(id).get()
          .then(snapshot => {
            const product = snapshot.data();
            setImages(product.images);
            setName(product.name);
            setCategory(product.category);
            setClients(product.clients);
            setDescription(product.description);
      })
    }
    dispatch(hideLoadingAction());
  }, [id]);

  useEffect(() => {
    db.collection('categories')
        .orderBy('order', 'asc')
        .get()
        .then(snapshots => {
          const list = []
          snapshots.forEach(snapshot => {
            const data = snapshot.data()
            //console.log(data)
            list.push({
              id:data.id,
              name:data.name
            })
          })
          setCategories(list)
        })
  }, [])

  const target_clients = [
    {id:"all", name:"全て"},
    {id:"beginner", name:"初心者"},
    {id:"intermediate", name:"中級者"},
    {id:"advanced", name:"上級者"}
  ]

  const edit_title = () => {
    if (id !== "") {
      return (
        <h2 className="u-text__headline_post u-text-center_post">記事の編集</h2>
      )
    } else {
      return (
        <h2 className="u-text__headline_post u-text-center_post">記事の登録</h2>
        )
    }
  }

  const imagePlugin = createImagePlugin();
  //const PrismPlugin = createPrismPlugin();

  const Image = (props) => {
    return <img src={props.src} alt="" />;
  };


  return (
    <section>
      <div className="module-spacer--xsmall" />
      {edit_title()}
      <div className="c-section-container_post">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true} label={"タイトル"} multiline={false} required={true}
          onChange={inputName} rows={1} value={name} type={"text"}
        />
        <div className="module-spacer--medium" />
        <SelectBox
          label={"カテゴリ"} required={true} fullWidth={true} options={categories} select={setCategory} value={category}
        />　　　
        <SelectBox
          label={"対象者"} required={true} fullWidth={true} options={target_clients} select={setClients} value={clients}
        />
        <div className="module-spacer--medium" />
        {/*
        <EditorComponent wrapperClassName="wrapper-class" editorClassName="editor-class" toolbarClassName="toolbar-class"
          description={description}
          editorState={editorState} handleEditorChange={handleEditorChange} 
        />
        */}{/*
        <TextEditor description={description}/>
        {description}
        */}
        <Editor //contenteditable="true"
          editorState={editorState}
          onEditorStateChange={handleEditorChange} 
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          value={description}
          toolbar={{
            options: ['inline', 'blockType','fontFamily', 'textAlign', 'list', 'colorPicker', 'link', 'image', 'remove', 'history'],//, 'emoji'
            inline: { inDropdown: true, options: ['bold', 'italic', 'underline', 'monospace','strikethrough', 'superscript', 'subscript'] },//
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            blockType: { options: ['Normal', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'], },
            //image: {urlEnabled: true, uploadEnabled: true,uploadCallback: (file) => uploadImage(file),//upload_DescriptionImages,
              //previewImage: true,alt: { present: true, mandatory: true },inputAccept: "image/*",}
            }}
          localization={{
            locale: 'ja',
            }}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
          blockRendererFn={myBlockRenderer}
          blockRenderMap={extendedBlockRenderMap}
          //plugins={PrismPlugin}
          //plugins={plugins}
          //plugins={[imagePlugin]}
          //readOnly={true}
          handleReturn={(event, state) => {
            const contentState = state.getCurrentContent()
            const selection = state.getSelection()
            const currentBlock = contentState.getBlockForKey(
              selection.getStartKey()
            )
            if (
              selection.isCollapsed() &&
              currentBlock.getType() === 'code'
            ) {
              if (event.metaKey) {
                const nextContentBlock = contentState.getBlockAfter(
                  selection.getStartKey()
                )
                if (nextContentBlock) {
                  const newEditorState = EditorState.forceSelection(
                    editorState,
                    new SelectionState().merge({
                      anchorKey: nextContentBlock.getKey(),
                      focusKey: nextContentBlock.getKey()
                    })
                  )
                  setEditorState(newEditorState)
                } else {
                  // insert new block;
                  let newContentState = Modifier.splitBlock(
                    contentState,
                    selection.merge({
                      anchorOffset: currentBlock.getLength()
                    })
                  )
                  newContentState = Modifier.setBlockType(
                    newContentState,
                    newContentState.getSelectionAfter(),
                    'unstyled'
                  )
                  const newEditorState = EditorState.push(
                    editorState,
                    newContentState,
                    'split-block'
                  )
                  setEditorState(newEditorState)
                }
              } else {
                let newContentState = Modifier.insertText(
                  contentState,
                  selection,
                  '\n'
                )
                const newEditorState = EditorState.push(
                  editorState,
                  newContentState,
                  'insert-characters'
                )
                setEditorState(newEditorState)
              }
              return 'handled'
            }
          }}
        />
        {/*}
        <Editor //contenteditable="true"
          editorState={editorState} onEditorStateChange={handleEditorChange} 
          wrapperClassName="wrapper-class" editorClassName="editor-class" toolbarClassName="toolbar-class"
          value={description}
          //blockRendererFn={myBlockRenderer}
        />
        */}
        <div className="center">
          <PrimaryButton
            label={"記事を投稿する"}
            onClick={() => dispatch(saveProduct(id, name, images, description, category, clients, username))}
          />
        </div>
        <br/>

        <p>Preview:</p>
        <div className="preview" dangerouslySetInnerHTML={createMarkup(description)}></div>
        {description}
        <div className="module-spacer--medium" />
      </div>

    </section>
  )
}
export default ProdctEditRich;