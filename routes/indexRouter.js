const router = require('express').Router();
const { Books, Chapters, User } = require('../models/index.model');
const cors = require('cors');
const Epub = require('epub-gen');
const path = require('path');

router.get('/', (req, res) => {
  res.send({ status: 'ok' });
});

router.post('/newBook', async (req, res) => {
  const options = await req.body;
  console.log(req.body);
  // const {
  //   title,
  //   author,
  //   publisher,
  //   cover,
  //   output,
  //   version,
  //   css,
  //   fonts,
  //   lang,
  //   tocTitle,
  //   appendChapterTitles,
  //   customOpfTemplatePath,
  //   customNcxTocTemplatePath,
  //   customHtmlTocTemplatePath,
  //   content,
  //   verbose
  // } = req.body;
  // const chapter = await Chapters.create({
  //   data: "<div> Chapter </div>"
  // })
  const newBook = await Books.create({
    title: options.title,
    author: options.author,
    // publisher: publisher || 'self',
    // cover: cover || '/img/emptyCover.jpg',
    // output: output || 'book.epub',
    version: options.version || 3,
    // css,
    // fonts,
    lang: options.lang || 'ru',
    // tocTitle,
    // appendChapterTitles,
    // customOpfTemplatePath,
    // customNcxTocTemplatePath,
    // customHtmlTocTemplatePath,
    content: [{ data: '<div> Chapter </div>' }],
    // verbose
  });
  res.send({ status: 'created' });
});

router.post('/getAllBooks', async (req, res) => {
  const allBooks = await Books.find();
  // console.log(allBooks);
  res.json({ allBooks });
});

router.post('/editBook', (req, res) => {
  req.body;

  res.send();
});
router.post('/addChapter', async (req, res) => {
  const { id } = req.body;
  const book = await Books.findOne({ _id: id });
  book.content.push({ data: '<div> New Chapter </div>' });
  // const newChapter = await Chapters.create({data: "<div> New Chapter </div>"})
  console.log(book.content);
  // book.content = [...book.content, newChapter._id];
  book.save();
  // console.log(newChapter);
});
router.post('/chapterEdit', async (req, res) => {
  const { id, data } = req.body;
  console.log(req.body);

  const Book = await Books.findOne({ 'content._id': id });
  console.log('Book', Book);
  Book.content.forEach((element) => {
    if (element._id == id) {
      element.data = data;
    }
  });
  console.log('Book', Book);

  Book.save();
});
router.post('/export', async (req, res) => {
  const { title, author, content, lang } = req.body;
  console.log(content);
  const opts = {
    title: title,
    author: author,
    content: content,
    lang: lang,
  };
  const book = await new Epub(opts, `./routes/output/path.epub`).promise.then(
    () => {
      console.log('Ebook Generated Successfully!');
      res.download(path.join(__dirname + '/output/', 'path.epub'));
    },
    (err) => console.error('Failed to generate Ebook because of ', err)
  );
  console.log(path.join(__dirname + '/output/path.epub'));
  res.sendFile(path.join(__dirname + '/output/', 'path.epub'));
});
module.exports = router;
