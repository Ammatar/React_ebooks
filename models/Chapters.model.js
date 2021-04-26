const mongoose = require('mongoose');

const Chapters = new mongoose.Schema({
  title: String, //  optional, Chapter title
  author: String, // optional, if each book author is different, you can fill it.
  data: String, // required, HTML String of the chapter content. image paths should be absolute path (should start with "http" or "https"), so that they could be downloaded. With the upgrade is possible to use local images (for this the path must start with file: //)
  excludeFromToc: Boolean, //optional, if is not shown on Table of content, default: false;
  beforeToc: Boolean, // optional, if is shown before Table of content, such like copyright pages. default: false;
  filename: String, // optional, specify filename for each chapter, default: undefined;

});

module.exports = mongoose.model('Chapters', Chapters);
