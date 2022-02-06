import HTMLReactParser from "html-react-parser";

export const returnCodeToBr = (text) => {
  if (text === "") {
      return text
  } else {
      const parseText = text.replace(/\r?\n/g, '<br/>')
      return HTMLReactParser(parseText)
  }
};