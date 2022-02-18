import React, { useState } from "react";
import { convertFromRaw, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
const initData = convertFromRaw({
  blocks: [
    {
      key: "16d03",
      text: "なんでもないテキスト。",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "98pea",
      text: "https://dummyimage.com/100x100/000/fff",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: "16d04",
      text: "なんでもないテキスト。。。。。",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "98peb",
      text: "https://dummyimage.com/100x100/fff/000",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 1,
        },
      ],
      data: {},
    },
  ],
  entityMap: {
    0: {
      type: "image",
      mutability: "IMMUTABLE",
      data: { src: "https://dummyimage.com/100x100/000/fff" },
    },
    1: {
      type: "image",
      mutability: "IMMUTABLE",
      data: { src: "https://dummyimage.com/100x100/fff/000" },
    },
  },
});

const initState = EditorState.createWithContent(initData)

function EditorApp() {
  const [editorState, setEditorState] = useState(initState);

  const Image = (props) => {
    return <img src={props.src} alt="" />;
  };

  const Media = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === "image") {
      media = <Image src={src} />;
    }

    return media;
  };

  const myBlockRenderer = (block) => {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }

    return null
  }

  return (
    <div className="wrapper">
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockRendererFn={myBlockRenderer}
      />
    </div>
  );
}

export default EditorApp;