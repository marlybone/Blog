const express = require('express');
const app = express();
const md = require('markdown-it')();
const fs = require('fs');
const path = require('path');
const mimeTypes = require('mime-types');
const { marked } = require('marked');
const meta = require('markdown-it-meta');
const frontmatter = require('front-matter');
const matter = require('gray-matter');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);


var publicDir = require('path').join(__dirname,'/public');


app.use('/Views', express.static(path.join(__dirname, '/Views'), {
    setHeaders: function (res, path) {
      const mimeType = mimeTypes.lookup(path);
      if (mimeType === 'text/css') {
        res.set('Content-Type', mimeType);
      }
    },
  }));
  app.use(express.static('/src', {
    setHeaders: function (res, path) {
      const mimeType = mimeTypes.lookup(path);
      if (mimeType === 'text/css') {
        res.set('Content-Type', mimeType);
      }
    },
  }));
  app.get('/src/app.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/src/app.js');
  });

  app.get('blog/Views/output.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, './Views/output.css'));
  });
  
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  const blogPosts = [];

  const dirs = fs.readdirSync('./public/Content', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  dirs.forEach(dir => {
    const filePath = `./public/Content/${dir}/index.md`;
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const post = { ...data, slug: dir };
    blogPosts.push(post);
  });

  res.render('index', { blogPosts });
});

app.get('/blog/:slug', (req, res) => {
  const { slug } = req.params;
  const filePath = `./public/Content/${slug}/index.md`;
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);
  const dirty = marked.parse(content);
  const html = DOMPurify.sanitize(dirty);
  const post = { slug, ...data };
  res.render('blog', { post, html });
});

app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});