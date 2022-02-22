import React from 'react'
import DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react'
import DraftEditorLeaf from 'draft-js/lib/DraftEditorLeaf.react'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'

const isBlockOnSelectionEdge = (selection, key) =>
  selection.getAnchorKey() === key || selection.getFocusKey() === key

export default class CodeBlock extends DraftEditorBlock {
  _renderChildren() {
    const block = this.props.block
    const blockKey = block.getKey()
    const text = block.getText()
    const lastLeafSet = this.props.tree.size - 1
    const hasSelection = isBlockOnSelectionEdge(this.props.selection, blockKey)    

    const children = this.props.tree
      .map((leafSet, ii) => {
        const leavesForLeafSet = leafSet.get('leaves')
        // T44088704
        if (leavesForLeafSet.size === 0) {
          return null
        }
        const lastLeaf = leavesForLeafSet.size - 1
        const leaves = leavesForLeafSet
          .map((leaf, jj) => {
            const offsetKey = DraftOffsetKey.encode(blockKey, ii, jj)
            const start = leaf.get('start')
            const end = leaf.get('end')
            return (
              <DraftEditorLeaf
                key={offsetKey}
                offsetKey={offsetKey}
                block={block}
                start={start}
                selection={hasSelection ? this.props.selection : null}
                forceSelection={this.props.forceSelection}
                text={text.slice(start, end)}
                styleSet={block.getInlineStyleAt(start)}
                customStyleMap={this.props.customStyleMap}
                customStyleFn={this.props.customStyleFn}
                isLast={ii === lastLeafSet && jj === lastLeaf}
              />
            )
          })
          .toArray()

        const decoratorKey = leafSet.get('decoratorKey')
        if (decoratorKey == null) {
          return leaves
        }

        if (!this.props.decorator) {
          return leaves
        }
        const decorator = this.props.decorator
        // const decorator = nullthrows(this.props.decorator)

        const DecoratorComponent = decorator.getComponentForKey(decoratorKey)
        if (!DecoratorComponent) {
          return leaves
        }

        const decoratorProps = decorator.getPropsForKey(decoratorKey)
        const decoratorOffsetKey = DraftOffsetKey.encode(blockKey, ii, 0)
        const start = leavesForLeafSet.first().get('start')
        const end = leavesForLeafSet.last().get('end')
        const decoratedText = text.slice(start, end)
        const entityKey = block.getEntityAt(leafSet.get('start'))

        const dir = 'ltr'

        const commonProps = {
          contentState: this.props.contentState,
          decoratedText,
          dir: dir,
          start,
          end,
          blockKey,
          entityKey,
          offsetKey: decoratorOffsetKey
        }

        return (
          <DecoratorComponent
            {...decoratorProps}
            {...commonProps}
            key={decoratorOffsetKey}
          >
            {leaves}
          </DecoratorComponent>
        )
      })
      .toArray()

    let start = 0
    let cursor = 1
    const lines = []
    let lineNum = 1
    for (cursor; cursor < children.length; cursor += 1) {
      const target = children[cursor]
      if (target.props && target.props.lineBreak) {
        lines.push(
          <span className="line" key={lineNum}>
            {children.slice(start, cursor + 1)}
          </span>
        )
        start = cursor + 1
        lineNum += 1
      }
    }

    const end = children.slice(start)

    lines.push(
      <span
        key={lineNum + 1}
        className={`line ${end.length ? '' : 'is-empty'}`}
      >
        {end}
      </span>
    )
    
    return lines
  }
}