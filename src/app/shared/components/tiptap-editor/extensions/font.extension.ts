import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
    fontFamily: {
      setFontFamily: (fontFamily: string) => ReturnType;
      unsetFontFamily: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() { 
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => {
              const size = element.style.fontSize?.replace(/['"]+/g, '');
              if (!size) return null;
              const allowedSizes = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
              return allowedSizes.includes(size) ? size : null;
            },
            renderHTML: attributes => {
              if (!attributes['fontSize']) return {};
              return { style: `font-size: ${attributes['fontSize']}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      },
    };
  },
});

export const FontFamily = Extension.create({
  name: 'fontFamily',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: element => {
              const font = element.style.fontFamily?.replace(/['"]+/g, '');
              if (!font) return null;
              const allowedFonts = ['Arial', 'Courier New', 'Georgia', 'Helvetica', 'Tahoma', 'Times New Roman', 'Verdana'];
              
              // Only accept it if it contains one of our officially supported fonts
              const matchedFont = allowedFonts.find(f => font.toLowerCase().includes(f.toLowerCase()));
              return matchedFont || null;
            },
            renderHTML: attributes => {
              if (!attributes['fontFamily']) return {};
              return { style: `font-family: ${attributes['fontFamily']}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontFamily: fontFamily => ({ chain }) => {
        return chain().setMark('textStyle', { fontFamily }).run();
      },
      unsetFontFamily: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontFamily: null }).removeEmptyTextStyle().run();
      },
    };
  },
});
