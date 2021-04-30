const router = require('express').Router();
const { Books, Chapters, User } = require('../models/index.model');
const cors = require('cors');
const Epub = require('epub-gen');
const path = require('path');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/', (req, res) => {
  res.send(req.user)
});

router.post('/newBook', async (req, res) => {
  const options = await req.body;
  console.log(req.body);
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
    content: [{ title: 'Введение', data: '<div> Введение </div>' }],
    // verbose
    public: false,
    username: '',
  });
  res.send({ status: 'created' });
});

router.post('/getAllBooks', async (req, res) => {
  // const author = await User.findOne({authorname: req.body.authorname})
  const allBooks = await Books.find({author: req.body.authorname});
  // console.log(allBooks);
  res.json({ allBooks });
});

router.post('/editBook', (req, res) => {
  req.body;

  res.send();
});
router.post('/getAllPublic', async (req, res) => {
  const getAllPublic = await Books.find({public: true})
  res.json({getAllPublic})
});

router.post('/addChapter', async (req, res) => {
  const { id } = req.body;
  const book = await Books.findOne({ _id: id });
  book.content.push({ title: `Глава ${book.content.length}`, data: '<div> Новая глава </div>' });
  // const newChapter = await Chapters.create({data: "<div> New Chapter </div>"})
  console.log(book.content);
  // book.content = [...book.content, newChapter._id];
  book.save();
  res.send({book})
  // console.log(newChapter);
});

router.post('/deleteBook', async (req,res) => {
  const {id} = req.body;
  const book = await Books.findOneAndDelete({_id:id})
  console.log(book);
  res.send({status: 'deleted'})
})
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

router.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if(err) throw err;
    if(!user) res.send('No user with this credentials')
    else {
      req.logIn(user, err => {
        if(err) throw err;
        req.session.username = req.user;
        res.send(req.user)
        console.log('Login: ', req.user);
      })
    }
  })(req, res, next)
});
router.post('/register', (req, res) => {
  console.log(req.body);
  User.findOne({username: req.body.username}, async (err, doc) => {
    if(err) throw err;
    if(doc) {res.send('User already exists')};
    if(!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        authorname: req.body.authorname,
        password: hashedPassword,
      })
      await newUser.save()
      res.send({status: 'ok'})
    }
  })
});

router.post('/logoff', (req, res) => {
  req.session.destroy()
  req.user = false
  res.send({status: 'ok'})
})

router.post('/user', (req, res) => {
  console.log('=>', req.user);
  res.send(req.session.username)
})

module.exports = router;
