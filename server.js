const express = require('express');
const app = express();
const md = require('markdown-it')();
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const { marked } = require('marked');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const matter = require('gray-matter');
const helmet = require("helmet");
const purgecss = require('purgecss')

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    imgSrc: ["'self'", 'https://*.googleusercontent.com', 'data:']
  }
}));
app.use(
  helmet.frameguard({
    action: "deny",
  })
);
app.use(helmet({
  hsts: {
    maxAge: 31536000, 
    includeSubDomains: true,
    preload: true
  }
}));
app.use(helmet({
  noCache: true
}));

const publicDir = path.join(__dirname, 'public');

app.get('/node_modules/share-buttons/dist/share-buttons.js', function(req, res) {
  res.setHeader('Content-Type', mime.getType('js'));
  res.sendFile(__dirname + '/node_modules/share-buttons/dist/share-buttons.js');
});

app.use('/Views', express.static(path.join(__dirname, 'Views')));
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(helmet());

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

app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});