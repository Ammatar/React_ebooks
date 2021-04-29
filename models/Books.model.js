const mongoose = require('mongoose')

const Books = new mongoose.Schema({
  title: String, // Title of the book
  author: String, // Name of the author for the book, string or array, eg. "Alice" or ["Alice", "Bob"]
  publisher: String, // Publisher name (optional)
  cover: String, // Book cover image (optional), File path (absolute path) or web url, eg. "http://abc.com/book-cover.jpg" or "/User/Alice/images/book-cover.jpg"
  output: String, // Out put path (absolute path), you can also path output as the second argument when use new , eg: new Epub(options, output)
  version: Number, // You can specify the version of the generated EPUB, 3 the latest version (http://idpf.org/epub/30) or 2 the previous version (http://idpf.org/epub/201, for better compatibility with older readers). If not specified, will fallback to 3.
  css: String, // If you really hate our css, you can pass css string to replace our default style. eg: "body{background: #000}"
  fonts: {type: mongoose.Schema.Types.ObjectId, ref: "fonts"}, // Array of (absolute) paths to custom fonts to include on the book so they can be used on custom css. Ex: if you configure the array to fonts: ['/path/to/Merriweather.ttf'] you can use the following on the custom CSS:
  lang: String, // Language of the book in 2 letters code (optional). If not specified, will fallback to en.
  tocTitle: String, // Title of the table of contents. If not specified, will fallback to Table Of Contents.
  appendChapterTitles: Boolean,// Automatically append the chapter title at the beginning of each contents. You can disable that by specifying false.
  customOpfTemplatePath: String,// Optional. For advanced customizations: absolute path to an OPF template.
  customNcxTocTemplatePath: String,// Optional. For advanced customizations: absolute path to a NCX toc template.
  customHtmlTocTemplatePath: String,// Optional. For advanced customizations: absolute path to a HTML toc template.
  content:  [{title: String, author: String, data: String}], //[{type: mongoose.Schema.Types.ObjectId, ref: "Chapters"}], 
  verbose: Boolean,// specify whether or not to console.log progress messages, default: false.
  public: Boolean,
  // username: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Books', Books)
