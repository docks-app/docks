//        ___          ___          ___          ___          ___          ___
//       /__/\        /  /\        /  /\        /__/|        /__/\        /  /\
//      |  |::\      /  /::\      /  /::\      |  |:|        \  \:\      /  /::\
//      |  |:|:\    /  /:/\:\    /  /:/\:\     |  |:|         \  \:\    /  /:/\:\
//    __|__|:|\:\  /  /:/~/::\  /  /:/~/:/   __|  |:|     ___  \  \:\  /  /:/~/:/
//   /__/::::| \:\/__/:/ /:/\:\/__/:/ /:/___/__/\_|:|____/__/\  \__\:\/__/:/ /:/
//   \  \:\~~\__\/\  \:\/:/__\/\  \:\/:::::/\  \:\/:::::/\  \:\ /  /:/\  \:\/:/
//    \  \:\       \  \::/      \  \::/~~~~  \  \::/~~~~  \  \:\  /:/  \  \::/
//     \  \:\       \  \:\       \  \:\       \  \:\       \  \:\/:/    \  \:\
//      \  \:\       \  \:\       \  \:\       \  \:\       \  \::/      \  \:\
//       \__\/        \__\/        \__\/        \__\/        \__\/        \__\/

import hljs from "../../vendor/highlight";

const [start_tag_test, end_tag_test, contains_end_tag] = [/^<[^\/]/, /^<\//, /<\//];

//*
// The size of manually re-indented code.
//
// @private
// @type Number
// @value 2

const INDENTATION_SIZE = 2;

var decode_html_entities, indent, clean, highlight;

decode_html_entities = (string) => {
  var element = document.createElement("div");
  element.innerHTML = string.trim();

  return element.childNodes.length === 0 ? "" : (element.childNodes[0].nodeValue || element.innerHTML);
};

//*
// Indents HTML markup by finding opening and closing HTML tags.
//
// @param {String} code - The randomly-escaped HTML string.
// @returns {String} The indented string.

indent = (markup) => {
  var indent_count = -INDENTATION_SIZE,
      indented_markup = [],
      markup_lines = markup.split("\n"),
      markup_line,
      start_tag,
      end_tag;

  for(markup_line of markup_lines) {
    markup_line = markup_line.trim();
    [start_tag, end_tag] = [start_tag_test.test(markup_line), end_tag_test.test(markup_line)];

    if(start_tag) { indent_count += INDENTATION_SIZE; }
    indent_count = Math.max(indent_count, 0);

    if(indent_count > 0) {
      markup_line = `${Array(indent_count + 1).join(" ")}${markup_line}`;
    }

    indented_markup.push(markup_line);
    if(end_tag) { indent_count -= INDENTATION_SIZE; }
    if(!end_tag && contains_end_tag.test(markup_line)) { indent_count -= INDENTATION_SIZE; }
  }

  return indented_markup.join("\n");
};

clean = (code, options = {}) => {
  var leading_spaces;

  if(!code) { return ""; }

  code = decode_html_entities(code);
  code = code.trim();
  if(options.collapse_newlines) { code = code.replace(/\n^\s*\n/mg, "\n"); }

  // Kills any leading spaces from each line
  leading_spaces = code.match(/^\s*/);
  if(leading_spaces) {
    code = code.replace(new RegExp(`^\\s{${leading_spaces[0].length}}`, "gm"), "");
  }

  return code;
};

highlight = (code, options = {}) => {
  return hljs.highlight(options.language_code || "html", code).value;
};

export { decode_html_entities, indent, clean, highlight };
