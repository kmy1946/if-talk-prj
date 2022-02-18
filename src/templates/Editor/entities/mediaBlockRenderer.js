import React from "react";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";

export const mediaBlockRenderer = block => {
	if (block.getType() === "atomic") {
		return {
			component: Media,
			editable: false
		};
	}

	return null;
};

const Image = props => {
	if (!!props.src) {
		return <img src={props.src} style={{maxWidth:'100%'}} />;
	}
	return null;
};

const Media = props => {
	const {contentState, block} = props;
	const entityKey = block.getEntityAt(0);
	const entity = contentState.getEntity(entityKey);
	const { src } = entity.getData();
	const type = entity.getType();

	let media;
  console.log('media')
  console.log(media)

	if (type === "image") {
		media = <Image src={src} />;
	}

	return media;
};
