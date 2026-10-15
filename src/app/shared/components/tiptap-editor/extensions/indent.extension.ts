import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create({
  name: 'indent',

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'blockquote'],
      minLevel: 0,
      maxLevel: 210,
      step: 30,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: element => parseInt(element.style.paddingLeft) || 0,
            renderHTML: attributes => {
              if (!attributes['indent']) return {};
              return { style: `padding-left: ${attributes['indent']}px` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent: () => ({ tr, state, dispatch, editor }) => {
        const { selection } = state;
        let docChanged = false;
        
        if (editor.can().sinkListItem('listItem')) {
            return editor.chain().sinkListItem('listItem').run();
        }

        tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs['indent'] || 0;
            const nextIndent = Math.min(currentIndent + this.options.step, this.options.maxLevel);
            if (nextIndent !== currentIndent) {
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: nextIndent });
              docChanged = true;
            }
          }
        });

        if (docChanged && dispatch) {
            dispatch(tr);
            return true;
        }
        return false;
      },
      outdent: () => ({ tr, state, dispatch, editor }) => {
        const { selection } = state;
        let docChanged = false;
        
        if (editor.can().liftListItem('listItem')) {
            return editor.chain().liftListItem('listItem').run();
        }

        tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs['indent'] || 0;
            const nextIndent = Math.max(currentIndent - this.options.step, this.options.minLevel);
            if (nextIndent !== currentIndent) {
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: nextIndent });
              docChanged = true;
            }
          }
        });

        if (docChanged && dispatch) {
            dispatch(tr);
            return true;
        }
        return false;
      },
    };
  },
  
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      'Shift-Tab': () => this.editor.commands.outdent(),
    };
  },
});
